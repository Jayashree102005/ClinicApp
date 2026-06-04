const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: 'Available', enum: ['Available', 'On Leave', 'Unavailable'] },
  
  // 📋 NEW: Profile details for the 'Find Doctors' Page
  experience: { type: String, default: '' },
  fee: { type: String, default: '' },
  bio: { type: String, default: '' },
  
  // 🕒 NEW: Dynamic Scheduling Architecture
  availableDays: { 
    type: [String], 
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] 
  },
  timeSlots: { 
    type: [String], 
    default: ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);