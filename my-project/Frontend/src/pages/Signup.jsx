import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // <-- 1. Import Axios
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // REAL Backend Integration
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Make the real API call to your backend
      const response = await axios.post('${API_URL}/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // 3. If successful, clear loading, alert user, and redirect
      setIsLoading(false);
      alert(response.data.message || "Account created successfully! Please log in.");
      navigate('/login');

    } catch (err) {
      // 4. Catch errors from the backend (like "Email already exists")
      setIsLoading(false);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please check your backend server.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative">
        <div className="flex justify-center mb-6">
          <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
            <i className="bi bi-heart-pulse-fill"></i> ClinicApp
          </Link>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-500 text-sm">Join us to easily manage your healthcare appointments.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm animate-pulse">
            <i className="bi bi-exclamation-octagon-fill text-xl mt-0.5"></i>
            <div>
              <p className="font-bold text-sm">Registration Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <i className="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <i className="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="email" name="email" required placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <i className="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="password" name="password" required placeholder="Create a password" value={formData.password} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <i className="bi bi-shield-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="password" name="confirmPassword" required placeholder="Repeat your password" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"/>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-blue-700 transition transform active:scale-95 flex justify-center items-center gap-2 mt-4">
            {isLoading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Registering...</> : <>Create Account <i className="bi bi-person-plus-fill"></i></>}
          </button>
        </form>
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;