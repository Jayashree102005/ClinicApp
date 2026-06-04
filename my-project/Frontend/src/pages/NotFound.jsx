import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-center p-6">
      <h1 className="text-9xl font-black text-blue-800 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-8">The link might be broken, or the page has been removed.</p>
      
      <button 
        onClick={() => navigate('/')} 
        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;