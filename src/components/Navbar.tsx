import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaUser, 
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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to={'/'} className="text-xl font-bold text-blue-600">Learning Dashboard</Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActivePath(item.path)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-blue-50'
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 
                hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )} */}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${
                isActivePath(item.path)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-50'
              } block px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* <item.icon className="h-5 w-5 mr-3" /> */}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;