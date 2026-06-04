import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 🔌 Connect to your global state

const AdminRoute = () => {
  // 1. Pull the user data and loading status directly from your context
  const { user, loading } = useContext(AuthContext);

  // 2. Wait a split second for the context to finish reading memory
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-blue-600 font-bold tracking-widest uppercase text-sm animate-pulse">
          Verifying Security Clearance...
        </div>
      </div>
    );
  }

  // 3. THE IRON GATE: If nobody is logged in, or they aren't the master admin, boot them.
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // 4. Everything matches! Unlock the door to the Admin Dashboard.
  return <Outlet />;
};

export default AdminRoute;