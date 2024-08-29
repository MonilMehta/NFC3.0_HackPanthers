import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Singin/Signin';
import Signup from './pages/Singup/Signup';
import Landing from './pages/landing/Landing';
import Mainpage from './pages/main/Mainpage';
import AdminMain from './pages/Admin/AdminMain';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/admin/*" element={<AdminMain />} />
      </Routes>
    </Router>
  );
}

export default App;
