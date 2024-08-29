import React from 'react';
import { Book, Users, Globe, Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white-600 shadow-md" style={{ position: 'sticky', top: 0, zIndex: 2000 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-green-600" style={{fontSize:'30px',marginLeft:'-5vw'}}>NGO Name</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-green-400 hover:text-green-400 px-3 py-2 rounded-md text-sm" style={{fontSize:'25px',marginTop:'10px'}}>Home</Link>
              <Link to="/about" className="text-green-400 hover:text-green-400 px-3 py-2 rounded-md text-sm" style={{fontSize:'25px',marginTop:'10px'}}>About</Link>
              <Link to="/projects" className="text-green-400 hover:text-green-400 px-3 py-2 rounded-md text-sm" style={{fontSize:'25px',marginTop:'10px'}}>Projects</Link>
              <Link to="/contact" className="text-green-400 hover:text-green-400 px-3 py-2 rounded-md text-sm" style={{fontSize:'25px',marginTop:'10px'}}>Contact</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-200 hover:text-yellow-400 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:text-yellow-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-yellow-200 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="text-yellow-200 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/projects" className="text-yellow-200 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Projects</Link>
            <Link to="/contact" className="text-yellow-200 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;