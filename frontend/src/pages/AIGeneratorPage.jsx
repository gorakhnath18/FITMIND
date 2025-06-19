 import React, { useState, useContext } from 'react';
import { FaRobot, FaDumbbell, FaUtensils, FaExclamationTriangle } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const AIGeneratorPage = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ /* ... */ });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan({
        workoutPlan: "Your generated workout plan will appear here...",
        nutritionPlan: "Your personalized nutrition plan will appear here..."
      });
      setLoading(false);
    }, 2500);
  };

  const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const labelClasses = theme === 'dark' ? 'text-white' : 'text-gray-700 font-medium';
  
  const inputClasses = 'w-full rounded-md py-2.5 px-4 ' + (
    theme === 'dark'
      ? 'bg-dark-card border border-gray-500 text-white placeholder-gray-400 focus:ring-accent-cyan'
      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-500'
  );
  
  const textareaClasses = inputClasses + ' min-h-[80px]'; // Slightly shorter textarea
  const selectClasses = inputClasses + (theme === 'dark' ? ' dark-select' : '');
  const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const resultCardClasses = theme === 'dark' ? 'bg-dark-bg border-gray-700' : 'bg-gray-50 border-gray-200';
  const resultTextColor = theme === 'dark' ? 'text-white' : 'text-gray-700';

  return (
    <div className="container mx-auto mt-12 mb-20 px-4">
      <div className={`p-6 sm:p-8 max-w-4xl mx-auto rounded-xl transition-all duration-300 ${containerClasses}`}>
        <div className="text-center mb-8">
          <FaRobot className="mx-auto text-5xl text-accent-cyan mb-4" />
          <h1 className={`text-3xl font-bold ${headingClasses}`}>AI Plan Generator</h1>
          <p className={subtextColor}>Input your metrics to generate a hyper-personalized fitness plan.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Row: Basic Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Age</label><input type="number" required className={inputClasses} placeholder="e.g., 28" /></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Weight (kg)</label><input type="number" required className={inputClasses} placeholder="e.g., 75" /></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Height (cm)</label><input type="number" required className={inputClasses} placeholder="e.g., 180" /></div>
            <div>
              <label className={`block text-sm mb-1 ${labelClasses}`}>Gender</label>
              <select className={selectClasses}><option>Male</option><option>Female</option></select>
            </div>
          </div>
          
          {/* Second Row: Goals and Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Primary Goal</label><select className={selectClasses}><option>Weight Loss</option><option>Muscle Gain</option><option>Maintenance</option></select></div>
            <div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Dietary Preference</label><select className={selectClasses}><option>Non-Vegetarian</option><option>Vegetarian</option><option>Vegan</option></select></div>
            <div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Current Fitness Level</label><select className={selectClasses}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
          </div>

          {/* Third Row: Allergies */}
          <div>
            <label className={`block text-sm mb-1 ${labelClasses}`}>Food Allergies or Sensitivities</label>
            <textarea
              className={textareaClasses}
              placeholder="e.g., Peanuts, shellfish, lactose intolerant, gluten-free..."
            />
          </div>

          {/* Fourth Row: Injuries */}
          <div>
            <label className={`block text-sm mb-1 ${labelClasses}`}>Injuries or Physical Limitations</label>
            <textarea
              className={textareaClasses}
              placeholder="e.g., Avoid squats due to knee pain, lower back sensitivity, shoulder injury..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-purple-800 text-black font-bold rounded-md hover:shadow-blue-100 transition-all disabled:opacity-50">
              {loading ? 'Analyzing...' : 'Generate Plan'}
            </button>
          </div>
        </form>

        {/* --- Result Display (No change here) --- */}
        {loading && <div className="text-center mt-10 text-accent-cyan animate-pulse">Initializing neural network...</div>}
        {plan && (
          <div className={`mt-12 border-t pt-8 ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'}`}>
            <h2 className={`text-2xl font-bold text-center mb-6 ${headingClasses}`}>Your AI-Generated Blueprint</h2>
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${resultCardClasses}`}><h3 className="flex items-center font-bold text-xl text-accent-cyan mb-3"><FaDumbbell className="mr-3" /> Workout Protocol</h3><p className={`whitespace-pre-wrap font-mono text-sm ${resultTextColor}`}>{plan.workoutPlan}</p></div>
              <div className={`p-6 rounded-lg ${resultCardClasses}`}><h3 className="flex items-center font-bold text-xl text-accent-cyan mb-3"><FaUtensils className="mr-3" /> Nutrition Protocol</h3><p className={`whitespace-pre-wrap font-mono text-sm ${resultTextColor}`}>{plan.nutritionPlan}</p></div>
              <div className={`p-6 rounded-lg border-l-4 border-yellow-500 ${resultCardClasses}`}><h3 className="flex items-center font-bold text-xl text-yellow-500 mb-2"><FaExclamationTriangle className="mr-3" /> Important Notes</h3><p className={`text-sm ${resultTextColor}`}>Your plan has been adjusted based on the information you provided. Always consult a doctor before starting a new fitness regimen.</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneratorPage;