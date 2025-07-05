import React from 'react';
import { motion } from 'framer-motion';
import { Link as Lk } from 'react-router-dom';
import DonationText from './DonationText';
import DonationForm from './DonationForm';
import Navbar from '../../components/Navbar';

const Donationuser = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full"
          >
            <DonationText />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full"
          >
            <DonationForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donationuser;