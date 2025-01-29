import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, HeartHandshake } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const projectName = "SafeHaven Guardians"; // Suggested project name

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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#297045] backdrop-blur-md border-b border-emerald-800' : 'bg-emerald-900'
    }`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <HeartHandshake className="h-8 w-8 text-amber-400" />
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-amber-300 transition-colors"
            >
              {projectName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" text="Home" />
            <NavLink to="/donation" text="Donate" />
            <NavLink to="/auth" text="Join Us" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-amber-300 hover:bg-emerald-800 transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <X className="h-7 w-7" strokeWidth={2} />
            ) : (
              <Menu className="h-7 w-7" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="pt-4 pb-8 space-y-4">
          <MobileNavLink to="/" text="Home" setIsOpen={setIsOpen} />
          <MobileNavLink to="/donation" text="Donate" setIsOpen={setIsOpen} />
          <MobileNavLink to="/auth" text="Join Us" setIsOpen={setIsOpen} />
          
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, text  }) => (
  <Link
    to={to}
    className="text-lg font-medium text-white px-4 py-2 rounded-xl hover:bg-emerald-800 hover:text-amber-300 transition-all duration-200 flex items-center group"
  >
    {text}
    <span className="block h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, text,setIsOpen  }) => (
  <Link
    to={to}
    className="block px-4 py-3 text-lg text-white hover:bg-emerald-800 rounded-lg transition-colors"
    onClick={() => setIsOpen(false)}
  >
    {text}
  </Link>
);

export default Navbar;