const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const { verifyAdmin, verifyToken } = require('../middleware/authMiddleware');

// 1. GET ALL DOCTORS (Public)
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

// 2. ADD DOCTOR & AUTO-CREATE LOGIN (🔒 ADMIN ONLY)
router.post('/add', verifyAdmin, async (req, res) => {
  try {
    // Explicitly destructure all fields including the new profile metrics
    const { name, specialty, email, phone, status, experience, fee, bio } = req.body;

    const newDoctor = new Doctor({
      name,
      specialty,
      email,
      phone,
      status: status || 'Available',
      experience, // Saved to MongoDB
      fee,        // Saved to MongoDB
      bio         // Saved to MongoDB
    });
    
    const savedDoctor = await newDoctor.save();

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      // Auto-generates a secure default password for the doctor
      const hashedPassword = await bcrypt.hash('Doctor2026!', salt);
      
      const newDoctorUser = new User({
        name: savedDoctor.name,
        email: savedDoctor.email,
        password: hashedPassword,
        role: 'doctor'
      });
      await newDoctorUser.save();
    }

    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add doctor." });
  }
});

// 3. REMOVE A DOCTOR (🔒 ADMIN ONLY)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete doctor." });
  }
});

// 4. 🩺 DOCTOR ONLY: Update their own schedule
router.patch('/update-schedule', verifyToken, async (req, res) => {
  try {
    // SECURITY CHECK: Ensure req.user exists and has the correct role
    if (!req.user || req.user.role !== 'doctor') {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    // Ensure email is being passed via the token (req.user.email)
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { email: req.user.email }, 
      { 
        availableDays: req.body.availableDays,
        timeSlots: req.body.timeSlots,
        status: req.body.status
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor profile not found." });
    }

    res.json(updatedDoctor);
  } catch (error) {
    console.error("Schedule Update Error:", error);
    res.status(500).json({ message: "Failed to update schedule." });
  }
});

module.exports = router;