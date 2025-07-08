 import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CalculatorPage = () => {
  const { theme } = useContext(ThemeContext);
  
   const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  
   const [result, setResult] = useState(null);

  const calculateBmi = (e) => {
    e.preventDefault();
    
     const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        alert("Please enter valid positive numbers for height and weight.");
        return;
    }

    const heightInMeters = h / 100;
    const bmiVal = (w / (heightInMeters * heightInMeters)).toFixed(2);
    
    let message = '';
    if (bmiVal < 18.5) {
      message = 'You may be in the underweight range.';
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      message = 'You are in the healthy weight range.';
    } else if (bmiVal >= 25 && bmiVal < 30) {
      message = 'You may be in the overweight range.';
    } else {
      message = 'You may be in the obesity range.';
    }

    setResult({ bmi: bmiVal, message: message });
  };
  
  const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const labelClasses = theme === 'dark' ? 'text-white' : 'text-gray-700 font-medium';
  const inputClasses = 'w-full rounded-md py-2.5 px-4 ' + (theme === 'dark' ? 'bg-dark-card border border-gray-500 text-white placeholder-gray-400 focus:ring-accent-cyan' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-500');
  const resultBoxClasses = theme === 'dark' ? 'bg-dark-bg border-gray-700' : 'bg-purple-50 border-purple-200';

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className={`w-full max-w-md p-6 sm:p-8 space-y-6 rounded-xl transition-all duration-300 ${containerClasses}`}>
        <h1 className={`text-3xl font-bold text-center ${headingClasses}`}>BMI Calculator</h1>
        
        <form onSubmit={calculateBmi} className="space-y-6">
          <div>
            <label htmlFor="weight" className={`block text-sm mb-1 ${labelClasses}`}>Weight (kg)</label>
            <input 
              id="weight"
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              required 
              className={inputClasses} 
              placeholder="e.g., 75" 
            />
          </div>
          <div>
            <label htmlFor="height" className={`block text-sm mb-1 ${labelClasses}`}>Height (cm)</label>
            <input 
              id="height"
              type="number" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              required 
              className={inputClasses} 
              placeholder="e.g., 175" 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-purple-700 text-white font-bold rounded-md hover:shadow-glow-purple transition-shadow">
            Calculate BMI
          </button>
        </form>

        {}
        {result && (
          <div className={`text-center mt-8 p-4 rounded-lg border ${resultBoxClasses}`}>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-accent-cyan' : 'text-purple-800'}`}>
              Your BMI is: {result.bmi}
            </h2>
            <p className={`text-lg mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;