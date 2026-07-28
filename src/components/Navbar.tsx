import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocationContext, branchData } from '../context/LocationContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { activeBranchId, setActiveBranchId } = useLocationContext();
  
  const activeBranch = activeBranchId ? branchData[activeBranchId] : null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Locations', path: '/locations' },
    { name: 'Book a Visit', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-violet-900">RADHE SHYAM <span className="text-fuchsia-500">PG</span></span>
            </Link>
            {activeBranch && (
              <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm font-medium text-gray-500 mr-2">{activeBranch.subtitle}</span>
                <button 
                  onClick={() => {
                    window.localStorage.removeItem('selectedBranch');
                    window.location.reload();
                  }}
                  className="text-xs bg-violet-100 text-violet-700 hover:bg-violet-200 px-2 py-1 rounded transition-colors flex items-center"
                >
                  <MapPin className="w-3 h-3 mr-1" /> Change
                </button>
              </div>
            )}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-fuchsia-500 ${
                  location.pathname === link.path ? 'text-fuchsia-500' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-fuchsia-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
              {activeBranch && (
                <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100 mb-2">
                  <span className="text-sm font-medium text-gray-500">{activeBranch.subtitle}</span>
                  <button 
                    onClick={() => {
                      window.localStorage.removeItem('selectedBranch');
                      window.location.reload();
                    }}
                    className="text-xs bg-violet-100 text-violet-700 hover:bg-violet-200 px-2 py-1 rounded transition-colors flex items-center"
                  >
                    <MapPin className="w-3 h-3 mr-1" /> Change Location
                  </button>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-fuchsia-500 bg-fuchsia-50'
                      : 'text-gray-700 hover:text-fuchsia-500 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
