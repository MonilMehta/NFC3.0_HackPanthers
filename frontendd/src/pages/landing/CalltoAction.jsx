import React from 'react';
import { ChevronRight } from 'lucide-react';

const CallToAction = () => (
  <div className="bg-white-700" style={{ position: 'relative' }}>
    <div className="text-[#003E1F] max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-[#003E1F] text-4xl font-extrabold sm:text-5xl">
        <span className="block" style={{ fontSize: '60px', fontStyle: 'italic' }}>Join Us</span>
        <span className="block">Take Action Now</span>
      </h2>
      <p className="mt-6 text-lg leading-7 text-[#003E1F]">
        Make a difference in the lives of children and communities around the world. Volunteer with us today and help create a brighter future for all.
      </p>
      <div className="mt-8">
        <a
          href="/events"
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#003E1F] hover:bg-green-400 sm:w-auto"
        >
          Volunteer Now <ChevronRight className="ml-3 h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
);

export default CallToAction;
