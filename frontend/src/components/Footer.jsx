 import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={`p-6 mt-auto border-t ${
      theme === 'dark' ? 'bg-transparent border-gray-700/50' : 'bg-white border-gray-200'
    }`}>
      <div className={`container mx-auto text-center ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <p>© {new Date().getFullYear()} (FitMind) @Gorakhnath Jaiswal</p>
        <p className="text-sm mt-1">Nourish your body, empower your mind.</p>
      </div>
    </footer>
  );
};
export default Footer;