const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// 🛡️ IMPORT BOTH SECURITY GUARDS
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// ==========================================
// 1. STANDARD CLEARANCE: BOOK AN APPOINTMENT
// ==========================================
router.post('/book', verifyToken, async (req, res) => {
  try {
    // Check how many appointments already exist for this specific date
    const existingAppointmentsCount = await Appointment.countDocuments({ date: req.body.date });
    
    // Assign the next available token number starting from 1
    const nextTokenNumber = existingAppointmentsCount + 1;

    const newAppointment = new Appointment({
      patientId: req.user.id, 
      doctorName: req.body.doctorName,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      tokenNumber: nextTokenNumber // Passes the sequential token here!
    });

    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book appointment" });
  }
});

// ==========================================
// 2. STANDARD CLEARANCE: FETCH MY APPOINTMENTS
// ==========================================
router.get('/mine', verifyToken, async (req, res) => {
  try {
    // Find only appointments that match the logged-in user's ID
    const myAppointments = await Appointment.find({ patientId: req.user.id });
    res.status(200).json(myAppointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

// ==========================================
// 3. 🔒 MAXIMUM SECURITY: GET ALL APPOINTMENTS (ADMIN ONLY)
// ==========================================
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email') 
      .sort({ createdAt: -1 }); 

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
});

// ==========================================
// 4. 🔒 MAXIMUM SECURITY: UPDATE STATUS (ADMIN ONLY)
// ==========================================
router.patch('/admin/status/:id', verifyAdmin, async (req, res) => {
  try {
    const { status, cancellationReason } = req.body; // Extract the reason
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { 
        status: status,
        cancellationReason: cancellationReason || '' // Save the reason
      },
      { new: true } 
    ).populate('patientId', 'name email');

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status." });
  }
});

// ==========================================
// 5. 🩺 DOCTOR CLEARANCE: FETCH ASSIGNED PATIENTS
// ==========================================
router.get('/doctor/patients', verifyToken, async (req, res) => {
  try {
    // We fetch appointments for this doctor's name
    const patients = await Appointment.find({ doctorName: req.user.name })
      .populate('patientId', 'name email')
      .sort({ date: 1 });
      
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

// ==========================================
// 6. 🩺 DOCTOR CLEARANCE: WRITE PRESCRIPTION
// ==========================================
// ✅ CHANGED: Now uses .put() and matches the /:id/prescribe format from your original React code
router.put('/:id/prescribe', verifyToken, async (req, res) => {
  try {
    const { prescription } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { 
        prescription: prescription,
        status: 'Completed' // Instantly marks the visit as Completed!
      },
      { new: true }
    ).populate('patientId', 'name email');

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save prescription." });
  }
});

// ==========================================
// 7. 💬 STANDARD CLEARANCE: PATIENT REPLY TO CANCELLATION
// ==========================================
router.patch('/:id/reply', verifyToken, async (req, res) => {
  try {
    const { reply } = req.body;
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { patientReply: reply },
      { new: true } // Returns the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error saving patient reply:", error);
    res.status(500).json({ message: "Server error saving reply." });
  }
});

// ALWAYS EXPORT AT THE VERY BOTTOM
module.exports = router;