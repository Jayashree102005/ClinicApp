import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { token } = useParams(); // Grabs the temporary token out of the URL bar
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Sends the token and the new password to your backend
      const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, {
        password
      });

      setMessage("Password reset successfully! Redirecting to login...");
      setIsLoading(false);
      
      // Send them back to your login page after a brief delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Link expired or invalid. Please request a new password reset.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Create New Password</h2>
          <p className="text-gray-500 text-sm">Please enter and confirm your new secure password.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm">
            <i className="bi bi-exclamation-octagon-fill text-xl mt-0.5"></i>
            <div><p className="text-sm font-bold">{error}</p></div>
          </div>
        )}

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm">
            <i className="bi bi-check-circle-fill text-xl mt-0.5"></i>
            <div><p className="text-sm font-bold">{message}</p></div>
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <i className="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="password" 
                required 
                placeholder="Minimum 6 characters" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <i className="bi bi-lock-fill absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="password" 
                required 
                placeholder="Repeat your password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-blue-700 transition transform active:scale-95 flex justify-center items-center gap-2 mt-2"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;