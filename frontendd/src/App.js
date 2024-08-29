import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupSignin from './pages/Auth/SigninSignup';
import Landing from './pages/landing/Landing';
import Mainpage from './pages/main/Mainpage';
import AdminMain from './pages/Admin/AdminMain';
import Account from './pages/Account/Account';
import Donation from './pages/donation/Donation';
import EventUser from './pages/EventManagement/EventUser';
// import RazorpayForm from './pages/donation/RazorpayForm';
import EventInfoDetailsPage from './pages/EventManagement/EventInfoDetailPage';
import Forum from './pages/Forum/Forum';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignupSignin />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/account" element={<Account />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/events" element={<EventUser />} />
        {/* <Route path="/razorpay" element={<RazorpayForm />} /> */}
        <Route path="/event-details/:eventId" element={<EventInfoDetailsPage />} />
        <Route path="/forum" element={<Forum />} />

      </Routes>
    </Router>
  );
}

export default App;
