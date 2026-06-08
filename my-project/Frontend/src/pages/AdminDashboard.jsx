import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Tab & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data States
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);

  // Form State for New Doctor
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: 'General',
    email: '',
    phone: '',
    experience: '',
    fee: '',
    bio: ''
  });

  // Fetch Data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch Appointments
        const apptRes = await axios.get(`${API_URL}/api/appointments/admin/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(apptRes.data);

        // Fetch Permanent Doctors
        const docRes = await axios.get(`${API_URL}/api/doctors`);
        setDoctorsList(docRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Administrative fetch failed", err);
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleStatusChange = async (id, newStatus, reason = '') => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`${API_URL}/api/appointments/admin/status/${id}`,
        { status: newStatus, cancellationReason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(appointments.map(app => app._id === id ? res.data : app));

      if (newStatus === 'Cancelled') {
        alert("✅ Appointment Cancelled.\n\nThe patient will now see a 'Cancelled' alert on their dashboard.");
      }
    } catch (err) {
      alert("Failed to alter status.");
    }
  };

  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const doctorData = {
        name: newDoctor.name.startsWith('Dr.') ? newDoctor.name : `Dr. ${newDoctor.name}`,
        specialty: newDoctor.specialty,
        email: newDoctor.email,
        phone: newDoctor.phone,
        experience: newDoctor.experience,
        fee: newDoctor.fee,
        bio: newDoctor.bio,
        status: 'Available'
      };

      const res = await axios.post(`${API_URL}/api/doctors/add`, doctorData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDoctorsList([...doctorsList, res.data]);
      setNewDoctor({ name: '', specialty: 'General', email: '', phone: '', experience: '', fee: '', bio: '' });
      setShowAddDoctorModal(false);
      alert("✅ Doctor permanently added to the database!");

    } catch (error) {
      console.error(error);
      alert("Failed to save doctor to database.");
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor from the clinic?")) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(`${API_URL}/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDoctorsList(doctorsList.filter(doc => doc._id !== id));

    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to remove doctor.");
    }
  };

  // --- METRICS ---
  const pendingAppointments = appointments.filter(a => a.status === 'Pending');
  const pendingCount = pendingAppointments.length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const estimatedRevenue = completedCount * 150;

  const uniquePatients = [];
  const patientMap = new Map();
  appointments.forEach(app => {
    if (app.patientId && !patientMap.has(app.patientId._id)) {
      patientMap.set(app.patientId._id, true);
      uniquePatients.push({
        id: app.patientId._id,
        name: app.patientId.name,
        email: app.patientId.email,
        lastVisitDate: app.date,
        lastDoctor: app.doctorName
      });
    }
  });

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-slate-500">Loading Clinic Control Center...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans overflow-hidden">

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden bg-blue-800 text-white px-4 py-3 flex items-center justify-between shadow-lg z-30">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-white"
            >
              <i className="bi bi-heart-pulse-fill text-2xl"></i>
              ClinicApp
            </Link>
          </div>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl focus:outline-none">
          <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
      </div>

      {/* ================= SIDEBAR (Desktop & Mobile) ================= */}
      <aside className={`
        fixed md:relative inset-0 z-40 w-64 bg-blue-800 text-white flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:translate-x-0
      `}>
        <div className="p-6 border-b border-blue-700/50">
          <Link
            to="/"
            className="flex items-center gap-3 text-white"
          >
            <i className="bi bi-heart-pulse-fill text-3xl"></i>

            <div>
              <h2 className="font-extrabold text-xl tracking-tight">
                ClinicApp
              </h2>
              <p className="text-[10px] text-blue-200 uppercase tracking-[3px] font-bold">
                Admin Portal
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <SidebarButton icon="bi-grid-1x2-fill" label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} />
          <SidebarButton icon="bi-calendar-check-fill" label="Appointments" isActive={activeTab === 'appointments'} onClick={() => { setActiveTab('appointments'); setIsMobileMenuOpen(false); }} badge={pendingCount} />
          <SidebarButton icon="bi-heart-pulse-fill" label="Doctors" isActive={activeTab === 'doctors'} onClick={() => { setActiveTab('doctors'); setIsMobileMenuOpen(false); }} />
          <SidebarButton icon="bi-people-fill" label="Patients" isActive={activeTab === 'patients'} onClick={() => { setActiveTab('patients'); setIsMobileMenuOpen(false); }} />
        </div>

        <div className="p-4 border-t border-blue-700/50">
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-rose-500 text-white rounded-xl font-bold transition">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay when sidebar is open */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 text-white rounded-md flex items-center justify-center font-bold">A</div>
            <div className="hidden md:block">
              <h3 className="font-bold text-slate-800 text-sm">Admin Panel</h3>
              <p className="text-[10px] text-slate-400 font-medium leading-none">Clinical Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-slate-400 text-xl relative">
            <div className="relative">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="hover:text-blue-600 focus:outline-none transition-colors">
                <i className="bi bi-bell"></i>
                {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-800">Notifications</h4>
                    <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-full">{pendingCount} New</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {pendingAppointments.length === 0 ? (
                      <div className="p-4 text-center text-sm text-slate-400">No new notifications.</div>
                    ) : (
                      pendingAppointments.map(app => (
                        <div key={app._id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer" onClick={() => { setActiveTab('appointments'); setIsNotifOpen(false); setIsMobileMenuOpen(false); }}>
                          <p className="text-sm font-bold text-slate-800">{app.patientId?.name || 'Unknown Patient'}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Requested an appointment with {app.doctorName}</p>
                          <p className="text-[10px] text-blue-600 font-bold mt-2"><i className="bi bi-clock"></i> Pending Approval</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8" onClick={() => isNotifOpen && setIsNotifOpen(false)}>

          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto animate-fade-in">

              {/* 🚨 EMERGENCY BANNER 🚨 */}
              {doctorsList.filter(d => d.status === 'Unavailable').length > 0 && (
                <div className="bg-rose-100 border border-rose-200 p-4 md:p-5 rounded-2xl mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between shadow-sm">
                  <div>
                    <h3 className="text-rose-800 font-black text-base md:text-lg flex items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill"></i> Doctor Emergency Alert!
                    </h3>
                    <p className="text-rose-700 text-xs md:text-sm font-medium mt-1">
                      The following doctors are on emergency leave:
                      <span className="font-black ml-1">
                        {doctorsList.filter(d => d.status === 'Unavailable').map(d => d.name).join(', ')}
                      </span>
                    </p>
                    <p className="text-rose-700 text-xs mt-1">Please locate their pending or accepted appointments below and cancel them.</p>
                  </div>
                </div>
              )}

              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">Welcome Back, Admin</h1>
                <p className="text-slate-500 text-sm md:text-base mt-1">Here is what is happening with your clinic today.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <MetricCard title="Patients Visited" value={completedCount} icon="bi-people" color="bg-blue-500" subtext="Successfully treated" />
                <MetricCard title="Est. Revenue" value={`$${estimatedRevenue}`} icon="bi-cash-stack" color="bg-amber-500" subtext="Based on completed visits" />
                <MetricCard title="Pending Appts" value={pendingCount} icon="bi-clock-history" color="bg-amber-400" subtext="Require approval" />
                <MetricCard title="Active Doctors" value={doctorsList.length} icon="bi-heart-pulse" color="bg-rose-500" subtext="Registered in system" />
              </div>

              {/* DASHBOARD QUICK ACTION */}
              <div className="mb-6 md:mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setShowAddDoctorModal(true)} className="bg-rose-500 hover:bg-rose-600 text-white px-4 md:px-5 py-2.5 rounded-xl font-bold shadow-sm transition flex items-center gap-2 text-sm md:text-base">
                    <i className="bi bi-plus-lg"></i> Add Doctor
                  </button>
                  <button onClick={() => setActiveTab('appointments')} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 md:px-5 py-2.5 rounded-xl font-bold transition text-sm md:text-base">
                    View All Appointments
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800">Recent Appointments</h3>
                      <p className="text-xs text-slate-400">Latest 5 requests</p>
                    </div>
                    <button onClick={() => setActiveTab('appointments')} className="text-rose-500 text-sm font-bold hover:underline">View all &rarr;</button>
                  </div>
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map(app => (
                      <div key={app._id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="font-bold text-sm text-slate-900">{app.patientId?.name || 'Unknown'}</p>
                          <p className="text-xs text-slate-500">{app.service} with {app.doctorName}</p>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800">Action Required</h3>
                      <p className="text-xs text-slate-400">Pending Approvals</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {pendingAppointments.slice(0, 3).map(app => (
                      <div key={app._id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="font-bold text-sm text-slate-900">{app.patientId?.name || 'Unknown'}</p>
                          <p className="text-xs text-amber-500 font-medium">Waiting for approval</p>
                        </div>
                        <button onClick={() => setActiveTab('appointments')} className="bg-amber-50 text-amber-600 px-3 py-1 rounded-lg text-xs font-bold border border-amber-100">Review</button>
                      </div>
                    ))}
                    {pendingAppointments.length === 0 && (
                      <p className="text-center text-slate-400 text-sm py-4">No pending approvals</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6">Appointment Management</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                      <th className="py-3 md:py-4 px-4 md:px-6">Patient</th>
                      <th className="py-3 md:py-4 px-4 md:px-6">Doctor & Service</th>
                      <th className="py-3 md:py-4 px-4 md:px-6">Date & Time</th>
                      <th className="py-3 md:py-4 px-4 md:px-6">Status</th>
                      <th className="py-3 md:py-4 px-4 md:px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-slate-400 italic">No appointments found</td>
                      </tr>
                    ) : (
                      appointments.map((app) => (
                        <tr key={app._id} className="hover:bg-slate-50 transition">
                          <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-slate-900">{app.patientId?.name || "Unknown"}</td>
                          <td className="py-3 md:py-4 px-4 md:px-6">
                            <span className="font-semibold">{app.doctorName}</span>
                            <span className="block text-xs text-slate-400">{app.service}</span>
                          </td>
                          <td className="py-3 md:py-4 px-4 md:px-6">
                            {app.date} <span className="block text-xs text-blue-600 font-bold">{app.time}</span>
                          </td>
                          <td className="py-3 md:py-4 px-4 md:px-6"><StatusBadge status={app.status} /></td>
                          <td className="py-3 md:py-4 px-4 md:px-6 text-right">
                            <div className="flex flex-wrap justify-end gap-2">
                              {app.status === 'Pending' && (
                                <button onClick={() => handleStatusChange(app._id, 'Accepted')} className="bg-blue-600 text-white px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm">Approve</button>
                              )}
                              {app.status === 'Accepted' && (
                                <button onClick={() => handleStatusChange(app._id, 'Completed')} className="bg-green-500 text-white px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm">Mark Visited</button>
                              )}
                              {(app.status === 'Pending' || app.status === 'Accepted') && (
                                <button onClick={() => {
                                  const isDocUnavailable = doctorsList.find(d => d.name === app.doctorName)?.status === 'Unavailable';
                                  const reason = isDocUnavailable
                                    ? `Appointment cancelled: Unfortunately, ${app.doctorName} is unavailable today due to an unexpected medical emergency.`
                                    : `Appointment cancelled by clinic administration.`;
                                  handleStatusChange(app._id, 'Cancelled', reason);
                                }} className="bg-rose-50 text-rose-600 px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition hover:bg-rose-100">
                                  Cancel
                                </button>
                              )}
                            </div>
                            {(app.status === 'Completed' || app.status === 'Cancelled') && (
                              <div className="mt-2 flex flex-col items-end">
                                <span className="text-xs font-bold text-slate-500 block">
                                  {app.status === 'Completed' ? (
                                    <span className="text-green-600"><i className="bi bi-check-circle-fill mr-1"></i> Prescribed & Visited</span>
                                  ) : (
                                    <span className="text-rose-400"><i className="bi bi-x-circle-fill mr-1"></i> Cancelled</span>
                                  )}
                                </span>
                                {app.status === 'Cancelled' && app.patientReply && (
                                  <div className="mt-2 p-2 bg-white border border-slate-200 rounded-md shadow-sm text-left w-full max-w-[170px]">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Patient Response:</p>
                                    {app.patientReply === 'accept' && (
                                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                                        <i className="bi bi-check-circle-fill"></i> Accepted
                                      </span>
                                    )}
                                    {app.patientReply === 'same_doctor' && (
                                      <span className="text-blue-600 font-bold text-xs flex items-center gap-1">
                                        <i className="bi bi-arrow-repeat"></i> Re-booking (Same)
                                      </span>
                                    )}
                                    {app.patientReply === 'another_doctor' && (
                                      <span className="text-amber-600 font-bold text-xs flex items-center gap-1">
                                        <i className="bi bi-person-lines-fill"></i> Re-booking (Diff)
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB 3: DOCTORS --- */}
          {activeTab === 'doctors' && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-black text-slate-900">Medical Staff</h2>
                <button onClick={() => setShowAddDoctorModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2.5 rounded-xl font-bold shadow-sm transition flex items-center gap-2 text-sm md:text-base">
                  <i className="bi bi-plus-lg"></i> Add New Doctor
                </button>
              </div>

              {doctorsList.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12 text-center text-slate-400">
                  <i className="bi bi-person-badge text-4xl md:text-5xl mb-3 block"></i>
                  <h3 className="text-base md:text-lg font-bold text-slate-700">No Doctors Found</h3>
                  <p className="text-sm">Click "Add New Doctor" to populate your database.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {doctorsList.map(doctor => (
                    <div key={doctor._id} className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6 text-center hover:shadow-md transition group">
                      <button
                        onClick={() => handleDeleteDoctor(doctor._id)}
                        className="absolute top-3 right-3 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Remove Doctor"
                      >
                        <i className="bi bi-trash-fill text-base md:text-lg"></i>
                      </button>
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-4 border-4 border-white shadow-sm">
                        <i className="bi bi-person-heart"></i>
                      </div>
                      <h3 className="font-black text-base md:text-lg text-slate-900">{doctor.name}</h3>
                      <p className="text-xs md:text-sm font-bold text-blue-600 mb-4">{doctor.specialty}</p>
                      <div className="space-y-2 text-xs text-slate-500 mb-5 md:mb-6 bg-slate-50 p-3 rounded-xl text-left">
                        <p className="truncate"><i className="bi bi-envelope mr-2 text-slate-400"></i> {doctor.email}</p>
                        <p><i className="bi bi-telephone mr-2 text-slate-400"></i> {doctor.phone}</p>
                        <p><i className="bi bi-briefcase mr-2 text-slate-400"></i> Exp: {doctor.experience || 'N/A'} | Fee: {doctor.fee || 'N/A'}</p>
                      </div>
                      <span className={`inline-block px-3 md:px-4 py-1.5 rounded-lg text-xs font-bold border ${doctor.status === 'Available' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-rose-50 text-rose-600 border-rose-100 animate-pulse'
                        }`}>
                        {doctor.status === 'Available' ? '● Taking Appointments' : '● Emergency Leave'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6">Patient Registry</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                      <th className="py-3 md:py-4 px-4 md:px-6">Patient ID</th>
                      <th className="py-3 md:py-4 px-4 md:px-6">Patient Name</th>
                      <th className="py-3 md:py-4 px-4 md:px-6">Contact Email</th>
                      <th className="py-3 md:py-4 px-4 md:px-6">Latest Appointment</th>
                      <th className="py-3 md:py-4 px-4 md:px-6 text-right">Attending Doctor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {uniquePatients.length === 0 ? (
                      <tr><td colSpan="5" className="py-12 text-center text-slate-400 italic">No patients have booked appointments yet.</td></tr>
                    ) : (
                      uniquePatients.map((patient, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition">
                          <td className="py-3 md:py-4 px-4 md:px-6 text-xs text-slate-400 font-mono">#{patient.id.slice(-6).toUpperCase()}</td>
                          <td className="py-3 md:py-4 px-4 md:px-6 font-bold text-slate-900">{patient.name}</td>
                          <td className="py-3 md:py-4 px-4 md:px-6 text-slate-500 text-xs md:text-sm break-all">{patient.email}</td>
                          <td className="py-3 md:py-4 px-4 md:px-6 font-medium text-slate-800 text-xs md:text-sm">{patient.lastVisitDate}</td>
                          <td className="py-3 md:py-4 px-4 md:px-6 text-right font-semibold text-blue-600 text-xs md:text-sm">{patient.lastDoctor}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ================= ADD DOCTOR MODAL (Responsive) ================= */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-600 px-5 md:px-6 py-4 flex justify-between items-center text-white sticky top-0">
              <h3 className="font-bold text-base md:text-lg"><i className="bi bi-person-plus-fill mr-2"></i> Register New Doctor</h3>
              <button onClick={() => setShowAddDoctorModal(false)} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
            </div>

            <form onSubmit={handleAddDoctorSubmit} className="p-5 md:p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Doctor Name</label>
                <input required type="text" placeholder="e.g. John Doe" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Specialty</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })}>
                  <option value="General">General</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Gynaecologist">Gynaecologist</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                  <input required type="email" placeholder="doc@clinic.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" value={newDoctor.email} onChange={e => setNewDoctor({ ...newDoctor, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
                  <input required type="text" placeholder="(555) 000-0000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" value={newDoctor.phone} onChange={e => setNewDoctor({ ...newDoctor, phone: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Experience</label>
                  <input required type="text" placeholder="e.g. 10+ Years" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" value={newDoctor.experience} onChange={e => setNewDoctor({ ...newDoctor, experience: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Session Fee</label>
                  <input required type="text" placeholder="e.g. $150" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm" value={newDoctor.fee} onChange={e => setNewDoctor({ ...newDoctor, fee: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Professional Bio</label>
                <textarea required rows="3" placeholder="Brief professional background..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none text-sm" value={newDoctor.bio} onChange={e => setNewDoctor({ ...newDoctor, bio: e.target.value })}></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowAddDoctorModal(false)} className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition text-sm">Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// --- HELPER COMPONENTS (Responsive) ---

const SidebarButton = ({ icon, label, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl font-bold transition-all duration-200 text-sm md:text-base ${isActive ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-100 hover:bg-blue-700/50'
      }`}
  >
    <div className="flex items-center gap-3">
      <i className={`bi ${icon} text-base md:text-lg ${isActive ? 'text-blue-600' : 'text-blue-300'}`}></i>
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label}</span>
    </div>
    {badge > 0 && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);

const MetricCard = ({ title, value, icon, color, subtext }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6 flex flex-col relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 ${color} opacity-10 rounded-bl-[100px] rounded-tr-2xl`}></div>
    <div className="flex justify-between items-start mb-2">
      <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{title}</p>
      <div className={`w-8 h-8 md:w-10 md:h-10 ${color} text-white rounded-xl flex items-center justify-center text-sm md:text-lg shadow-sm`}>
        <i className={`bi ${icon}`}></i>
      </div>
    </div>
    <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1">{value}</h3>
    <p className="text-[8px] md:text-[10px] text-slate-400 font-semibold">{subtext}</p>
  </div>
);

// --- StatusBadge (Responsive) ---
const StatusBadge = ({ status }) => {
  const colors = {
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Accepted: 'bg-blue-50 text-blue-600 border-blue-100',
    Completed: 'bg-green-50 text-green-600 border-green-100',
    Cancelled: 'bg-rose-50 text-rose-600 border-rose-100'
  };

  const displayText = status === 'Completed' ? 'Visited' : status;

  return (
    <span className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-md text-[8px] md:text-[10px] font-black uppercase tracking-wider border ${colors[status] || 'bg-slate-50 text-slate-500'}`}>
      {displayText}
    </span>
  );
};

export default AdminDashboard;