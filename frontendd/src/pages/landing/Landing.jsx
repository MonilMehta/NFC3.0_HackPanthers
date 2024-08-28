import React from 'react';
import { useState } from 'react';
import { Book, Users, Globe, Menu, X, ChevronRight } from 'lucide-react';
import Navbar from './Navbr';
import Footer from './footer';
import HeroSection from './HeroSection';
import MissionSection from './MissionAction';
import ResourcesSection from './ResourcesSection';
import CallToAction from './CalltoAction';


const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col w-full" style={{width:'100vw'}}>
    <Navbar />
    <main className="flex-grow">
      <HeroSection />
      <MissionSection />
      <ResourcesSection />
      <CallToAction />
    </main>
    <Footer />
    </div>
  )
}

export default Landing;
