import React, { useContext } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';

const DailyTasks = () => {
    const { theme } = useContext(ThemeContext);
    const { dailyTasks, completeTask } = useGamification();

    const cardClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-lg border-gray-200';
    const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';

    return (
        <div className={`lg:col-span-3 p-4 lg:p-6 rounded-xl ${cardClasses}`}>
            <h2 className={`text-xl font-bold mb-4 ${headingClasses}`}>Daily Quests</h2>
            <ul className="space-y-3">
                {dailyTasks.map(task => (
                    <li key={task.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'}`}>
                        <span className={task.completed ? 'text-gray-500 line-through' : (theme === 'dark' ? 'text-white' : 'text-gray-800')}>{task.text}</span>
                        <button
                            onClick={() => completeTask(task.id)}
                            disabled={task.completed}
            
                            className={`flex items-center px-4 py-2 text-sm font-bold rounded-md transition-all disabled:cursor-not-allowed ${
                                task.completed 
                                ? 'bg-green-600 text-white' 
                                : `bg-accent-cyan hover:shadow-glow-cyan ${theme === 'dark' ? 'text-white' : 'text-black'}`
                            }`}
                        >
                            {task.completed ? <FaCheck className="mr-2" /> : <FaPlus className="mr-2" />}
                            {task.completed ? 'Done' : `${task.xp} XP`}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyTasks;