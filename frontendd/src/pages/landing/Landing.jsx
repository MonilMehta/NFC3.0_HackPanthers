import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbr';
import HeroSection from './HeroSection';
import MissionSection from './MissionAction';
import ProjectsSection from './ProjectSection';
import Footer from './footer';
import CallToAction from './CalltoAction';



const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MissionSection />
      <ProjectsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;