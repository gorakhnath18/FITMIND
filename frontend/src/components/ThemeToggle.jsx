 import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-accent-cyan hover:bg-dark-card"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default ThemeToggle;