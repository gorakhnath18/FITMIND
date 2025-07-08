import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';  
import CalendarTracker from '../components/tracking/CalendarTracker';
import ProfileWidget from '../components/gamification/ProfileWidget';
import DailyTasks from '../components/gamification/DailyTasks';

 
const DashboardPage = () => {
    const { theme } = useContext(ThemeContext);
    const { user, updateUserState } = useAuth(); 
    if (!user) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold">Please log in to view your dashboard.</h1>
            </div>
        );
    }
    
     const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
    
     

    const handleDayMarked = (updatedUser) => {
         updateUserState(updatedUser);
    }

    return (
        <div className="container mx-auto p-4 lg:p-8">
            {}
            <h1 className={`text-3xl lg:text-4xl font-extrabold mb-8 ${headingClasses}`}>Welcome, {user.name}!</h1>
            
            {}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              <ProfileWidget />
              <DailyTasks />
            </div>

            {}
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <CalendarTracker 
                     initialCompletedDays={user.completedDays}
                     onDayMarked={handleDayMarked}
                />
                
                {}
                <div className="lg:col-span-2 p-4 lg:p-6 rounded-xl bg-dark-card/60 backdrop-blur-md border-gray-700/60">
                     <h2 className="text-xl font-bold mb-4 text-white">Future Features</h2>
                     <p className="text-gray-400">Workout history or nutrition summaries can be added here.</p>
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;