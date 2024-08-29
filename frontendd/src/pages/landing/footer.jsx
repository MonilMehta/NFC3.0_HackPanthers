import React from 'react';
import { Book, Users, Globe, Menu, X, ChevronRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-green-500">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <span className="text-white font-bold text-3xl">NGO</span>
          <p className="text-green-200 text-base">
            NGO is a non-profit organization dedicated to making a positive impact in communities around the world.
          </p>
          <div className="flex space-x-6">
            {/* Add social media icons here */}
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-green-200 hover:text-black">Educational Materials</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Research</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Testimonies</a></li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-green-200 hover:text-black">Donate</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Volunteer</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Partner with Us</a></li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Organization</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-green-200 hover:text-black">About Us</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Our Team</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Contact</a></li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-green-200 hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-green-200 hover:text-black">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-green-700 pt-8">
        <p className="text-base text-green-300 xl:text-center">
          &copy; 2024 GenocideEdu. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
