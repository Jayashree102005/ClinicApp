import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

const DoctorDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- UI States ---
  const [activeTab, setActiveTab] = useState('schedule');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Emergency State ---
  const [isEmergency, setIsEmergency] = useState(false);

  // --- Data States ---
  const [patients, setPatients] = useState([]); // All appointments

  // --- Prescription States ---
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'doctor') navigate('/login');
    fetchDashboardData();
  }, [user, navigate]);

  // 🚨 UPDATED: Now fetches BOTH appointments AND the doctor's true database status
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');

      // 1. Fetch Patients
      const apptResponse = await axios.get(`${API_URL}/api/appointments/doctor/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(apptResponse.data);

      // 2. Fetch My Own Doctor Profile to check Emergency Status
      const docsResponse = await axios.get(`${API_URL}/api/doctors`);
      const myProfile = docsResponse.data.find(doc => doc.email === user.email);

      if (myProfile && myProfile.status === 'Unavailable') {
        setIsEmergency(true);
      } else {
        setIsEmergency(false);
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      setLoading(false);
    }
  };

  // --- Handle Prescription Submission ---
  const handlePrescribeSubmit = async () => {
    if (!prescriptionText.trim()) return alert("Prescription cannot be empty.");

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');
      await axios.put(`${API_URL}/api/appointments/${selectedAppointment._id}/prescribe`, {
        prescription: prescriptionText,
        status: 'Completed'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSelectedAppointment(null);
      setPrescriptionText('');
      fetchDashboardData();

    } catch (err) {
      console.error("Failed to submit prescription", err);
      alert("Failed to save prescription. Please try again.");
    }
  };

  // --- 🚨 UPDATED: Handle Emergency Leave Toggle ---
  const toggleEmergencyLeave = async () => {
    const newStatus = isEmergency ? 'Available' : 'Unavailable';

    // Custom confirmation messages based on the action
    const confirmMsg = isEmergency
      ? "Are you sure you want to resume work? Your status will be marked as Active."
      : "Declare Emergency Leave? This will alert administrators to cancel your appointments.";

    if (!window.confirm(confirmMsg)) return;

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');
      await axios.patch(`${API_URL}/api/doctors/update-schedule`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsEmergency(!isEmergency);
      alert(isEmergency ? "✅ You are now Active. Administrators have been notified." : "🚨 Emergency Leave Active. Admin alerted.");

    } catch (err) {
      console.error(err);
      alert("Failed to update emergency status.");
    }
  };

  // --- Data Derivations ---
  const uniquePatients = Array.from(
    new Map(patients.map(p => [p.patientId?._id, p])).values()
  ).map(p => ({
    ...p.patientId,
    latestDate: p.date,
    totalVisits: patients.filter(visit => visit.patientId?._id === p.patientId?._id).length
  }));

  const pendingVisits = patients.filter(p => p.status === 'Accepted').length;
  const completedVisits = patients.filter(p => p.status === 'Completed').length;
  const totalPatients = uniquePatients.length;

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-blue-600">Loading Physician Workspace...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

      {/* ================= SIDEBAR (Mobile + Desktop) ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-5 md:p-6 border-b border-blue-800 flex justify-between items-center h-16 md:h-20">
          <div>
            <Link
              to="/"
              className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-white"
            >
              <i className="bi bi-heart-pulse-fill text-2xl"></i>
              ClinicApp
            </Link>
            <p className="text-[8px] md:text-[10px] text-blue-300 uppercase tracking-widest font-bold mt-1">Physician Portal</p>
          </div>
          <button className="md:hidden text-blue-200 text-2xl" onClick={() => setIsSidebarOpen(false)}><i className="bi bi-x"></i></button>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2">
          <SidebarButton icon="bi-calendar-event" label="My Schedule" isActive={activeTab === 'schedule'} onClick={() => { setActiveTab('schedule'); setIsSidebarOpen(false); }} />
          <SidebarButton icon="bi-people-fill" label="Patient Directory" isActive={activeTab === 'directory'} onClick={() => { setActiveTab('directory'); setIsSidebarOpen(false); }} />
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Header Section (Responsive) */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex justify-between items-center shadow-sm z-10 shrink-0">
          <button className="md:hidden text-slate-600 text-2xl" onClick={() => setIsSidebarOpen(true)}><i className="bi bi-list"></i></button>

          <div className="hidden md:block">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Physician Workspace</p>
            <h1 className="text-base md:text-xl font-black text-slate-900 truncate max-w-[200px]">{user.name}</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">

            {/* HEADER EMERGENCY BUTTON */}
            <button
              onClick={toggleEmergencyLeave}
              className={`px-2 md:px-4 py-1.5 md:py-2 rounded-xl font-bold text-[10px] md:text-xs transition-colors shadow-sm ${isEmergency
                  ? 'bg-rose-500 text-white animate-pulse shadow-rose-200'
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                }`}
            >
              <i className={`bi ${isEmergency ? 'bi-exclamation-triangle-fill' : 'bi-shield-fill-check'} mr-1`}></i>
              <span className="hidden xs:inline">{isEmergency ? 'On Emergency Leave' : 'Declare Emergency'}</span>
              <span className="xs:hidden">{isEmergency ? 'Leave' : 'Emergency'}</span>
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-xs md:text-sm font-black text-slate-800 truncate max-w-[120px]">{user.name}</p>
              <p className={`text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded uppercase inline-block ${isEmergency ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                {isEmergency ? 'Unavailable' : 'Attending'}
              </p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer hover:bg-blue-700 transition text-sm md:text-base" onClick={() => setActiveTab('profile')}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">

            {/* --- TAB 1: SCHEDULE (Responsive) --- */}
            {activeTab === 'schedule' && (
              <div className="animate-fade-in">

                {/* EMERGENCY BANNER */}
                {isEmergency && (
                  <div className="bg-rose-100 border-2 border-rose-200 p-4 md:p-6 rounded-2xl md:rounded-3xl mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
                    <div>
                      <h3 className="text-rose-800 font-black text-base md:text-xl flex items-center gap-2 mb-1">
                        <i className="bi bi-exclamation-triangle-fill text-xl md:text-2xl"></i> EMERGENCY LEAVE ACTIVE
                      </h3>
                      <p className="text-rose-700 text-xs md:text-sm font-medium">
                        You are currently marked as unavailable. Administrators have been notified to cancel your appointments.
                      </p>
                    </div>
                    <button
                      onClick={toggleEmergencyLeave}
                      className="mt-3 md:mt-0 bg-white text-rose-600 px-4 md:px-6 py-2 md:py-3 rounded-xl font-black text-xs md:text-sm shadow-md hover:bg-rose-50 transition w-full md:w-auto shrink-0"
                    >
                      <i className="bi bi-play-circle-fill mr-2"></i> End Leave & Resume Work
                    </button>
                  </div>
                )}

                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">My Schedule</h1>
                  <p className="text-sm md:text-base text-slate-500">Manage your daily appointments and prescribe medications.</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
                  <MetricCard title="Action Required" value={pendingVisits} icon="bi-clipboard-pulse" color="bg-amber-500" subtext="Awaiting prescription" />
                  <MetricCard title="Completed Today" value={completedVisits} icon="bi-check-circle" color="bg-emerald-500" subtext="Successfully treated" />
                  <MetricCard title="Total Patients" value={totalPatients} icon="bi-people" color="bg-blue-500" subtext="In your registry" />
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-sm md:text-base">Appointment Queue</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px] md:min-w-0">
                      <thead className="bg-white text-[10px] md:text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
                        <tr>
                          <th className="p-4 md:p-6 whitespace-nowrap">Patient Details</th>
                          <th className="p-4 md:p-6 whitespace-nowrap">Service</th>
                          <th className="p-4 md:p-6 whitespace-nowrap">Date & Time</th>
                          <th className="p-4 md:p-6 whitespace-nowrap">Status</th>
                          <th className="p-4 md:p-6 text-right whitespace-nowrap">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs md:text-sm">
                        {patients.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-8 md:p-12 text-center text-slate-400 italic text-sm">No appointments assigned to you yet.</td>
                          </tr>
                        ) : (
                          patients.map(p => (
                            <tr key={p._id} className="hover:bg-slate-50/50 transition">
                              <td className="p-4 md:p-6">
                                <p className="font-bold text-slate-800 text-sm md:text-base">{p.patientId?.name || "Unknown"}</p>
                                <p className="text-[10px] md:text-xs text-slate-500 truncate max-w-[150px] md:max-w-none">{p.patientId?.email}</p>
                              </td>
                              <td className="p-4 md:p-6 font-medium text-slate-600 text-xs md:text-sm">{p.service}</td>
                              <td className="p-4 md:p-6">
                                <p className="font-bold text-slate-800 text-xs md:text-sm">{p.date}</p>
                                <p className="text-[10px] md:text-xs text-blue-600 font-bold">{p.time}</p>
                              </td>
                              <td className="p-4 md:p-6">
                                <span className={`px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-black uppercase rounded-lg ${p.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                    p.status === 'Accepted' ? 'bg-amber-100 text-amber-700' :
                                      p.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                                        'bg-slate-100 text-slate-600'
                                  }`}>
                                  {p.status === 'Accepted' ? 'Waiting' : p.status}
                                </span>
                              </td>
                              <td className="p-4 md:p-6 text-right">
                                {p.status === 'Accepted' ? (
                                  <button
                                    onClick={() => setSelectedAppointment(p)}
                                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl font-bold shadow-sm shadow-blue-200 text-[10px] md:text-xs"
                                  >
                                    Write Prescription
                                  </button>
                                ) : p.status === 'Cancelled' ? (
                                  <span className="text-rose-500 font-bold text-[10px] md:text-xs"><i className="bi bi-x-circle-fill mr-1"></i> Cancelled</span>
                                ) : (
                                  <span className="text-emerald-500 font-bold text-[10px] md:text-xs"><i className="bi bi-check2-all mr-1"></i> Done</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: PATIENT DIRECTORY (Responsive) --- */}
            {activeTab === 'directory' && (
              <div className="animate-fade-in">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">Patient Directory</h1>
                  <p className="text-sm md:text-base text-slate-500">A complete registry of patients who have consulted with you.</p>
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[500px] md:min-w-0">
                      <thead className="bg-slate-50 text-[10px] md:text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
                        <tr>
                          <th className="p-4 md:p-6">Name</th>
                          <th className="p-4 md:p-6">Contact</th>
                          <th className="p-4 md:p-6">Last Visit</th>
                          <th className="p-4 md:p-6 text-center">Visits</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs md:text-sm">
                        {uniquePatients.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-8 md:p-12 text-center text-slate-400 italic">Your directory is empty.</td>
                          </tr>
                        ) : (
                          uniquePatients.map((p, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition">
                              <td className="p-4 md:p-6">
                                <div className="flex items-center gap-2 md:gap-3">
                                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-[10px] md:text-xs">
                                    {p.name?.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="font-bold text-slate-800 text-xs md:text-sm truncate max-w-[100px] md:max-w-none">{p.name}</span>
                                </div>
                              </td>
                              <td className="p-4 md:p-6 text-slate-500 text-[10px] md:text-xs truncate max-w-[120px] md:max-w-none">{p.email}</td>
                              <td className="p-4 md:p-6 font-medium text-slate-600 text-xs md:text-sm">{p.latestDate}</td>
                              <td className="p-4 md:p-6 text-center">
                                <span className="inline-block px-2 md:px-3 py-1 bg-blue-50 text-blue-600 font-black rounded-lg text-[10px] md:text-xs">
                                  {p.totalVisits}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 3: MY PROFILE (Responsive) --- */}
            {activeTab === 'profile' && (
              <div className="animate-fade-in max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-8">Physician Profile</h2>

                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-5xl md:text-6xl font-black shadow-lg shadow-blue-200 shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{user.name}</h3>
                    <p className="text-slate-500 font-medium mb-4 flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm break-all">
                      <i className="bi bi-envelope"></i> {user.email}
                    </p>

                    <span className={`px-3 md:px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest inline-block mb-6 ${isEmergency ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                      <i className={`bi ${isEmergency ? 'bi-exclamation-triangle' : 'bi-shield-check'} mr-1`}></i>
                      {isEmergency ? 'Unavailable / Leave' : 'Authorized Medical Staff'}
                    </span>

                    <div className="grid grid-cols-2 gap-3 md:gap-4 border-t border-slate-100 pt-5 md:pt-6 mt-2">
                      <div>
                        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Role</p>
                        <p className="font-bold text-slate-700 capitalize text-sm md:text-base">{user.role}</p>
                      </div>
                      <div>
                        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Staff ID</p>
                        <p className="font-mono font-bold text-slate-700 text-xs md:text-sm">#{user.id ? user.id.slice(-6).toUpperCase() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl md:rounded-2xl p-5 md:p-6 border border-amber-100 flex items-start gap-3 md:gap-4">
                  <div className="text-2xl md:text-3xl text-amber-500"><i className="bi bi-info-circle-fill"></i></div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1 text-sm md:text-base">Profile Adjustments</h4>
                    <p className="text-xs md:text-sm text-amber-700 leading-relaxed">Changes to your specialty, working hours, experience, and fee must be processed by the Clinic Administrator to ensure proper scheduling synchronization.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- PRESCRIPTION MODAL OVERLAY (Responsive) --- */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in border border-slate-100 mx-4">
              <div className="p-5 md:p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-lg md:text-xl text-slate-800">Issue Prescription</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">
                    Patient: <span className="font-bold text-slate-700">{selectedAppointment.patientId?.name}</span>
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedAppointment(null); setPrescriptionText(''); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 md:p-6">
                <label className="block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Clinical Notes & Medications</label>
                <textarea
                  className="w-full min-h-[180px] md:min-h-[200px] p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-y text-slate-700 transition-colors text-sm"
                  placeholder="Enter medicines, dosage instructions, and diagnostic notes here..."
                  value={prescriptionText}
                  onChange={(e) => setPrescriptionText(e.target.value)}
                  autoFocus
                ></textarea>
              </div>

              <div className="p-5 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => { setSelectedAppointment(null); setPrescriptionText(''); }}
                  className="px-4 md:px-6 py-2 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePrescribeSubmit}
                  className="px-4 md:px-6 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-sm"
                >
                  Save & Issue
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS (Responsive) ---
const SidebarButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-sm md:text-base ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800'
      }`}
  >
    <i className={`bi ${icon} text-base md:text-lg`}></i>
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden">{label}</span>
  </button>
);

const MetricCard = ({ title, value, icon, color, subtext }) => (
  <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-4 md:p-6 flex flex-col relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 ${color} opacity-10 rounded-bl-[80px] md:rounded-bl-[100px] rounded-tr-2xl md:rounded-tr-3xl`}></div>
    <div className="flex justify-between items-start mb-2">
      <p className="text-slate-500 text-[8px] md:text-xs font-bold uppercase tracking-wider">{title}</p>
      <div className={`w-8 h-8 md:w-10 md:h-10 ${color} text-white rounded-xl flex items-center justify-center text-base md:text-lg shadow-sm`}>
        <i className={`bi ${icon}`}></i>
      </div>
    </div>
    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{value}</h3>
    <p className="text-[8px] md:text-[10px] text-slate-400 font-semibold">{subtext}</p>
  </div>
);

export default DoctorDashboard;