import React from 'react';
import { FanIcon, Facebook, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#003E1F] text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <span className="text-white font-bold text-6xl hover-float inline-block">
            <i>ChildCare NGO</i>
          </span>
          <p className="text-gray-300 text-base hover:text-white transition-colors duration-300">
            Making a difference in communities worldwide through sustainable development and education.
          </p>
          <div className="flex space-x-6">
            {[Facebook, Twitter, Instagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-300 hover:text-white transform transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
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
        <div className="mt-12 xl:mt-0">
          <h3 className="text-xl font-semibold text-white tracking-wider uppercase">
            Subscribe to our newsletter
          </h3>
          <p className="mt-4 text-base text-gray-300">
            Stay updated with our latest projects and initiatives.
          </p>
          <form className="mt-4 sm:flex sm:max-w-md">
            <input
              type="email"
              className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="mt-3 w-full px-6 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto hover-float"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-8">
        <p className="text-base text-gray-300 xl:text-center flex items-center justify-center">
          &copy; 2024 ChildCare NGO. Made with <Heart className="mx-2 text-red-500" /> All rights reserved.
        </p>
      </div>
    </div>
    <div 
      className="absolute inset-0 opacity-5 pointer-events-none" 
      style={{
        backgroundImage: 'url(/pattern.png)',
        backgroundSize: '200px',
        mixBlendMode: 'overlay'
      }}
    />
  </footer>
);

export default Footer;
