const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

// 1. IMPORT ALL ROUTES AT THE TOP
const authRoutes = require('./routes/auth'); 
const appointmentRoutes = require('./routes/appointments'); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully!"))
  .catch((error) => console.log("❌ Database Connection Failed:", error.message));

// 2. USE ALL ROUTES HERE
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes); 

// Default testing route
app.get('/', (req, res) => {
    res.send("Welcome to the Clinic API! Server is running.");
});

// 3. START THE SERVER AT THE VERY BOTTOM
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
// Add this near your other route imports at the top
const doctorRoute = require('./routes/doctors');

// Add this where your app.use() statements are
app.use('/api/doctors', doctorRoute);