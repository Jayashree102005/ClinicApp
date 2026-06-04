import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 pt-16 pb-8 w-full border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Brand Section */}
          <div className="md:col-span-12 lg:col-span-5 space-y-6">
            <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
              <i className="bi bi-heart-pulse-fill text-blue-600 text-3xl"></i> ClinicApp
            </Link>
            <p className="text-slate-500 text-base leading-relaxed max-w-sm">
              Bridging the gap between revolutionary medical technology and deeply personalized patient care. Your health journey starts here.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                <i className="bi bi-facebook text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm">
                <i className="bi bi-twitter-x text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm">
                <i className="bi bi-instagram text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                <i className="bi bi-linkedin text-lg"></i>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="font-bold text-lg mb-6 text-slate-900 tracking-wide uppercase text-sm">Explore</h3>
            <ul className="space-y-4 text-slate-600 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors"></span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors"></span> About Us
                </Link>
              </li>
              <li>
                <Link to="/service" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors"></span> Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors"></span> Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-600 transition-colors"></span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="font-bold text-lg mb-6 text-slate-900 tracking-wide uppercase text-sm">Get in Touch</h3>
            <ul className="space-y-5 text-slate-600">
              <li className="flex items-start gap-4 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-geo-alt-fill text-blue-600 text-lg"></i>
                </div>
                <div className="pt-1 flex flex-col">
                  <span className="text-slate-900 font-bold text-sm mb-1">Our Location</span>
                  <span className="text-sm">123 Health Ave, Medical District<br/>New York, NY 10001</span>
                </div>
              </li>
              <li className="flex items-start gap-4 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-envelope-fill text-blue-600 text-lg"></i>
                </div>
                <div className="pt-1 flex flex-col">
                  <span className="text-slate-900 font-bold text-sm mb-1">Email Support</span>
                  <a href="mailto:support@clinicapp.com" className="text-sm hover:text-blue-600 transition-colors">support@clinicapp.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-telephone-fill text-blue-600 text-lg"></i>
                </div>
                <div className="pt-1 flex flex-col">
                  <span className="text-slate-900 font-bold text-sm mb-1">24/7 Hotline</span>
                  <a href="tel:+15551234567" className="text-sm hover:text-blue-600 transition-colors">+1 (555) 123-4567</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ClinicApp. All rights reserved.</p>
          <div className="flex space-x-6 font-medium">
            <Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;