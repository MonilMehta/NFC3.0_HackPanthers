import React, { useState, useEffect, useRef } from 'react';
import Proj1 from '../../assets/Proj1.png';
import Proj3 from '../../assets/Proj3.jpg';
import CustomCard from './CustomCard';
import Rotationlogo from './rotation/Rotationlogo';
import Navbar from '../../components/Navbar';
import Flow from './Flow';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Define the animations with slower, smoother transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth easing
      staggerChildren: 0.3
    }
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const Mainpage = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  const upcomingEvents = [
    { image: 'https://www.economist.com/content-assets/images/20240224_ASP002.jpg', title: "Charity Run", date: "2023-09-15", description: "Annual 5K run to raise funds for children's education" },
    { image: 'https://media.istockphoto.com/id/1170754176/photo/indian-school-children-in-classroom.jpg?s=612x612&w=0&k=20&c=A8O3FTFVWOxmwZrpz_R9GUBjAHWqDEsl68x_aNYPuRU=', title: "Art Workshop", date: "2023-09-22", description: "Creative workshop for underprivileged children" },
  ];

  const completedEvents = [
    { image: 'https://www.smilefoundationindia.org/wp-content/uploads/2023/03/Layer-109-1-1024x757.png', title: "School Supply Drive", date: "2023-08-10", description: "Distributed school supplies to 500 children" },
    { image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', title: "Summer Camp", date: "2023-07-15", description: "Two-week summer camp for 100 children" },
  ];

  const donationCases = [
    { image: 'https://media.istockphoto.com/id/870402320/photo/a-social-worker-meeting-with-a-group-of-villagers.jpg?s=612x612&w=0&k=20&c=2JlS1vqg4pU5lCp8oiFXjVgMPlHbhrmH4wmtRJdq384=', title: "Education Fund", isDonation: true, goal: 10000, current: 7500, description: "Help us provide education to underprivileged children" },
    { image: 'https://give.do/blog/wp-content/uploads/2021/12/Main-Banner-3.jpg', title: "Healthcare Initiative", isDonation: true, goal: 5000, current: 3200, description: "Support our healthcare programs for children in need" },
  ];

  // Combine all cards for unified animation system
  const allCards = [
    ...upcomingEvents.map(event => ({ ...event, section: 'upcoming' })),
    ...completedEvents.map(event => ({ ...event, section: 'completed' })),
    ...donationCases.map(donation => ({ ...donation, section: 'donation' })),
  ];

  useEffect(() => {
    // Fetch project data
    axios.get('https://nurturenest-backend.onrender.com/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  useEffect(() => {
    const observers = [];
    
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Add card to visible set when it enters viewport
                setVisibleCards(prev => new Set([...prev, index]));
              } else {
                // Remove card from visible set when it leaves viewport
                setVisibleCards(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(index);
                  return newSet;
                });
              }
            });
          },
          {
            threshold: 0.15, // Trigger when 15% of the card is visible
            rootMargin: '80px 0px' // Start animation 80px before card enters viewport
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    // Cleanup observers on component unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [allCards.length]); // Re-run when cards change

  const renderAnimatedCard = (item, index, sectionIndex = 0) => {
    const globalIndex = index + sectionIndex;
    return (
      <div
        key={`${item.section}-${index}`}
        ref={(el) => (cardRefs.current[globalIndex] = el)}
        className={`transform transition-all duration-1000 ease-out ${
          visibleCards.has(globalIndex)
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-12 scale-95'
        }`}
        style={{
          transitionDelay: visibleCards.has(globalIndex) ? `${(index % 2) * 200}ms` : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
        }}
      >
        <CustomCard {...item} />
      </div>
    );
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="bg-white text-gray-900 py-20 h-[100vh]"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center mt-24">
          {/* Logo on the Left - Hidden on mobile */}
          <motion.div 
            className="hidden md:flex md:w-1/2 justify-center md:justify-start mb-8 md:mb-0"
            variants={itemVariants}
          >
            <Rotationlogo />
          </motion.div>

          {/* Text on the Right - Full width on mobile */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left space-y-8"
            variants={containerVariants}
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-gray-900"
                variants={itemVariants}
              >
                Empowering
                <br />
                <span className="block">Children,</span>
                <span className="block text-[#003E1F]">Transforming</span>
                <span className="block">Lives</span>
              </motion.h1>
              
              <motion.p 
                className="text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed mx-auto md:mx-0"
                variants={itemVariants}
              >
                Join our mission to provide education, healthcare, and support to children in need. Together, we can create a brighter future for all.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-[#003E1F] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-md hover:bg-green-700 transition-all duration-500 ease-out text-xs sm:text-sm uppercase tracking-wide transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                GET INVOLVED
              </motion.button>
              
              <motion.div 
                className="flex space-x-3 sm:space-x-4 justify-center"
                variants={containerVariants}
              >
                {[
                  "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                  "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.707-1.378l-.742 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z",
                  "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
                  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                ].map((path, index) => (
                  <motion.a 
                    key={index}
                    href="#" 
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path}/>
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center text-[#003E1F]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          Upcoming Events
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => 
            renderAnimatedCard(event, index, 0)
          )}
        </div>
      </div>

      {/* Completed Events */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-[#003E1F]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Successful Events
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {completedEvents.map((event, index) => 
              renderAnimatedCard(event, index, upcomingEvents.length)
            )}
          </div>
        </div>
      </div>

      {/* Help Someone Out */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center text-[#003E1F]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          Help Someone Out
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {donationCases.map((donation, index) => 
            renderAnimatedCard(donation, index, upcomingEvents.length + completedEvents.length)
          )}
        </div>
      </div>

      {/* Flow Component */}
      <motion.div
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container mx-auto px-4">
          <Flow />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-[#003E1F] text-[#FFFFFF] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About NurtureNest</h3>
              <p>We are dedicated to improving the lives of children through education, healthcare, and community support.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>123 NGO Street, Charity City</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@nurturenest.org</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="/" className="text-[#FFFFFF] hover:text-[#6BCB80] transition-colors duration-300">Facebook</a>
                <a href="/" className="text-[#FFFFFF] hover:text-[#6BCB80] transition-colors duration-300">Twitter</a>
                <a href="/" className="text-[#FFFFFF] hover:text-[#6BCB80] transition-colors duration-300">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 NurtureNest NGO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Mainpage;