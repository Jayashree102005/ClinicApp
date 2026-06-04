import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import axios from 'axios'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // REAL Backend Integration
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 2. Make the real API call to your backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // 3. Extract user data and token from the backend response
      const { user, token } = response.data;

      // 4. Update the global context and save token/user items to localStorage
      login({ ...user, token }); 
      localStorage.setItem('clinic_token', token); // Your primary storage pass
      localStorage.setItem('token', token);        // Guard compatibility pass
      localStorage.setItem('user', JSON.stringify(user)); // Enforces stringified access for AdminRoute

      setIsLoading(false);

      // =========================================================
      // 5. UPDATED: STRICT TRAFFIC CONTROL BASED ON USER ROLE
      // =========================================================
      if (user.role === 'admin') {
        navigate('/admin'); // Sends master admin safely to admin command center
      } else if (user.role === 'patient') {
        navigate('/patient-dashboard'); // Normal patients go here
      } else if (user.role === 'doctor') {
        navigate('/doctor-dashboard'); // Verified doctors go here
      } else {
        navigate('/'); // Fallback landing link
      }

    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Make sure the backend server is running.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative">
        
        <div className="flex justify-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
            <i className="bi bi-heart-pulse-fill"></i> ClinicApp
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Please enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm animate-pulse">
            <i className="bi bi-exclamation-octagon-fill text-xl mt-0.5"></i>
            <div>
              <p className="font-bold text-sm">Login Failed</p>
              <p className="text-sm">{error}</p>
              {error.includes("not found") && (
                <Link to="/signup" className="text-red-700 font-bold text-sm underline mt-1 inline-block hover:text-red-800">
                  Click here to Sign Up &rarr;
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm text-blue-600 font-semibold hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <i className="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="password" 
                required 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
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
                Verifying...
              </>
            ) : (
              <>
                Secure Login 
                <i className="bi bi-box-arrow-in-right"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-sm">
            New to ClinicApp? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;