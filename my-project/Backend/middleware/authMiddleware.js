const jwt = require('jsonwebtoken');

// ==========================================
// 1. STANDARD CLEARANCE (Patients & Doctors)
// ==========================================
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: "Access Denied. No token provided." });

  const token = authHeader.split(" ")[1]; 

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next(); 
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ==========================================
// 2. MAXIMUM SECURITY CLEARANCE (Admins Only)
// ==========================================
const verifyAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: "Access Denied. No token provided." });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // 🔒 THE IRON GATE: Mathematical proof of Admin Status
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied. Master administrative privileges required." });
    }

    next(); 
  } catch (error) {
    res.status(400).json({ message: "Access Denied. Invalid or expired token." });
  }
};

// Export BOTH guards so your router can choose which one to use
module.exports = { verifyToken, verifyAdmin };