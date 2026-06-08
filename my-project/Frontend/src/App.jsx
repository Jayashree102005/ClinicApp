import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Doctors from './pages/Doctors'; 
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import PatientDashboard from './pages/PatientDashboard';
import MedicalRecords from './pages/MedicalRecords';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import DoctorDashboard from './pages/DoctorDashboard';
import Services from './pages/Services'; 
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './component/AdminRoute'; 

function App() {
  const location = useLocation();

  const hideNavbarRoutes = [
    '/patient-dashboard',
    '/medical-records',
    '/profile',
    '/admin',
    '/doctor-dashboard'
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      <ScrollToTop />

      {!shouldHideNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/service" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;