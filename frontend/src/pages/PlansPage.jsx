 import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getSavedPlansAPI, deletePlanAPI } from '../services/plan';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const PlansPage = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [savedPlans, setSavedPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                setError('');
                setLoading(true);
                const { data } = await getSavedPlansAPI();
                if (Array.isArray(data)) {
                    setSavedPlans(data);
                }
            } catch (err) {
                console.error("Failed to fetch saved plans:", err);
                setError("Could not fetch your saved plans. Please try refreshing the page.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, [user]);
    
    const handleDeletePlan = async (planId) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            try {
                await deletePlanAPI(planId);
                setSavedPlans(prevPlans => prevPlans.filter(p => p._id !== planId));
            } catch (error) {
                console.error("Failed to delete plan:", error);
                alert("Could not delete the plan. Please try again.");
            }
        }
    };

    const handleViewPlan = (plan) => {
         navigate('/plan-details', { 
            state: { 
                plan: { 
                    workoutPlan: plan.workoutPlan, 
                    nutritionPlan: plan.nutritionPlan 
                }, 
                formData: plan.generationParams 
            } 
        });
    };

    const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
    const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const cardClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border border-gray-700/60' : 'bg-white shadow-xl border-gray-200';

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-10 w-10 border-4 border-accent-cyan border-t-transparent rounded-full"></div>
                </div>
            );
        }
        if (error) {
            return <div className="text-center text-red-500 text-lg p-8 bg-red-500/10 rounded-lg">{error}</div>;
        }
        if (savedPlans.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {savedPlans.map(plan => (
                        <div key={plan._id} className={`p-6 rounded-xl flex flex-col justify-between transition-all hover:shadow-glow-cyan/20 ${cardClasses}`}>
                            <div>
                                <h3 className={`font-bold text-xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{plan.planName}</h3>
                                <p className="text-sm text-gray-400 mb-1">
                                    Goal: {plan.generationParams?.goal ?? 'N/A'}
                                </p>
                                <p className="text-sm text-gray-400 mb-4">
                                    Created on: {new Date(plan.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-4 border-t border-gray-700/50 pt-4">
                                <button onClick={() => handleViewPlan(plan)} className="p-3 bg-gray-500/20 hover:bg-gray-500/40 rounded-lg" title="View Plan">
                                    <FaEye className="text-accent-cyan" />
                                </button>
                                <button onClick={() => handleDeletePlan(plan._id)} className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-lg" title="Delete Plan">
                                    <FaTrash className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div className="text-center border-2 border-dashed border-gray-600 p-12 rounded-xl">
                <p className="text-lg mb-6 text-gray-400">You don't have any saved plans yet.</p>
                <Link to="/generate-plan" className="inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan text-black font-bold rounded-md hover:shadow-glow-cyan transition-all transform hover:scale-105">
                    <FaPlus /> Create a New Plan
                </Link>
            </div>
        );
    };

    return (
        <section className={`py-20 px-4 min-h-screen`}>
            <div className="container mx-auto text-center">
                <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${headingClasses}`}>My Saved Plans</h2>
                <p className={`mb-12 max-w-2xl mx-auto ${subtextColor}`}>
                    Here are all the personalized fitness blueprints you have generated and saved.
                </p>
                {renderContent()}
            </div>
        </section>
    );
};

export default PlansPage;