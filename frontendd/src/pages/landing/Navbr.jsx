import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, HeartHandshake } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const projectName = "NurtureNest"; // Suggested project name

  // Scroll handler with smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-black ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 flex-1">
            <HeartHandshake className="h-8 w-8 text-green-600" />
            <Link 
              to="/" 
              className="text-3xl font-bold text-gray-900 hover:text-green-600 transition-colors"
            >
              {projectName}
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex space-x-10 flex-1 justify-center">
            <NavLink to="/" text="Home" />
            <NavLink to="/auth" text="Join Us" />
          </div>

          {/* Donate Button - Desktop */}
          <div className="hidden md:block flex-1 flex justify-end">
            <Link
              to="/donation"
              className="bg-gray-900 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Donate now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="pt-4 pb-6 space-y-2 border-t border-gray-100">
            <MobileNavLink to="/" text="Home" setIsOpen={setIsOpen} />
            <MobileNavLink to="/auth" text="Join Us" setIsOpen={setIsOpen} />
            <div className="pt-4 border-t border-gray-100">
              <Link
                to="/donation"
                className="block w-full bg-gray-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Donate now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-gray-900 px-4 py-3 text-base font-medium transition-colors relative group"
  >
    {text}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, text, setIsOpen }) => (
  <Link
    to={to}
    className="block px-4 py-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
    onClick={() => setIsOpen(false)}
  >
    {text}
  </Link>
);

export default Navbar;