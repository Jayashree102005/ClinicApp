
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');


// ================= SIGN UP =================
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'patient'
    });

    await newUser.save();

    res.status(201).json({
      message: "Account created successfully!"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error during signup."
    });
  }
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Account not found. Please Sign Up first."
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password."
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET || "fallback_secret",
      {
        expiresIn: "24h"
      }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error during login."
    });
  }
});


// ================= FORGOT PASSWORD =================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'No account found with this email.'
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString('hex');

    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset Request</h2>

      <p>Click the link below to reset your password:</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message
    });

    res.status(200).json({
      message: 'Reset link sent successfully.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Could not send verification email.'
    });
  }
});


// ================= RESET PASSWORD =================
router.post('/reset-password/:token', async (req, res) => {
  try {

    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired token.'
      });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: 'Password reset successful.'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error while resetting password.'
    });
  }
});


module.exports = router;

