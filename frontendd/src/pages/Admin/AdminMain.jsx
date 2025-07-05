import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminDonations from './pages/donation/AdminDonations';
import AdminEvents from './pages/events/AdminEvents';
import AdminReports from './pages/reports/AdminReports';
import AdminProjects from './pages/projects/AdminProjects';
import Staff from './pages/staff/Staff';
import AdminNotification from './pages/noti/AdminNotification';
import AccountAdmin from '../Account/AccountAdmin';
const AdminMain = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; role=`);
    if(parts.pop().split(';').shift() != 'admin'){
      navigate("/main");
    }
  })
  return (
    <>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="events" element={<AdminEvents />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="adminAccount" element={<AccountAdmin />} />
            <Route path="notifications" element={<AdminNotification />} />
            <Route path="staff" element={<Staff />} />

          </Routes>
        </main>
      </div>
    </>
  );
}

export default AdminMain;
