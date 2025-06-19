 import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaFire, FaRunning, FaTint, FaDumbbell, FaChartBar, FaChartPie } from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Gamification Imports
import ProfileWidget from '../components/gamification/ProfileWidget';
import DailyTasks from '../components/gamification/DailyTasks';

Chart.register(...registerables);

const StatCard = ({ icon, label, value, unit, color }) => {
    const { theme } = useContext(ThemeContext);
    const cardClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-lg border-gray-200';
    return (<div className={`p-4 rounded-xl flex items-center space-x-4 ${cardClasses}`}><div className={`p-3 rounded-full ${color}`}>{icon}</div><div><p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p><p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value} <span className="text-sm font-normal">{unit}</span></p></div></div>);
};

const DashboardPage = () => {
    const { theme } = useContext(ThemeContext);
    // This is mock data. In a real app, this would come from user input or a backend.
    const [dailyData, setDailyData] = useState({ calories: 1850, protein: 120, carbs: 180, fat: 60, steps: 8250, water: 6, workout: 45 });
    const [weeklyData, setWeeklyData] = useState([ { day: 'Mon', calories: 2100 }, { day: 'Tue', calories: 1950 }, { day: 'Wed', calories: 2200 }, { day: 'Thu', calories: 1800 }, { day: 'Fri', calories: 2300 }, { day: 'Sat', calories: 2400 }, { day: 'Sun', calories: 1850 }, ]);

    const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
    const chartLabelColor = theme === 'dark' ? '#c9d1d9' : '#4b5563';
    const chartContainerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border border-gray-700/60' : 'bg-white shadow-lg border border-gray-200';
    const chartTitleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const weeklyChartData = { labels: weeklyData.map(d => d.day), datasets: [{ label: 'Calories', data: weeklyData.map(d => d.calories), backgroundColor: 'rgba(168, 85, 247, 0.6)', borderColor: 'rgba(168, 85, 247, 1)', borderWidth: 1, borderRadius: 5, }] };
    const macrosChartData = { labels: ['Protein (g)', 'Carbs (g)', 'Fat (g)'], datasets: [{ label: 'Macronutrients', data: [dailyData.protein, dailyData.carbs, dailyData.fat], backgroundColor: ['#22d3ee', '#a855f7', '#34d399'], borderColor: theme === 'dark' ? '#161B22' : '#ffffff', borderWidth: 5, }] };
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: chartLabelColor } } }, scales: {  x: { ticks: { color: chartLabelColor }, grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } },  y: { ticks: { color: chartLabelColor }, grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }  } };
    const doughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: chartLabelColor, boxWidth: 12, padding: 20 } } } };

    return (
        <div className="container mx-auto p-4 lg:p-8">
            <h1 className={`text-3xl lg:text-4xl font-extrabold mb-8 ${headingClasses}`}>My Dashboard</h1>
            
            {/* --- NEW GAMIFICATION SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              <ProfileWidget />
              <DailyTasks />
            </div>

            {/* --- Existing Daily Stats --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <StatCard icon={<FaFire size={20} className="text-white"/>} label="Calories" value={dailyData.calories} unit="kcal" color="bg-red-500" />
                <StatCard icon={<FaRunning size={20} className="text-white"/>} label="Steps" value={dailyData.steps} unit="" color="bg-blue-500" />
                <StatCard icon={<FaTint size={20} className="text-white"/>} label="Water" value={dailyData.water} unit="glasses" color="bg-cyan-500" />
                <StatCard icon={<FaDumbbell size={20} className="text-white"/>} label="Workout" value={dailyData.workout} unit="mins" color="bg-purple-500" />
            </div>

            {/* --- Existing Charts --- */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className={`lg:col-span-3 p-4 lg:p-6 rounded-xl ${chartContainerClasses}`}><h2 className={`flex items-center text-xl font-bold mb-4 ${chartTitleColor}`}><FaChartBar className="mr-2 text-purple-500"/> Weekly Calorie Intake</h2><div className="relative h-80"><Bar data={weeklyChartData} options={chartOptions}/></div></div>
                <div className={`lg:col-span-2 p-4 lg:p-6 rounded-xl flex flex-col justify-between ${chartContainerClasses}`}><h2 className={`flex items-center text-xl font-bold mb-4 ${chartTitleColor}`}><FaChartPie className="mr-2 text-cyan-500"/> Today's Macros</h2><div className="relative h-64 mx-auto w-full max-w-xs"><Doughnut data={macrosChartData} options={doughnutOptions} /></div></div>
            </div>
        </div>
    );
};
export default DashboardPage;