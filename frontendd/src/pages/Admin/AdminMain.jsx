import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminDonations from './pages/donation/AdminDonations';
import AdminEvents from './pages/events/AdminEvents';
import AdminReports from './pages/reports/AdminReports';
import AdminProjects from './pages/projects/AdminProjects';
import AdminVolunteers from './pages/volunteers/AdminVolunteers';
const AdminMain = () => {
  return (
    <>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="events" element={<AdminEvents />} />
            <Route path="/" element={<AdminDashboard />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default AdminMain;
