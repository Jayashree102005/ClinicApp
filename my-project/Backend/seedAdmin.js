const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Double check if this matches your path
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected for administrative seeding...");

    // Remove any old admin to keep the database clean
    await User.deleteMany({ role: 'admin' });

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("Error: ADMIN_EMAIL or ADMIN_PASSWORD missing from .env!");
      process.exit(1);
    }

    // Hash the separate password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const masterAdmin = new User({
      name: "Master Clinic Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    await masterAdmin.save();
    console.log(`\n==================================================`);
    console.log(`🎉 SUCCESS: Separate Admin Account Seeded!`);
    console.log(`Email: ${adminEmail}`);
    console.log(`==================================================\n`);
    process.exit();

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();