import React from 'react';
import { FanIcon } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#003E1F] text-[#000000]">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <span className="text-white font-bold text-6xl"><italic>ChildCare NGO</italic></span>
          <p className="text-white hover:text-[#4CAF50] text-base">
            NGO is a non-profit organization dedicated to making a positive impact in communities around the world.
          </p>
          <div className="flex space-x-6">
            <FanIcon className="h-6 w-6 text-white hover:text-[#4CAF50]" />
            <FanIcon className="h-6 w-6 text-white hover:text-[#4CAF50]" />
            <FanIcon className="h-6 w-6 text-white hover:text-[#4CAF50]" />
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Educational Materials</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Research</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Testimonies</a></li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-xl font-semibold text-white tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Donate</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Volunteer</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Partner with Us</a></li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white tracking-wider uppercase">Organization</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">About Us</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Our Team</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Contact</a></li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-xl font-semibold text-white tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-white hover:text-[#4CAF50] hover:text-black">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-black-700 pt-8">
        <p className="text-base text-black-300 xl:text-center">
          &copy; 2024 ChildCare NGO. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
