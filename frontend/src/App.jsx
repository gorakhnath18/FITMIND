import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

// --- Step 1: Ensure all components are imported correctly ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LevelUpModal from './components/gamification/LevelUpModal';
import PrivateRoute from './components/PrivateRoute';

// --- Step 2: Ensure all page components are imported correctly ---
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import PlansPage from './pages/PlansPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { theme } = useContext(ThemeContext);
  const backgroundClasses = theme === 'dark' 
    ? 'dark-gradient-bg text-white' 
    : 'bg-gray-50 text-gray-800';

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${backgroundClasses}`}>
        {/* These components are outside the Routes, so they appear on every page */}
        <LevelUpModal />
        <Navbar />
        
        <main className="flex-grow">
          {/* --- Step 3: Ensure the Routes structure is correct --- */}
          <Routes>
            {/* --- Public Routes (Accessible to everyone) --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/generate-plan" element={<AIGeneratorPage />} />
            <Route path="/bmi" element={<CalculatorPage />} />
            
            {/* --- Private Routes (Only accessible to logged-in users) --- */}
            {/* We wrap these routes in our PrivateRoute component "guard" */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* If you add more member-only pages in the future, add their routes here */}
            </Route>

          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;