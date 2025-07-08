import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';  

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();  

   const generatePlanLink = user ? '/generate-plan' : '/register';
  
  const headingClasses = 'text-white';  
  const subtextColor = 'text-gray-200';  
  const cardClasses = theme === 'dark' 
    ? 'bg-dark-card/60 backdrop-blur-md border border-gray-700/60' 
    : 'bg-white shadow-xl border border-gray-200';
  const cardHeadingClasses = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardSubtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const features = [
    { beforeImage: "/images/feature-1-before.jpg", afterImage: "/images/feature-1-after.jpg", title: "Input Your Data", desc: "Provide your goals, stats, and preferences through our secure interface." },
    { beforeImage: "/images/feature-2-before.jpg", afterImage: "/images/feature-2-after.jpg", title: "AI-Powered Generation", desc: "Our algorithm crafts a unique workout and nutrition schedule in seconds." },
    { beforeImage: "/images/feature-3-before.jpg", afterImage: "/images/feature-3-after.jpg", title: "Achieve Peak Results", desc: "Follow a plan scientifically tailored to maximize your body's potential." }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* --- HERO SECTION (UPDATED) --- */}
      <section className="relative text-center py-24 lg:py-40">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-background.jpg" 
            alt="Fitness motivation background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className={`text-4xl lg:text-6xl font-extrabold ${headingClasses}`}>Evolve Your Fitness. Empower Your Mind.</h1>
          <p className={`mt-6 text-lg lg:text-xl max-w-3xl mx-auto ${subtextColor}`}>Unlock your potential with hyper-personalized workout and nutrition plans.</p>
          
          {}
          <Link 
            to={generatePlanLink} 
            className="mt-10 inline-block bg-purple-500 text-white font-bold text-lg px-10 py-4 rounded-md shadow-lg shadow-purple-500/50 hover:shadow-purple-700/50 transition-all transform hover:scale-105"
          >
            Generate My AI Plan
          </Link>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl font-bold mb-16 ${theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent'}`}>The Future of Fitness is Here</h2>
          <div className="flex flex-wrap justify-center -mx-4">
            {features.map((feature, i) => (
              <div key={i} className="w-full md:w-1/3 p-4 flex">
                <div className={`flex flex-col text-center h-full rounded-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden ${cardClasses}`}>
                  
                  <div className="flex w-full h-48">
                     <div className="w-1/2 h-full"><img src={feature.beforeImage} alt={`${feature.title} before`} className="w-full h-full object-cover" /></div>
                     <div className="w-1/2 h-full"><img src={feature.afterImage} alt={`${feature.title} after`} className="w-full h-full object-cover" /></div>
                  </div>
                 
                  <div className="p-8 flex-grow flex flex-col justify-center">
                    <h3 className={`text-xl font-bold mb-3 ${cardHeadingClasses}`}>{feature.title}</h3>
                    <p className={cardSubtextColor}>{feature.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;