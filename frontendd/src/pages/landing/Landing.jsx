import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './Navbr';
import HeroSection from './HeroSection';
import MissionSection from './MissionAction';
import ProjectsSection from './ProjectSection';
import Footer from './footer';
import CallToAction from './CalltoAction';
import Flow from '../main/Flow';
const LandingPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <MissionSection />
      <ProjectsSection />
       <Flow />
      <CallToAction />
      <Footer />
      
      <div
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </div>
    </div>
  );
};

export default LandingPage;