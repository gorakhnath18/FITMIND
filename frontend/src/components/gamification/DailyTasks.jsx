 import React, { useContext, useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { completeTaskAPI } from '../../services/user';
import { FaCheck, FaPlus } from 'react-icons/fa';

const DailyTasks = () => {
    const { theme } = useContext(ThemeContext);
    const { dailyTasks, triggerLevelUpModal } = useGamification();
    const { updateUserState, user, logout } = useAuth();

    const [loadingTaskId, setLoadingTaskId] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(new Set());

    const handleCompleteTask = async (taskId) => {
        if (loadingTaskId) return;
        const levelBeforeUpdate = user.level;
        setLoadingTaskId(taskId);
        try {
            const updatedUser = await completeTaskAPI(taskId);
            updateUserState(updatedUser);
            setCompletedTasks(prev => new Set(prev).add(taskId));
            if (updatedUser.level > levelBeforeUpdate) {
                triggerLevelUpModal(updatedUser.level);
            }
        } catch (error) {
            console.error("Failed to complete task:", error);
            if (error.response && error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                logout();
            } else {
                alert("Could not complete the task. Please try again later.");
            }
        } finally {
            setLoadingTaskId(null);
        }
    };

     const getButtonClasses = (isCompleted, isLoading) => {
        const baseClasses = 'flex items-center justify-center w-32 h-9 px-4 py-2 text-sm font-bold rounded-md transition-all disabled:opacity-80 disabled:cursor-not-allowed';

         if (isCompleted) {
             return `${baseClasses} bg-purple-500 text-white`;
        }
 
        if (isLoading) {
             return `${baseClasses} ${theme === 'dark' ? 'bg-green-500' : 'bg-blue-500'}`;
        }
        if (theme === 'dark') {
            return `${baseClasses} bg-green-500 text-white hover:bg-green-600`;
        }
         return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`;
    };

    if (!user) return null;

    const cardClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-lg border-gray-200';
    const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';

    return (
        <div className={`lg:col-span-3 p-4 lg:p-6 rounded-xl ${cardClasses}`}>
            <h2 className={`text-xl font-bold mb-4 ${headingClasses}`}>Daily Quests</h2>
            <ul className="space-y-3">
                {dailyTasks.map(task => {
                    const isCompleted = completedTasks.has(task.id);
                    const isLoading = loadingTaskId === task.id;

                    return (
                        <li key={task.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'}`}>
                            <span className={isCompleted ? 'text-gray-500 line-through' : (theme === 'dark' ? 'text-white' : 'text-gray-800')}>{task.text}</span>
                            
                            <button
                                onClick={() => handleCompleteTask(task.id)}
                                disabled={isCompleted || isLoading}
                                className={getButtonClasses(isCompleted, isLoading)}
                            >
                                {isLoading ? (
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                ) : isCompleted ? (
                                    <FaCheck className="mr-2" />
                                ) : (
                                    <FaPlus className="mr-2" />
                                )}
                                {isLoading ? '' : isCompleted ? 'Done' : `+ ${task.xp} XP`}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default DailyTasks;