const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorName: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Cancelled', 'Completed'], default: 'Pending' },
  tokenNumber: { type: Number, default: 0 },
  
  // 💊 NEW ENTERPRISE FEATURE: Digital Prescriptions
  prescription: { type: String, default: '' },

  // 🚨 NEW: Emergency Cancellation Tracking
  cancellationReason: { type: String, default: '' },
  
  // 💬 NEW: Store the patient's reply to cancellations
  patientReply: { 
    type: String, 
    enum: ['another_doctor', 'same_doctor', 'accept', null],
    default: null 
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);