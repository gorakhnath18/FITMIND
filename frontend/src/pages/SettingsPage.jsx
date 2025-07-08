import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const SettingsPage = () => {
    const { theme } = useContext(ThemeContext);
    const { user, updatePfp } = useAuth();
    const [newPfpUrl, setNewPfpUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPfpUrl) {
            updatePfp(newPfpUrl);
            setNewPfpUrl('');  
        }
    };
    
    const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
    const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
    const labelClasses = theme === 'dark' ? 'text-white' : 'text-gray-700 font-medium';
    const inputClasses = 'w-full rounded-md py-2.5 px-4 ' + (theme === 'dark' ? 'bg-dark-card border border-gray-500 text-white placeholder-gray-400 focus:ring-accent-cyan' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-500');

    if (!user) return <p>Please log in to see settings.</p>;

    return (
        <div className="container mx-auto mt-12 mb-20 px-4">
            <div className={`p-6 sm:p-8 max-w-2xl mx-auto rounded-xl transition-all duration-300 ${containerClasses}`}>
                <h1 className={`text-3xl font-bold mb-6 ${headingClasses}`}>Account Settings</h1>

                <div className="flex items-center space-x-6 mb-8">
                    <img src={user.pfpUrl} alt="Current Profile" className="w-24 h-24 rounded-full object-cover border-4 border-accent-purple" />
                    <div>
                        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={`block text-sm mb-1 ${labelClasses}`}>Change Profile Picture</label>
                        <input
                            type="text"
                            value={newPfpUrl}
                            onChange={(e) => setNewPfpUrl(e.target.value)}
                            className={inputClasses}
                            placeholder="Paste a new image URL..."
                        />
                        <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            In a real app, this would be a file upload button.
                        </p>
                    </div>
                    <button type="submit" className="w-full py-3 px-6 bg-accent-cyan text-red font-bold rounded-md hover:shadow-glow-cyan transition-all disabled:opacity-50">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;