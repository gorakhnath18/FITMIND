 import React, { createContext, useContext, useState } from 'react';

 const GamificationContext = createContext(null);

export const GamificationProvider = ({ children }) => {
     const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
     const [newLevel, setNewLevel] = useState(0);

     const triggerLevelUpModal = (level) => {
        setNewLevel(level);  
        setIsLevelUpModalOpen(true);  
    };

     const closeLevelUpModal = () => {
        setIsLevelUpModalOpen(false);
    };

     const dailyTasks = [
        { id: 1, text: 'Log 6 glasses of water', xp: 25 },
        { id: 2, text: 'Complete a -min workout', xp: 100 },
        { id: 3, text: 'Walk 8,000 steps', xp: 50 },
        { id: 4, text: 'Follow diet plan', xp: 25 },
    ];

     const value = { 
        dailyTasks, 
        isLevelUpModalOpen, 
        newLevel, 
        triggerLevelUpModal, 
        closeLevelUpModal 
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
};

 export const useGamification = () => {
    return useContext(GamificationContext);
};