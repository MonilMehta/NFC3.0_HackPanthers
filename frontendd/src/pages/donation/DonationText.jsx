import React from 'react';
import { motion } from 'framer-motion'; // For transitions

const DonationText = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor: '#e9ecef',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        color: '#202124',
        flex: 1,
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>Make a Difference Today</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        Your donation is a powerful way to make a positive impact in the community. 
        Every contribution, regardless of its size, supports our mission to deliver vital 
        programs and services to those in need. With your help, we can tackle pressing 
        issues and drive meaningful change. Whether it’s providing education, healthcare, 
        or emergency assistance, your support makes a real difference in people's lives.
      </p>
      <p style={{ marginBottom: '1.5rem' }}>
        We believe in the power of collective effort and the strength of our community. 
        Each donation enables us to fund projects that address crucial needs and create 
        lasting impact. By contributing today, you are joining a movement of compassionate 
        individuals dedicated to fostering a better world. Your generosity fuels our work 
        and helps us to continue making strides toward a more equitable and just society.
      </p>
      <p style={{ marginBottom: '1.5rem' }}>
        Our organization is committed to transparency and accountability. We ensure that 
        every donation is utilized effectively to maximize its impact. You can be confident 
        that your support goes directly to initiatives that create positive outcomes. Together, 
        we can overcome challenges and build a brighter future for all. 
      </p>
      <p style={{ marginBottom: '1.5rem' }}>
        Thank you for your invaluable contribution and for standing with us in our mission. 
        Your support empowers us to keep pushing forward and brings hope to countless individuals. 
        We are deeply grateful for your commitment and generosity.
      </p>
      <p>
        If you have any questions or need further information about our projects or how 
        your donation is used, please feel free to reach out. We are here to provide any 
        additional details you might need and to ensure you have a fulfilling giving experience. 
        Together, let's continue making a difference and shaping a better tomorrow.
      </p>
    </motion.div>
  );
}

export default DonationText;
