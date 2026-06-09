import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // API call to your backend reset routing
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setMessage(response.data.message || "Reset link sent! Please check your email.");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Could not send verification email.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        
        <div className="flex justify-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
            <i className="bi bi-heart-pulse-fill"></i> ClinicApp
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-500 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm">
            <i className="bi bi-exclamation-octagon-fill text-xl mt-0.5"></i>
            <div>
              <p className="font-bold text-sm">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm">
            <i className="bi bi-check-circle-fill text-xl mt-0.5"></i>
            <div>
              <p className="font-bold text-sm">Success</p>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleResetRequest} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <i className="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-blue-700 transition transform active:scale-95 flex justify-center items-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 
                Sending...
              </>
            ) : (
              <>
                Send Reset Link 
                <i className="bi bi-send-fill"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">
            Remember your password? <Link to="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;