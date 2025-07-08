 import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LevelUpModal from './components/gamification/LevelUpModal';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import PlansPage from './pages/PlansPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import SettingsPage from './pages/SettingsPage';
import PlanDetailsPage from './pages/PlanDetailsPage';

function App() {
  const { theme } = useContext(ThemeContext);
  const backgroundClasses = theme === 'dark' 
    ? 'dark-gradient-bg text-white' 
    : 'bg-gray-50 text-gray-800';

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${backgroundClasses}`}>
        <LevelUpModal />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {}
          {}
            <Route path="/" element={<HomePage />} />
            <Route path="/plans" element={<PlansPage />} />
            
            {}
            <Route path="/bmi" element={<CalculatorPage />} />
            
            <Route path="/generate-plan" element={<AIGeneratorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {}
            {}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/plan-details" element={<PlanDetailsPage />} /> 
            </Route>

          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;