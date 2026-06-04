import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link to="/patient-dashboard" className="text-blue-600 font-bold mb-6 flex items-center gap-2 hover:underline w-fit">
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">My Profile</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {user ? (
            <div className="space-y-6">
              
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-3xl shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-500 capitalize">{user.role} Account</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{user.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{user.email}</p>
                </div>
              </div>
              
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 animate-pulse">
              Loading profile data...
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;