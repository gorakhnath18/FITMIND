 import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LevelUpModal from './components/gamification/LevelUpModal';

// Pages
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import PlansPage from './pages/PlansPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import SettingsPage from './pages/SettingsPage'; // <-- IMPORT SETTINGS PAGE

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
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/generate-plan" element={<AIGeneratorPage />} />
            <Route path="/settings" element={<SettingsPage />} /> {/* <-- ADD SETTINGS ROUTE */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;