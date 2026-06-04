const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- SIGN UP LOGIC ---
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
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
    res.status(201).json({ message: "Account created successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// --- LOGIN LOGIC (FIXED) ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account not found. Please Sign Up first." });
    }

    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // 3. Create a login token (Now includes name and email for secure lookup)
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        name: user.name, // Necessary for Doctor filtering
        email: user.email // Necessary for unique lookup
      }, 
      process.env.JWT_SECRET || "fallback_secret", 
      { expiresIn: "24h" }
    );

    // 4. Send success message back to frontend
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
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;