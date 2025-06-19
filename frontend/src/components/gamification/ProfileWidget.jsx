import React, { useContext } from 'react';
import { useGamification, LEVEL_THRESHOLDS } from '../../context/GamificationContext';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const XPBar = ({ currentXp, startXp, endXp, theme }) => {
  const range = endXp - startXp;
  const progress = currentXp - startXp;
  const percentage = range > 0 ? Math.min((progress / range) * 100, 100) : 0;
  
  const barColor = theme === 'dark' ? 'bg-green-500' : 'bg-blue-600';
  
   const shadowClass = theme === 'dark' ? 'shadow-lg shadow-green-500/50' : '';

  return (
    <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-200'}`}>
      <div className={`${barColor} ${shadowClass} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const ProfileWidget = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { level, xp, xpForNextLevel } = useGamification();
  const xpForCurrentLevel = LEVEL_THRESHOLDS[level] || 0;
  
  const cardClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-lg border-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  const levelHeadingClasses = theme === 'dark' ? 'text-green-400' : 'bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent';

  if (!user) return null;

  return (
    <div className={`lg:col-span-2 p-4 lg:p-6 rounded-xl flex flex-col justify-between ${cardClasses}`}>
         <div className="flex items-center space-x-4 mb-4">
            <img src={user.pfpUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-black" />
            <div>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
                <p className={`text-sm font-bold ${levelHeadingClasses}`}>Level {level}</p>
            </div>
        </div>

        {/* XP Progress Section */}
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className={textColor}>Progress</span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>{xp} / {xpForNextLevel} XP</span>
            </div>
            <XPBar currentXp={xp} startXp={xpForCurrentLevel} endXp={xpForNextLevel} theme={theme} />
        </div>
    </div>
  );
};

export default ProfileWidget;