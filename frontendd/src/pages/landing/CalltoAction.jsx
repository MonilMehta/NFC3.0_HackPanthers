import React from 'react';
import { ChevronRight } from 'lucide-react';

const CallToAction = () => (
  <div className="relative py-20 px-4 sm:py-24 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#f0f4f8] to-[#e1eaf1]">
    {/* Decorative background elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -left-4 -top-4 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
      <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-green-300 rounded-full blur-3xl"></div>
    </div>
    
    <div className="relative text-[#003E1F] max-w-3xl mx-auto text-center">
      <h2 className="text-[#003E1F] text-4xl font-extrabold sm:text-5xl">
        <span className="block text-7xl italic mb-4 bg-gradient-to-r from-[#003E1F] to-green-600 bg-clip-text text-transparent">Join Us</span>
        <span className="block font-bold tracking-tight">Take Action Now</span>
      </h2>
      <p className="mt-8 text-xl leading-8 text-[#003E1F]/80">
        Make a difference in the lives of children and communities around the world. Volunteer with us today and help create a brighter future for all.
      </p>
      <div className="mt-12">
        <a
          href="/events"
          className="group hover-float w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-[#003E1F] to-green-700 hover:from-green-600 hover:to-green-500 transition-all duration-300 transform hover:-translate-y-1 sm:w-auto"
        >
          Volunteer Now 
          <ChevronRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </div>
);

export default CallToAction;