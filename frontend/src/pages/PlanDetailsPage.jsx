 import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaDumbbell, FaUtensils, FaInfoCircle, FaLeaf, FaDrumstickBite, FaSeedling, FaSave } from 'react-icons/fa';
import { savePlanAPI } from '../services/plan';

 const ExerciseCard = ({ exercise }) => {
    const [showDetails, setShowDetails] = useState(false);
    const exerciseName = exercise?.name ?? 'Unknown Exercise';
    const animationName = exercise?.animation_name || (typeof exerciseName === 'string' ? exerciseName.toLowerCase().replace(/\s+/g, '-') : 'default-animation');
    const animationUrl = `/animations/${animationName}.gif`;
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=how+to+do+${encodeURIComponent(exerciseName)}`;

    return (
        <li className="bg-dark-bg/60 p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="font-bold text-lg text-white">{exerciseName}</h5>
                    <p className="text-gray-400">{exercise?.sets ?? 'N/A'} sets x {exercise?.reps ?? 'N/A'} reps</p>
                </div>
                <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={`Show details for ${exerciseName}`}
                >
                    <FaInfoCircle className="text-accent-cyan" />
                </button>
            </div>
            {showDetails && (
                <div className="mt-4 pt-4 border-t border-gray-700/50 animate-fade-in text-sm text-gray-300 space-y-2">
                    <p>{exercise?.description ?? 'No description available.'}</p>
                    <p><strong className="text-gray-100">Alternatives:</strong> {exercise?.alternatives ?? 'None listed.'}</p>
                    <a href={youtubeSearchUrl} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline mt-2 inline-block flex items-center"><FaYoutube className="mr-2" /> Watch Tutorial</a>
                </div>
            )}
        </li>
    );
};

 const MealCard = ({ meal }) => {
    return (
        <div className="bg-dark-bg/60 p-4 rounded-lg border border-gray-700/50">
            <h5 className="font-bold text-lg text-accent-cyan mb-2">{meal?.mealName ?? 'Unnamed Meal'}</h5>
            <div className="whitespace-pre-wrap text-gray-300">{meal?.foodItems ?? 'No food items listed.'}</div>
            <p className="text-sm text-cyan-400/80 mt-2">{meal?.nutritionInfo ?? '(Nutrition info not available)'}</p>
            <div className="mt-4 pt-3 border-t border-gray-700/50">
                <p className="text-sm text-gray-400">
                    <strong className="text-gray-200">Alternatives: </strong>{meal?.alternatives ?? 'None listed.'}
                </p>
            </div>
        </div>
    );
};


 const PlanDetailsPage = () => {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();

    const { plan, formData } = location.state || {};
    const [isSaving, setIsSaving] = useState(false);

     const handleSavePlan = async () => {
         const planName = prompt("Please enter a name for this plan:", `My ${formData?.goal || 'Fitness'} Plan`);
        
         if (planName) {
            setIsSaving(true);
            try {
                 const planData = {
                    planName,
                    generationParams: formData,
                    workoutPlan: plan.workoutPlan,
                    nutritionPlan: plan.nutritionPlan,
                };

                 await savePlanAPI(planData);
                
                alert("Plan saved successfully!");
                navigate('/plans'); 
            } catch (error) {
                console.error("Failed to save plan:", error);
                alert("Could not save the plan. Please try again.");
            } finally {
                setIsSaving(false);
            }
        }
    };

    if (
        !plan || typeof plan !== 'object' || !formData || typeof formData !== 'object' ||
        !plan.workoutPlan || !plan.nutritionPlan || 
        !Array.isArray(plan.workoutPlan.schedule) || !Array.isArray(plan.nutritionPlan.dailyMeals)
    ) {
        React.useEffect(() => { navigate('/generate-plan'); }, [navigate]);
        return <div className="text-center p-8">Plan data is incomplete. Redirecting...</div>;
    }
    
    const containerClasses = theme === 'dark' ? 'bg-dark-card/60 backdrop-blur-md border-gray-700/60' : 'bg-white shadow-xl border-gray-200';
    const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
    const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const cardClasses = theme === 'dark' ? 'bg-dark-bg border border-gray-700' : 'bg-gray-50 border-gray-200';
    const cardTitleColor = theme === 'dark' ? 'text-accent-cyan' : 'text-purple-600';
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

    return (
        <div className="container mx-auto mt-12 mb-20 px-4">
            <div className={`p-6 sm:p-8 max-w-4xl mx-auto rounded-xl ${containerClasses}`}>
                <div className="text-center mb-8">
                    <h1 className={`text-3xl font-bold ${headingClasses}`}>Your AI-Generated Blueprint</h1>
                    <p className={subtextColor}>Review your new plan below. If you like it, save it to your library.</p>
                </div>

                {/* --- SAVE PLAN BUTTON SECTION --- */}
                <div className="text-center mb-8">
                    <button 
                        onClick={handleSavePlan}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-all disabled:opacity-50"
                    >
                        <FaSave /> {isSaving ? 'Saving...' : 'Save This Plan'}
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Workout Plan Section */}
                    <div className={`p-6 rounded-lg ${cardClasses}`}>
                        <h3 className={`flex items-center font-bold text-xl ${cardTitleColor} mb-4`}><FaDumbbell className="mr-3" /> Workout Protocol</h3>
                        <p className={`${textColor} mb-6 italic`}>{plan.workoutPlan.weeklyGoal ?? 'No weekly goal provided.'}</p>
                        <div className="space-y-6">
                            {plan.workoutPlan.schedule.map((day, dayIndex) => (
                                <div key={dayIndex}>
                                    <h4 className="text-lg font-bold text-accent-cyan mb-3">{day?.day ?? `Day ${dayIndex + 1}`}</h4>
                                    {(day?.exercises && day.exercises.length > 0) ? (
                                        <ul className="space-y-3">
                                            {day.exercises.map((ex, exIndex) => (
                                                <ExerciseCard key={exIndex} exercise={ex} />
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400">No exercises scheduled for this day.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nutrition Plan Section */}
                    <div className={`p-6 rounded-lg ${cardClasses}`}>
                        <h3 className={`flex items-center font-bold text-xl ${cardTitleColor} mb-4`}>
                            {formData.diet === 'Vegetarian' && <FaLeaf className="mr-3 text-green-500" />}
                            {formData.diet === 'Non-Vegetarian' && <FaDrumstickBite className="mr-3 text-yellow-600" />}
                            {formData.diet === 'Vegan' && <FaSeedling className="mr-3 text-green-400" />}
                            Nutrition Protocol
                        </h3>
                        <p className={`${textColor} mb-6 italic`}>{plan.nutritionPlan.nutritionalStrategy ?? 'Nutritional strategy not specified.'}</p>
                        <div className="space-y-4">
                            {plan.nutritionPlan.dailyMeals.map((meal, index) => (
                                <MealCard key={index} meal={meal} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetailsPage;