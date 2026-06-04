const mongoose = require('mongoose');
const User = require('./models/User'); 
const Appointment = require('./models/Appointment'); // Ensure you have your Appointment model
require('dotenv').config();

const clearData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database for cleanup...");

    // 1. Delete ALL appointments
    await Appointment.deleteMany({});
    console.log("✅ All old appointments have been wiped.");

    // 2. Delete ALL users EXCEPT the master admin
    await User.deleteMany({ role: { $ne: 'admin' } });
    console.log("✅ All old patients and doctors have been wiped.");

    console.log("\n🎉 Database is completely clean! Ready for fresh, live bookings.");
    process.exit();
  } catch (err) {
    console.error("Cleanup failed:", err);
    process.exit(1);
  }
};

clearData();