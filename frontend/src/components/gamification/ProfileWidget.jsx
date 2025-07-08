 import React, { useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

 const LEVEL_THRESHOLDS = { 1: 0, 2: 200, 3: 500, 4: 1000, 5: 1800, 6: 3000 };

 const XPBar = ({ currentXp, startXp, endXp, theme }) => {
  const range = endXp - startXp;
  const progress = currentXp - startXp;
  const percentage = range > 0 ? Math.min((progress / range) * 100, 100) : 0;
  const barColor = theme === 'dark' ? 'bg-green-500' : 'bg-blue-500';
  const shadowColor = theme === 'dark' ? 'shadow-green-500/50' : 'shadow-blue-500/50';

  return (
    <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-200'}`}>
      <div className={`${barColor} h-2.5 rounded-full shadow-lg ${shadowColor} transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};


const ProfileWidget = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();

  if (!user) {
    return null; 
  }

  const xpForCurrentLevel = LEVEL_THRESHOLDS[user.level] || 0;
  const xpForNextLevel = LEVEL_THRESHOLDS[user.level + 1] || user.xp;

  const cardClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-lg border-gray-200';
  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const valueColor = theme === 'dark' ? 'text-white' : 'text-gray-900';


  return (
    <div className={`lg:col-span-2 p-4 lg:p-6 rounded-xl flex flex-col justify-between ${cardClasses}`}>
        <div className="flex items-center space-x-4 mb-4">
            <img src={user.pfpUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-accent-purple" />
            <div>
                <h2 className={`text-xl font-bold ${valueColor}`}>{user.name}</h2>
                <p className={`text-sm font-bold ${headingClasses}`}>Level {user.level}</p>
            </div>
        </div>

        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className={textColor}>Progress</span>
                <span className={valueColor}>{user.xp} / {xpForNextLevel} XP</span>
            </div>
            <XPBar currentXp={user.xp} startXp={xpForCurrentLevel} endXp={xpForNextLevel} theme={theme} />
        </div>
    </div>
  );
};

export default ProfileWidget;