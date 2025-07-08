 import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const iconColor = theme === 'dark' ? 'text-accent-cyan' : 'text-gray-600';
  const hoverBg = theme === 'dark' ? 'hover:bg-dark-card' : 'hover:bg-gray-200';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${iconColor} ${hoverBg}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default ThemeToggle;