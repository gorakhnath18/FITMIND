 import React, { useState, useContext } from 'react';
import { FaRobot, FaDumbbell, FaUtensils, FaLeaf, FaDrumstickBite, FaSeedling } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { generatePlanAPI } from '../services/ai';

const AIGeneratorPage = () => {
  const { theme } = useContext(ThemeContext);
  
  const [formData, setFormData] = useState({
    age: '', weight: '', height: '', gender: 'Male', goal: 'Weight Loss', fitnessLevel: 'Beginner',
    diet: 'Non-Vegetarian', days: '4', split: 'Full Body', meals: '4',
    useCustomNutrition: false, totalCalories: '', proteinPercentage: '40', carbsPercentage: '40', fatPercentage: '20',
  });
  
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    setPlan(null);
    setError('');
    try {
        const generatedPlan = await generatePlanAPI(formData);
        setPlan(generatedPlan);
    } catch (err) {
        setError(err.response?.data?.message || "Failed to generate plan. Please try again later.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const parseAndRender = (text) => {
    if (!text) return null;
    return text.split(/<HL>(.*?)<\/HL>/g).map((part, index) => {
        if (index % 2 === 0) return part;
        return <strong key={index} className="text-accent-cyan font-bold block my-2">{part}</strong>;
    });
  };

  const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const labelClasses = theme === 'dark' ? 'text-white' : 'text-gray-700 font-medium';
  const inputClasses = 'w-full rounded-md py-2.5 px-4 ' + (theme === 'dark' ? 'bg-dark-card border border-gray-500 text-white placeholder-gray-400 focus:ring-accent-cyan' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-500');
  const selectClasses = inputClasses + (theme === 'dark' ? ' dark-mode-select' : '');
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Age</label><input type="number" name="age" value={formData.age} onChange={handleChange} required className={inputClasses} placeholder="e.g., 28" /></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Weight (kg)</label><input type="number" name="weight" value={formData.weight} onChange={handleChange} required className={inputClasses} placeholder="e.g., 75" /></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Height (cm)</label><input type="number" name="height" value={formData.height} onChange={handleChange} required className={inputClasses} placeholder="e.g., 180" /></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Gender</label><select name="gender" value={formData.gender} onChange={handleChange} className={selectClasses}><option>Male</option><option>Female</option></select></div>
            <div className="md:col-span-2"><label className={`block text-sm mb-1 ${labelClasses}`}>Primary Goal</label><select name="goal" value={formData.goal} onChange={handleChange} className={selectClasses}><option>Weight Loss</option><option>Muscle Gain</option><option>Body Recomposition</option></select></div>
            <div className="md:col-span-2"><label className={`block text-sm mb-1 ${labelClasses}`}>Current Fitness Level</label><select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className={selectClasses}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Workout Split Type</label><select name="split" value={formData.split} onChange={handleChange} className={selectClasses}><option>Full Body</option><option>Push/Pull/Legs</option><option>Upper/Lower</option><option>Body Part Split (Bro Split)</option></select></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Workout Days Per Week</label><select name="days" value={formData.days} onChange={handleChange} className={selectClasses}><option>4</option><option>5</option><option>6</option><option>7</option></select></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Dietary Preference</label><select name="diet" value={formData.diet} onChange={handleChange} className={selectClasses}><option>Non-Vegetarian</option><option>Vegetarian</option><option>Vegan</option></select></div>
            <div><label className={`block text-sm mb-1 ${labelClasses}`}>Meals Per Day</label><select name="meals" value={formData.meals} onChange={handleChange} className={selectClasses}><option>3</option><option>4</option><option>5</option><option>6</option></select></div>
          </div>
          <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" name="useCustomNutrition" checked={formData.useCustomNutrition} onChange={handleChange} className="form-checkbox h-5 w-5 rounded bg-dark-card text-accent-cyan focus:ring-accent-cyan" /><span className={labelClasses}>Set Custom Calorie & Macro Targets?</span></label>
            {formData.useCustomNutrition && (<div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6 mt-4 animate-fade-in"><div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Total Calories</label><input type="number" name="totalCalories" value={formData.totalCalories} onChange={handleChange} required className={inputClasses} placeholder="e.g., 2200" /></div><div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Protein %</label><input type="number" name="proteinPercentage" value={formData.proteinPercentage} onChange={handleChange} required className={inputClasses} placeholder="e.g., 40" /></div><div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Carbs %</label><input type="number" name="carbsPercentage" value={formData.carbsPercentage} onChange={handleChange} required className={inputClasses} placeholder="e.g., 40" /></div><div className="md:col-span-1"><label className={`block text-sm mb-1 ${labelClasses}`}>Fat %</label><input type="number" name="fatPercentage" value={formData.fatPercentage} onChange={handleChange} required className={inputClasses} placeholder="e.g., 20" /></div></div>)}
          </div>
          <div className="text-center mt-6"><button type="submit" disabled={loading} className="w-full py-3 px-6 bg-purple-500 text-black font-bold rounded-md hover:shadow-purple-500 transition-all disabled:opacity-50"> {loading ? 'Analyzing...' : 'Generate Plan'}</button></div>
        </form>

        {loading && <div className="text-center mt-10 text-accent-cyan animate-pulse">Initializing neural network... Please wait...</div>}
        {error && <div className="text-center mt-10 text-red-500">{error}</div>}

        {plan && (
            <div className={`mt-12 border-t pt-8 ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'}`}>
                <h2 className={`text-2xl font-bold text-center mb-6 ${headingClasses}`}>Your AI-Generated Blueprint</h2>
                <div className="space-y-6">
                    <div className={`p-6 rounded-lg ${resultCardClasses}`}>
                        <h3 className="flex items-center font-bold text-xl mb-3 text-accent-cyan"><FaDumbbell className="mr-3" /> Workout Protocol</h3>
                        <div className={`whitespace-pre-wrap font-mono text-sm ${resultTextColor}`}>{parseAndRender(plan.workoutPlan)}</div>
                    </div>
                    <div className={`p-6 rounded-lg ${resultCardClasses}`}>
                        <h3 className="flex items-center font-bold text-xl mb-3 text-accent-cyan">
                            {formData.diet === 'Vegetarian' && <FaLeaf className="mr-3 text-green-500" />}
                            {formData.diet === 'Non-Vegetarian' && <FaDrumstickBite className="mr-3 text-yellow-600" />}
                            {formData.diet === 'Vegan' && <FaSeedling className="mr-3 text-green-400" />}
                            Nutrition Protocol
                        </h3>
                        <div className={`whitespace-pre-wrap font-mono text-sm ${resultTextColor}`}>{parseAndRender(plan.nutritionPlan)}</div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneratorPage;