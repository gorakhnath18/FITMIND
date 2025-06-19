 import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CalculatorPage = () => {
  const { theme } = useContext(ThemeContext);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const calculateBmi = (e) => { e.preventDefault(); if (!weight || !height) return; const h = height / 100; const bmiVal = (weight / (h * h)).toFixed(2); setBmi(bmiVal); if (bmiVal < 18.5) setMessage('You may be underweight.'); else if (bmiVal < 25) setMessage('You have a healthy weight.'); else if (bmiVal < 30) setMessage('You may be overweight.'); else setMessage('You may be obese.'); };
  
  const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const labelClasses = theme === 'dark' ? 'text-white' : 'text-gray-700 font-medium';
  const inputClasses = 'w-full rounded-md py-2.5 px-4 ' + (theme === 'dark' ? 'bg-dark-card border border-gray-500 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400');
  const resultBoxClasses = theme === 'dark' ? 'bg-dark-bg border-gray-700' : 'bg-purple-50 border-purple-200';

  return (
    // Add px-4 to this div for mobile padding
    <div className="flex justify-center items-center py-20 px-4">
      <div className={`w-full max-w-md p-6 sm:p-8 space-y-6 rounded-xl ${containerClasses}`}>
        <h1 className={`text-3xl font-bold text-center ${headingClasses}`}>BMI Calculator</h1>
        <form onSubmit={calculateBmi} className="space-y-6">
          <div><label className={`block text-sm mb-1 ${labelClasses}`}>Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required className={inputClasses} placeholder="e.g., 70" /></div>
          <div><label className={`block text-sm mb-1 ${labelClasses}`}>Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required className={inputClasses} placeholder="e.g., 175" /></div>
          <button type="submit" className="w-full py-3 bg-purple-700 hover:shadow-glow-purple text-white font-bold rounded-md transition-shadow">Calculate BMI</button>
        </form>
        {bmi && (
          <div className={`text-center mt-8 p-4 rounded-lg border ${resultBoxClasses}`}>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-accent-cyan' : 'text-purple-800'}`}>Your BMI is: {bmi}</h2>
            <p className={`text-lg mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CalculatorPage;