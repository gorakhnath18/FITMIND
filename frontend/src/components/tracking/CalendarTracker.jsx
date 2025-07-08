import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../Calendar.css';
import { FaCheckCircle } from 'react-icons/fa';
import api from '../../services/api';

const CalendarTracker = ({ initialCompletedDays = [], onDayMarked }) => {
    const [completedDays, setCompletedDays] = useState(new Set(initialCompletedDays.map(d => new Date(d).toDateString())));

    const handleMarkDayComplete = async () => {
        try {
            const { data } = await api.post('/api/users/progress/mark-day-complete');
             const updatedDays = new Set(data.completedDays.map(d => new Date(d).toDateString()));
            setCompletedDays(updatedDays);
             if(onDayMarked) onDayMarked();
        } catch (error) {
            console.error("Could not mark day as complete", error);
            alert("Failed to mark day as complete. Please try again.");
        }
    };

    const tileClassName = ({ date, view }) => {
         if (view === 'month' && completedDays.has(date.toDateString())) {
            return 'completed-day';
        }
        return null;
    };

    return (
        <div className="lg:col-span-3 p-4 lg:p-6 rounded-xl bg-dark-card/60 backdrop-blur-md border-gray-700/60">
            <h2 className="text-xl font-bold mb-4 text-white">Consistency Tracker</h2>
            <Calendar
                tileClassName={tileClassName}
                className="react-calendar"
            />
            <button 
                onClick={handleMarkDayComplete}
                className="w-full mt-6 py-3 px-6 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-all flex items-center justify-center gap-2"
            >
                <FaCheckCircle /> Mark Today as Complete
            </button>
        </div>
    );
};

export default CalendarTracker;