import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

const PatientDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- UI States ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- Cancellation Acknowledgment State ---
  const [acknowledgedCancellations, setAcknowledgedCancellations] = useState([]);

  // --- Data States ---
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableDoctors, setAvailableDoctors] = useState([]);

  // --- Booking Form States ---
  const [bookingData, setBookingData] = useState({
    doctorName: '', 
    service: 'General Checkup',
    date: '',
    time: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');
      
      const apptResponse = await axios.get('${API_URL}/api/appointments/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(apptResponse.data.reverse()); 
      
      const docsResponse = await axios.get('${API_URL}/api/doctors');
      const liveDoctors = docsResponse.data;
      setAvailableDoctors(liveDoctors);

      if (liveDoctors.length > 0 && !bookingData.doctorName) {
        setBookingData(prev => ({ 
          ...prev, 
          doctorName: liveDoctors[0].name,
          time: liveDoctors[0].timeSlots?.[0] || '09:00 AM' 
        }));
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => { if (user) fetchData(); }, [user]);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');
      await axios.post('${API_URL}/api/appointments/book', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Appointment successfully booked!");
      setBookingLoading(false);
      setActiveTab('dashboard'); 
      fetchData(); 
    } catch (err) {
      alert("Failed to book appointment.");
      setBookingLoading(false);
    }
  };

  // --- UPDATED: Handle Patient's Decision on Cancellation ---
  const handleCancellationResponse = async (apt, decision) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');
      
      // 1. Send the decision to the backend
      await axios.patch(`${API_URL}/api/appointments/${apt._id}/reply`, 
        { reply: decision }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Handle the local UI navigation based on the decision
      if (decision === 'another_doctor') {
        setBookingData(prev => ({ ...prev, service: apt.service }));
        setActiveTab('book');
        setIsSidebarOpen(false);
      } else if (decision === 'same_doctor') {
        setBookingData(prev => ({ ...prev, doctorName: apt.doctorName, service: apt.service }));
        setActiveTab('book');
        setIsSidebarOpen(false);
      } 
      
      // 3. Mark as acknowledged so buttons disappear
      setAcknowledgedCancellations([...acknowledgedCancellations, apt._id]);

    } catch (err) {
      console.error(err);
      alert("Failed to send your response to the clinic. Please try again.");
    }
  };

  const selectedDoctorObj = availableDoctors.find(doc => doc.name === bookingData.doctorName);
  const dynamicTimeSlots = selectedDoctorObj?.timeSlots || ['09:00 AM', '10:30 AM', '01:00 PM'];

  // Metrics Logic
  const upcomingAppointments = appointments.filter(a => a.status === 'Pending' || a.status === 'Accepted').length;
  const completedAppointmentsList = appointments.filter(a => a.status === 'Completed');
  const completedAppointments = completedAppointmentsList.length;

  if (!user) return null;
  if (isLoading) return <div className="flex h-screen items-center justify-center font-bold text-blue-600">Loading your health portal...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* ================= SIDEBAR (Mobile + Desktop) ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-blue-800">
          <div>
            <Link to="/" className="text-xl font-black text-white flex items-center gap-2">
              <i className="bi bi-heart-pulse-fill text-2xl"></i> ClinicApp
            </Link>
            <p className="text-[8px] md:text-[10px] text-blue-300 uppercase tracking-widest font-bold mt-1">Patient Portal</p>
          </div>
          <button className="md:hidden text-blue-200 text-2xl" onClick={() => setIsSidebarOpen(false)}><i className="bi bi-x"></i></button>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          <SidebarButton icon="bi-grid-1x2-fill" label="My Appointments" isActive={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} />
          <SidebarButton icon="bi-calendar-plus-fill" label="Book a Visit" isActive={activeTab === 'book'} onClick={() => { setActiveTab('book'); setIsSidebarOpen(false); }} />
          <SidebarButton icon="bi-file-earmark-medical-fill" label="Medical Records" isActive={activeTab === 'records'} onClick={() => { setActiveTab('records'); setIsSidebarOpen(false); }} />
          <SidebarButton icon="bi-person-badge-fill" label="My Profile" isActive={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }} />
        </div>
        
        <div className="p-4 border-t border-blue-800">
          <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-800 hover:bg-rose-500 text-white rounded-xl font-bold transition-colors">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* ================= CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header (Responsive) */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600 text-2xl" onClick={() => setIsSidebarOpen(true)}>
              <i className="bi bi-list"></i>
            </button>
            <div className="hidden md:block">
              <h3 className="font-bold text-slate-700">Health Portal</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden xs:block">
              <p className="text-xs md:text-sm font-black text-slate-800 truncate max-w-[120px] md:max-w-none">{user.name}</p>
              <p className="text-[8px] md:text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded uppercase inline-block">Active Patient</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg shadow-lg cursor-pointer hover:bg-blue-700 transition" onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Scrollable View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            
            {/* --- TAB 1: DASHBOARD (Appointments) --- */}
            {activeTab === 'dashboard' && (
              <div className="animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-8 gap-4">
                  <div>
                    <h1 className="text-xl md:text-3xl font-black text-slate-900">Welcome back, {user.name.split(' ')[0]}!</h1>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">Here is an overview of your health schedule.</p>
                  </div>
                  <button onClick={() => { setActiveTab('book'); setIsSidebarOpen(false); }} className="sm:hidden bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700 transition text-sm w-full sm:w-auto">
                    + Book New Visit
                  </button>
                  <button onClick={() => { setActiveTab('book'); setIsSidebarOpen(false); }} className="hidden sm:block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition">
                    + Book New Visit
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase">Upcoming Visits</p>
                    <h3 className="text-2xl md:text-3xl font-black text-blue-600">{upcomingAppointments}</h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase">Completed Visits</p>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800">{completedAppointments}</h3>
                  </div>
                  <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-md text-white flex-col justify-center items-start cursor-pointer hover:shadow-lg transition" onClick={() => { setActiveTab('book'); setIsSidebarOpen(false); }}>
                    <i className="bi bi-calendar-plus text-3xl mb-2"></i>
                    <p className="font-bold">Need a doctor?</p>
                    <p className="text-xs text-blue-200">Schedule now &rarr;</p>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-black text-slate-800 mb-3 md:mb-4">Your Appointment History</h3>
                
                {appointments.length === 0 ? (
                  <div className="bg-white p-8 md:p-12 rounded-2xl border border-dashed border-slate-300 text-center">
                    <i className="bi bi-calendar-x text-3xl md:text-4xl text-slate-300 mb-3 block"></i>
                    <p className="text-slate-500 font-medium text-sm md:text-base">You have no appointments yet.</p>
                    <button onClick={() => { setActiveTab('book'); setIsSidebarOpen(false); }} className="mt-4 text-blue-600 font-bold hover:underline text-sm md:text-base">Book your first visit</button>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt._id} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <h4 className="font-black text-base md:text-lg text-slate-800">{apt.service}</h4>
                            <p className="text-xs md:text-sm font-bold text-slate-500 mt-0.5">
                              Consultation with: <span className="text-blue-600">{apt.doctorName || "Not assigned"}</span>
                            </p>
                            <p className="text-[10px] md:text-xs text-slate-400 mt-1"><i className="bi bi-calendar-event mr-1"></i> {apt.date} at {apt.time}</p>
                          </div>
                          
                          <div className="text-left sm:text-right">
                            <span className={`px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-black uppercase rounded-lg ${
                              apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                              apt.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {apt.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Prescription Display */}
                        {apt.status === 'Completed' && apt.prescription && (
                          <div className="mt-4 md:mt-5 bg-blue-50/50 p-3 md:p-4 rounded-xl border border-blue-100">
                            <p className="text-[10px] md:text-xs font-bold text-blue-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                              <i className="bi bi-capsule"></i> Doctor's Prescription
                            </p>
                            <p className="text-xs md:text-sm font-medium text-slate-700">{apt.prescription}</p>
                          </div>
                        )}

                        {/* INTERACTIVE CANCELLATION NOTICE */}
                        {apt.status === 'Cancelled' && (
                          <div className="mt-4 md:mt-5 bg-rose-50 p-3 md:p-4 rounded-xl border border-rose-100 flex flex-col gap-3">
                            <div className="flex gap-3 md:gap-4 items-start w-full">
                              <div className="text-rose-500 text-xl md:text-2xl mt-1"><i className="bi bi-info-circle-fill"></i></div>
                              <div className="flex-1">
                                <p className="text-[10px] md:text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">Cancellation Notice</p>
                                <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed">
                                  {apt.cancellationReason || "Your appointment was cancelled by the clinic administration. Please contact the front desk for rescheduling."}
                                </p>
                              </div>
                            </div>

                            {/* Patient Response Buttons */}
                            {!acknowledgedCancellations.includes(apt._id) && !apt.patientReply && (
                              <div className="mt-2 pl-8 md:pl-10 w-full flex flex-col sm:flex-row gap-2">
                                <button 
                                  onClick={() => handleCancellationResponse(apt, 'another_doctor')}
                                  className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-bold transition shadow-sm flex-1 text-center"
                                >
                                  <i className="bi bi-person-lines-fill mr-1"></i> See Another Doctor
                                </button>
                                <button 
                                  onClick={() => handleCancellationResponse(apt, 'same_doctor')}
                                  className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-bold transition shadow-sm flex-1 text-center"
                                >
                                  <i className="bi bi-calendar-event mr-1"></i> Reschedule Visit
                                </button>
                                <button 
                                  onClick={() => handleCancellationResponse(apt, 'accept')}
                                  className="bg-slate-800 hover:bg-slate-900 text-white px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-bold transition shadow-sm flex-1 text-center"
                                >
                                  <i className="bi bi-check2 mr-1"></i> Okay, I Accept
                                </button>
                              </div>
                            )}

                            {/* Acknowledgment Confirmed */}
                            {(acknowledgedCancellations.includes(apt._id) || apt.patientReply) && (
                              <div className="mt-2 pl-8 md:pl-10 text-[10px] md:text-xs font-bold text-slate-400 flex items-center gap-1">
                                <i className="bi bi-check-circle-fill text-emerald-500"></i> Cancellation Acknowledged
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 2: BOOK APPOINTMENT (Responsive) --- */}
            {activeTab === 'book' && (
              <div className="animate-fade-in max-w-3xl mx-auto">
                <div className="mb-6 md:mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">Schedule a Visit</h2>
                  <p className="text-sm md:text-base text-slate-500 mt-2">Select a specialist and find a time that works for you.</p>
                </div>

                <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-xl">
                  <form onSubmit={handleBookAppointment} className="space-y-5 md:space-y-6">
                    
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Specialist</label>
                      <select required className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition font-medium text-slate-700 text-sm md:text-base" value={bookingData.doctorName} onChange={(e) => setBookingData({...bookingData, doctorName: e.target.value})}>
                        {availableDoctors.length === 0 && <option>Loading doctors...</option>}
                        {availableDoctors.map(doc => <option key={doc._id} value={doc.name}>{doc.name} - {doc.specialty}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Date</label>
                        <input required type="date" className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition font-medium text-slate-700 text-sm md:text-base" onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Available Time</label>
                        <select required className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition font-medium text-slate-700 text-sm md:text-base" value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})}>
                          {dynamicTimeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reason for visit (Service)</label>
                      <input type="text" placeholder="e.g. General Checkup, Fever, Routine Review" className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition font-medium text-slate-700 text-sm md:text-base" value={bookingData.service} onChange={(e) => setBookingData({...bookingData, service: e.target.value})} />
                    </div>

                    <div className="pt-2 md:pt-4">
                      <button disabled={bookingLoading} className="w-full bg-blue-600 text-white font-black py-3 md:py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-none transition-all disabled:bg-blue-300 text-sm md:text-base">
                        {bookingLoading ? 'Securing Appointment...' : 'Confirm Appointment'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* --- TAB 3: MEDICAL RECORDS (FULLY RESPONSIVE) --- */}
            {activeTab === 'records' && (
              <div className="animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">My Medical Records</h2>
                  <p className="text-sm md:text-base text-slate-500 mt-2">Access your past visit summaries, prescriptions, and official health reports.</p>
                </div>

                {completedAppointmentsList.length === 0 ? (
                  <div className="bg-white p-8 md:p-12 rounded-2xl border border-dashed border-slate-300 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4">
                       <i className="bi bi-folder-x"></i>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-700 mb-2">No records found</h3>
                    <p className="text-xs md:text-sm text-slate-500">You do not have any completed medical reports yet. Records will appear here after a physician completes your visit.</p>
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-6">
                    {completedAppointmentsList.map((record) => (
                      <div key={record._id} className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        
                        {/* Record Header - Always on top */}
                        <div className="p-4 md:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-lg md:text-xl shadow-sm">
                                <i className="bi bi-file-earmark-medical-fill"></i>
                              </div>
                              <div>
                                <h4 className="font-black text-base md:text-xl text-slate-800">{record.service}</h4>
                                <p className="text-xs md:text-sm font-bold text-slate-500">
                                  {record.doctorName}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-emerald-100 text-emerald-700 px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase">
                                Completed
                              </span>
                              <span className="text-[10px] md:text-xs text-slate-400">
                                {record.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Record Content - Responsive two-column layout that stacks on mobile */}
                        <div className="flex flex-col lg:flex-row">
                          
                          {/* Left Column: Prescription Details */}
                          <div className="flex-1 p-4 md:p-6 lg:border-r border-slate-100">
                            <div className="mb-4">
                              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <i className="bi bi-capsule text-blue-500"></i> Prescription & Treatment Notes
                              </p>
                              <div className="bg-slate-50 rounded-xl p-3 md:p-4 border border-slate-100">
                                <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                                  {record.prescription || "No detailed notes provided by the doctor for this session."}
                                </p>
                              </div>
                            </div>
                            
                            {/* Visit Details */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                              <div className="bg-blue-50/30 rounded-lg p-2 md:p-3">
                                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">Visit Date</p>
                                <p className="text-xs md:text-sm font-bold text-slate-700">{record.date}</p>
                              </div>
                              <div className="bg-blue-50/30 rounded-lg p-2 md:p-3">
                                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">Time</p>
                                <p className="text-xs md:text-sm font-bold text-slate-700">{record.time}</p>
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Report Actions */}
                          <div className="bg-slate-50 p-5 md:p-6 lg:w-72 flex flex-col justify-center items-center text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-rose-500 text-2xl md:text-3xl mb-3 md:mb-4 border border-slate-100">
                              <i className="bi bi-file-pdf-fill"></i>
                            </div>
                            <h5 className="font-bold text-slate-800 mb-1 text-sm md:text-base">Official Medical Report</h5>
                            <p className="text-[10px] md:text-xs text-slate-500 mb-4 md:mb-6">Generated on {record.date}</p>
                            
                            <div className="w-full space-y-2">
                              <button 
                                onClick={() => window.print()} 
                                className="w-full bg-white border-2 border-blue-600 text-blue-600 font-bold py-2 md:py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm text-xs md:text-sm"
                              >
                                <i className="bi bi-download mr-2"></i> Download PDF
                              </button>
                              <button 
                                onClick={() => window.print()} 
                                className="w-full bg-blue-600 text-white font-bold py-2 md:py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm text-xs md:text-sm"
                              >
                                <i className="bi bi-printer mr-2"></i> Print Report
                              </button>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --- TAB 4: MY PROFILE (Responsive) --- */}
            {activeTab === 'profile' && (
              <div className="animate-fade-in max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-8">My Profile</h2>
                
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                   <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-5xl md:text-6xl font-black shadow-lg shadow-blue-200 shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                   </div>
                   <div className="text-center md:text-left flex-1">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{user.name}</h3>
                      <p className="text-slate-500 font-medium mb-4 flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
                         <i className="bi bi-envelope"></i> {user.email}
                      </p>
                      <span className="bg-green-100 text-green-700 px-3 md:px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest inline-block mb-6">
                         <i className="bi bi-shield-check mr-1"></i> Verified Patient
                      </span>
                      
                      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 md:pt-6 mt-2">
                         <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Role</p>
                            <p className="font-bold text-slate-700 capitalize text-sm md:text-base">{user.role}</p>
                         </div>
                         <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient ID</p>
                            <p className="font-mono font-bold text-slate-700 text-xs md:text-sm">#{user.id ? user.id.slice(-6).toUpperCase() : 'N/A'}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-blue-50 rounded-xl md:rounded-2xl p-5 md:p-6 border border-blue-100 flex items-start gap-3 md:gap-4">
                   <div className="text-2xl md:text-3xl text-blue-500"><i className="bi bi-info-circle-fill"></i></div>
                   <div>
                      <h4 className="font-bold text-blue-900 mb-1 text-sm md:text-base">Need to update your details?</h4>
                      <p className="text-xs md:text-sm text-blue-700 leading-relaxed">To change your primary email or contact information, please speak to the front desk administrator during your next visit to the clinic to ensure your medical records remain secure.</p>
                   </div>
                </div>

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

// --- HELPER COMPONENT FOR SIDEBAR (Responsive) ---
const SidebarButton = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-sm md:text-base ${
      isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800'
    }`}
  >
    <i className={`bi ${icon} text-base md:text-lg`}></i>
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden">{label}</span>
  </button>
);

export default PatientDashboard;