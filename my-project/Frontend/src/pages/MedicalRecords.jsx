import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Adjust path if needed

const MedicalRecords = () => {
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRecords();
  }, []);

  const fetchMyRecords = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('clinic_token');
      
      const response = await axios.get('http://localhost:5000/api/appointments/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter for appointments that are completed AND have a prescription
      const completedRecords = response.data.filter(
        app => app.status === 'Completed' && app.prescription
      );
      
      // Sort by date (newest first)
      const sortedRecords = completedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setRecords(sortedRecords);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch medical records", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link to="/patient-dashboard" className="text-blue-600 font-bold mb-6 flex items-center gap-2 hover:underline w-fit">
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Medical Records</h1>
        
        {records.length === 0 ? (
          /* Your Custom Empty State */
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center py-16 text-gray-500">
              <i className="bi bi-file-earmark-medical text-6xl text-gray-300 mb-4 block"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Records Found</h3>
              <p>Your past medical history and test results will appear here.</p>
            </div>
          </div>
        ) : (
          /* Populated State: Map through records */
          <div className="grid gap-6">
            {records.map((record) => (
              <div key={record._id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 pb-6 border-b border-gray-50">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-xl text-gray-900">{record.service}</h3>
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Prescription Issued
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <i className="bi bi-person-badge text-blue-500"></i> Dr. {record.doctorName}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-xs font-medium text-gray-400 mt-1">{record.time}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="bi bi-file-medical-fill text-blue-600"></i>
                    <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Physician's Notes & Prescription</p>
                  </div>
                  
                  {/* whitespace-pre-wrap keeps the text formatting/line breaks intact */}
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {record.prescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MedicalRecords;