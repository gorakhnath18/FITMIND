 import React, { useContext } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const PlansPage = () => {
  const { theme } = useContext(ThemeContext);
  const plans = [ { title: 'Basic Fit', price: '99', features: ['AI Workout Plan', 'AI Diet Plan', 'Email Support'], isPopular: false }, { title: 'Pro Fit', price: '199', features: ['Everything in Basic', 'Track Progress', 'Community Access', 'Priority Support'], isPopular: true }, { title: 'Mind & Body', price: '299', features: ['Everything in Pro', '1-on-1 Video Check-in', 'Mindfulness Guides'], isPopular: false }, ];

  const headingClasses = theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent';
  const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
     <section className={`py-20 px-4 ${theme === 'light' ? 'bg-white' : 'bg-transparent'}`}>
      <div className="container mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${headingClasses}`}>Choose Your Plan</h2>
        <p className={`mb-16 max-w-2xl mx-auto ${subtextColor}`}>Start your journey with a plan that fits your needs.</p>
        <div className="flex flex-wrap justify-center relative -mx-4">
          {plans.map((plan) => {
            const cardClasses = theme === 'dark' ? 'bg-dark-card/80 backdrop-blur-md border border-gray-700/60' : 'bg-white shadow-xl border border-gray-200';
            const cardHeadingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
            const featureTextColor = theme === 'dark' ? 'text-white' : 'text-gray-600';
            return (
              <div key={plan.title} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className={`p-8 text-center rounded-xl transform hover:-translate-y-2 transition-all duration-300 relative ${cardClasses} ${plan.isPopular ? 'border-4 border-accent-purple' : ''}`}>
                  {plan.isPopular && <span className={`bg-accent-purple text-xs font-bold px-3 py-1 rounded-full uppercase absolute -top-4 right-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Popular</span>}
                  <h3 className={`text-2xl font-bold mb-2 ${cardHeadingColor}`}>{plan.title}</h3>
                  <p className={`text-4xl font-extrabold mb-4 ${cardHeadingColor}`}> ₹ {plan.price}<span className="text-base font-medium text-gray-500">/month</span></p>
                  <ul className="text-left space-y-3 mb-8">
                    {plan.features.map((feature) => <li key={feature} className={`flex items-center ${featureTextColor}`}><FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" /><span>{feature}</span></li>)}
                  </ul>
                  <button className="w-full py-3 px-4 bg-accent-purple hover:shadow-glow-purple text-purple-700 font-bold rounded-md transition-shadow">Choose Plan</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default PlansPage;