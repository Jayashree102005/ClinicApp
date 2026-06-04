import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Look specifically for the 'user' key we established in Login.jsx
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Note: The physical localStorage items are securely set inside Login.jsx
    setUser(userData);
  };

  const logout = () => {
    // 🧹 THE MASTER CLEAR: Wipe every possible security pass to guarantee a safe logout
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('clinic_token');
    localStorage.removeItem('clinic_user'); 
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};