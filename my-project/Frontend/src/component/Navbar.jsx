import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 🔌 Connect to Global State & Routing
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile/tablet menu automatically on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'doctor') return '/doctor-dashboard';
    return '/patient-dashboard';
  };

  // 🎨 RESPONSIVE DESKTOP: Only shows on lg (1024px) and above
  const getDesktopNavClass = (path) => {
    const isActive = location.pathname === path;
    return `text-base font-medium px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
      isActive 
        ? "bg-blue-50 text-blue-700 font-bold shadow-sm" 
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
    }`;
  };

  // 🎨 RESPONSIVE MOBILE/TABLET: Clean left border highlight
  const getMobileNavClass = (path) => {
    const isActive = location.pathname === path;
    return `block px-6 py-4 transition-all duration-300 text-lg ${
      isActive 
        ? "text-blue-700 bg-blue-50/80 font-bold border-l-4 border-blue-600" 
        : "text-gray-600 font-medium border-l-4 border-transparent hover:bg-gray-50 hover:text-blue-600"
    }`;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
             <i className="bi bi-heart-pulse-fill text-3xl"></i> ClinicApp
            </Link>
          </div>

          {/* Desktop Menu (Hidden on mobile & tablet, flex on lg and up) */}
          <div className="hidden lg:flex space-x-2 items-center">
            {/* Navigation Links */}
            <Link to="/" className={getDesktopNavClass('/')}>Home</Link>
            <Link to="/about" className={getDesktopNavClass('/about')}>About</Link>
            <Link to="/service" className={getDesktopNavClass('/service')}>Services</Link>
            <Link to="/doctors" className={getDesktopNavClass('/doctors')}>Find Doctors</Link>
            <Link to="/contact" className={getDesktopNavClass('/contact')}>Contact</Link>
            
            {/* Desktop Action Buttons */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6 ml-4">
              {user ? (
                <>
                  <Link to={getDashboardLink()}>
                    <button className="text-blue-600 bg-white border-2 border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors font-bold text-base whitespace-nowrap">
                      Dashboard
                    </button>
                  </Link>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-2 rounded-full hover:bg-red-100 transition-colors font-bold shadow-sm text-base whitespace-nowrap">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-slate-700 hover:text-blue-600 px-4 py-2 font-bold transition-colors text-base whitespace-nowrap border-2 border-blue-700 rounded-full">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base whitespace-nowrap">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile & Tablet Menu Toggle Button (Shows up to lg breakpoint) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-800 hover:text-blue-600 p-2 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`bi ${isOpen ? 'bi-x text-4xl' : 'bi-list text-3xl'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Panel - Optimized for vertical scrolling */}
      <div 
        className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden z-40 ${
          isOpen ? 'max-h-[calc(100vh-5rem)] border-b border-gray-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col py-3 overflow-y-auto max-h-[calc(100vh-5rem)]">
          {/* Mobile/Tablet Links */}
          <Link to="/" className={getMobileNavClass('/')}>Home</Link>
          <Link to="/about" className={getMobileNavClass('/about')}>About</Link>
          <Link to="/service" className={getMobileNavClass('/service')}>Services</Link>
          <Link to="/doctors" className={getMobileNavClass('/doctors')}>Find Doctors</Link>
          <Link to="/contact" className={getMobileNavClass('/contact')}>Contact</Link>
          
          {/* Mobile/Tablet Action Buttons */}
          <div className="px-6 pt-6 pb-8 mt-4 border-t border-gray-100 flex flex-col space-y-4 bg-gray-50/50">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="block w-full text-blue-600 bg-white border-2 border-blue-600 text-center py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm text-lg">
                  My Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full bg-red-50 border border-red-100 text-red-600 text-center py-3.5 rounded-xl font-bold hover:bg-red-100 transition-colors shadow-sm text-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full text-slate-700 bg-white border-2 border-slate-200 text-center py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm text-lg">
                  Log In
                </Link>
                <Link to="/signup" className="block w-full bg-blue-600 text-white text-center py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md text-lg">
                  Create an Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;