import React from 'react';
import { motion } from 'framer-motion'; // For transitions
import { Link as Lk } from 'react-router-dom';
import DonationText from './DonationText';
import DonationForm from './DonationForm';

const Donation = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#e9ecef', // Light gray background
        flexDirection: 'row',
        padding: '2rem',
        gap: '2rem', // Space between the text and form
        boxSizing: 'border-box', // Ensure padding does not affect width
        fontFamily: 'Arial, sans-serif', // Clean font
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          flex: 1, // Allow it to grow and take available space
          maxWidth: '600px', // Limit the maximum width
          padding: '1rem',
          boxSizing: 'border-box',
          backgroundColor: '#e9ecef', // White background for content
        }}
      >
        <DonationText />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          flex: 1, // Allow it to grow and take available space
          maxWidth: '600px', // Limit the maximum width
          padding: '1rem',
          backgroundColor: '#e9ecef', // White background for content
        }}
      >
        <DonationForm />
      </motion.div>
    </div>
  );
};

export default Donation;
