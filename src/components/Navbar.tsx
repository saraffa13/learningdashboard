import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaUser,
  FaBars,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: 'Assessment',
      path: '/assessment',
      icon: FaGraduationCap,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: FaUser,
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-purple-700 shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to={'/'} className="text-xl font-bold text-white">Learning Dashboard</Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${isActivePath(item.path)
                      ? 'bg-purple-800 text-white'
                      : 'text-white hover:bg-purple-600'
                    } px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white 
                hover:text-gray-200 hover:bg-purple-600 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-white"
            >
              <FaBars className="w-6 h-6" />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          } sm:hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${isActivePath(item.path)
                  ? 'bg-purple-800 text-white'
                  : 'text-white hover:bg-purple-600'
                } block px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;