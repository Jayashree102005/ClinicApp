import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../component/Footer';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]); // This will hold your DB doctors
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // 1. Fetch real doctors from your backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Filter logic based on database data
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "All" || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative">
      
      {/* ================= 1. HERO BANNER ================= */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center hidden md:block opacity-25 lg:opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200')" }}
        />
        <div className="absolute top-0 right-1/2 w-32 h-full bg-blue-600 opacity-10 transform skew-x-12 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <span className="text-blue-300 font-bold uppercase tracking-wider text-sm mb-3 block">
              <i className="bi bi-shield-check mr-2"></i>Verified Medical Staff
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Find and Book Your <span className="text-blue-400">Specialist</span>
            </h1>
            <p className="text-lg text-blue-100/90 max-w-xl leading-relaxed">
              Connect with vetted professionals. Filter through fields, read genuine patient testimonials, and secure your time slot instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. FLOATING SEARCH & FILTER BAR ================= */}
      <section className="max-w-6xl mx-auto px-4 w-full -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search by doctor name..." 
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="md:w-72 relative">
            <i className="bi bi-funnel absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select 
              className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white appearance-none cursor-pointer text-gray-700 font-medium"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="All">All Specialties</option>
              <option value="General">General</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Gynaecologist">Gynaecologist</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. DOCTORS DISPLAY SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex-grow w-full">
        <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Available Specialists ({filteredDoctors.length})
          </h2>
          {specialtyFilter !== "All" && (
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              Filtered by: {specialtyFilter}
            </span>
          )}
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div key={doc._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                
                <div>
                  <div className="flex gap-4 items-start mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-4xl border-2 border-blue-100 shadow-sm flex-shrink-0">
                      <i className="bi bi-person-heart"></i>
                    </div>
                    <div>
                      <h3 onClick={() => setSelectedDoctor(doc)} className="text-lg font-bold text-gray-900 leading-tight mb-1 hover:text-blue-600 transition cursor-pointer">{doc.name}</h3>
                      <p className="text-blue-600 font-semibold text-sm mb-2">{doc.specialty}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 border-t border-b border-gray-50 py-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400"><i className="bi bi-briefcase mr-2 text-blue-500"></i>Experience</span>
                      <span className="font-medium text-gray-800">{doc.experience || 'Not Listed'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400"><i className="bi bi-wallet2 mr-2 text-blue-500"></i>Consultation Fee</span>
                      <span className="font-bold text-gray-900">{doc.fee || 'Consult Clinic'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setSelectedDoctor(doc)} 
                    className="w-1/2 py-2.5 text-center text-sm text-blue-600 bg-white font-bold border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-600 transition-all focus:outline-none"
                  >
                    View Profile
                  </button>
                  <Link 
                    to="/login" 
                    className="w-1/2 py-2.5 text-center text-sm text-white font-bold bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 hover:shadow-none transition-all"
                  >
                    Book Now
                  </Link>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="text-5xl text-gray-300 mb-4"><i className="bi bi-person-exclamation"></i></div>
            <h3 className="text-xl font-bold text-gray-700 mb-1">No specialists match your criteria</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">Try checking your spelling or modifying your specialty filter.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSpecialtyFilter("All");}} 
              className="mt-5 bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
            >
              Reset Search Configuration
            </button>
          </div>
        )}
      </section>

      {/* ================= 4. GLASSMORPHISM DOCTOR MODAL ================= */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 transition-all duration-300">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative animate-fade-in">
            
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
            
            <button 
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-slate-700 p-1 bg-slate-50 hover:bg-slate-100 rounded-full transition"
            >
              <i className="bi bi-x-lg text-sm flex"></i>
            </button>

            <div className="p-6 md:p-8">
              <div className="flex gap-4 items-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-5xl border-4 border-slate-50 shadow-md">
                   <i className="bi bi-person-heart"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{selectedDoctor.name}</h3>
                  <p className="text-blue-600 font-bold text-sm tracking-wide uppercase">{selectedDoctor.specialty}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Professional Brief</h4>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  {selectedDoctor.bio || "No professional bio available at this time."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-center border border-slate-100 mb-8">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedDoctor.experience || 'Not Listed'}</p>
                </div>
                <div className="border-l border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Session Fee</p>
                  <p className="text-sm font-black text-blue-600 mt-0.5">{selectedDoctor.fee || 'Consult Clinic'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="w-1/3 py-3 text-center text-sm text-slate-500 font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition"
                >
                  Dismiss
                </button>
                <Link 
                  to="/login"
                  className="w-2/3 py-3 text-center text-sm text-white font-bold bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 hover:shadow-none transition transform hover:-translate-y-0.5"
                >
                  Authorize & Book Slot
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Doctors;