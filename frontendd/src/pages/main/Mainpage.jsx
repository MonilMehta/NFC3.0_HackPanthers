import React from 'react';
import Navbar from '../../components/Navbar';
import Rotationlogo from './Rotationlogo';

const Mainpage = () => {
  return (
    <>
      <Navbar />
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        padding: '20px'
      }}>
      <Rotationlogo />
      <h1>hello</h1>
      </div>
      
    </>
  );
}

export default Mainpage;