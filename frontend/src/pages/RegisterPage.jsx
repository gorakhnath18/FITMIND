 import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { theme } = useContext(ThemeContext);
  const { register, user } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const labelClasses = theme === 'dark' ? 'text-white' : 'text-gray-700 font-medium';
  const inputClasses = 'w-full rounded-md py-2.5 px-4 ' + (theme === 'dark' ? 'bg-dark-card border border-gray-500 text-white placeholder-gray-400 focus:ring-accent-cyan' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-500');
  const subtextClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  if (user) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p>Already logged in. Redirecting to dashboard...</p>
        </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className={`w-full max-w-md p-6 sm:p-8 space-y-6 rounded-xl ${containerClasses}`}>
        <h1 className={`text-3xl font-bold text-center ${headingClasses}`}>Create Your Account</h1>

        {error && <p className="text-center text-red-500 bg-red-500/10 p-3 rounded-md">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm mb-1 ${labelClasses}`}>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="John Doe" />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${labelClasses}`}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="you@example.com" />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${labelClasses}`}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputClasses} placeholder="••••••••" />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 bg-purple-700 text-white font-bold rounded-md hover:shadow-glow-purple transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className={`text-center text-sm ${subtextClasses}`}>
          Already have an account? <Link to="/login" className="font-medium text-accent-cyan hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;