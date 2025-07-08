 import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiBrain } from "react-icons/gi";
import { FaBars, FaTimes, FaStar } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkStyle = { color: '#22d3ee', textShadow: theme === 'dark' ? '0 0 5px #22d3ee' : 'none' };
  const navLinkClasses = `${theme === 'dark' ? 'text-white' : 'text-gray-600'} hover:text-accent-cyan transition-colors font-medium`;
  
  const closeMenu = () => setIsOpen(false);

  const signUpButtonClasses = `px-5 py-2 rounded-md transition-all duration-300 text-sm font-bold ${
    theme === 'dark'
      ? 'bg-accent-purple text-white hover:shadow-glow-purple'  
      : 'text-purple-600 border-2 border-purple-600 hover:bg-purple-600 hover:text-white'  
  }`;

  return (
    <>
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b ${
        theme === 'dark' ? 'bg-transparent border-gray-700/50' : 'bg-white/80 border-gray-200'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {}
          <Link to="/" onClick={closeMenu} className="text-3xl font-bold flex items-center">
            <GiBrain className={`mr-2 ${theme === 'dark' ? 'text-white' : 'text-purple-700'}`} />
            <span className={`${theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent'}`}>FitMind</span>
          </Link>
          
          {}
          <ul className="hidden md:flex items-center space-x-8">
            <li><NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className={navLinkClasses}>Home</NavLink></li>
            {user && (
              <li>
                <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className={`${navLinkClasses} flex items-center`}>
                  Dashboard
                  {}
                  {}
                  <span className="ml-2 flex items-center bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"><FaStar className="mr-1 text-yellow-300" />{user?.level || 1}</span>
                </NavLink>
              </li>
            )}
            <li><NavLink to="/plans" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className={navLinkClasses}>Plans</NavLink></li>
            {}
            <li><NavLink to="/bmi" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className={navLinkClasses}>BMI</NavLink></li>
          </ul>

          {}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
                <ProfileDropdown />
            ) : (
              <>
                <Link to="/login" className={`px-5 py-2 rounded-md transition-all text-sm font-bold ${theme === 'dark' ? 'text-white border border-gray-500 hover:border-accent-cyan hover:text-accent-cyan' : 'text-purple-700 border border-purple-700 hover:bg-purple-700 hover:text-white'}`}>Login</Link>
                <Link to="/register" className={signUpButtonClasses}>Sign Up</Link>
              </>
            )}
          </div>

          {}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="ml-4 text-2xl" aria-label="Open menu">{isOpen ? <FaTimes /> : <FaBars />}</button>
          </div>
        </nav>
      </header>

      {}
      <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${
        theme === 'dark' ? 'bg-dark-bg' : 'bg-white'
      }`}>
        <ul className="flex flex-col items-center justify-center h-full space-y-8">
          <li><NavLink to="/" onClick={closeMenu} className="text-2xl font-semibold">Home</NavLink></li>
          {user && <li><NavLink to="/dashboard" onClick={closeMenu} className="text-2xl font-semibold">Dashboard</NavLink></li>}
          <li><NavLink to="/plans" onClick={closeMenu} className="text-2xl font-semibold">Plans</NavLink></li>
          {}
          <li><NavLink to="/bmi" onClick={closeMenu} className="text-2xl font-semibold">BMI</NavLink></li>
          <li className="pt-8 w-full px-8">
            {user ? (
                <button onClick={() => { logout(); closeMenu(); }} className="w-full text-xl px-10 py-3 rounded-md bg-red-500 text-white font-bold">Logout</button>
            ) : (
              <div className='w-full space-y-4'>
                <Link to="/login" onClick={closeMenu} className="block text-center text-xl px-10 py-3 rounded-md border border-purple-500 text-purple-600">Login</Link>
                 <Link to="/register" onClick={closeMenu} className={`block text-center text-xl px-10 py-3 rounded-md ${signUpButtonClasses}`}>Sign Up</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;