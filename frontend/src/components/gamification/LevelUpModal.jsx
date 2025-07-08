 import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useGamification } from '../../context/GamificationContext'; 
import { useWindowSize } from 'react-use';

const LevelUpModal = () => {
    const { isLevelUpModalOpen, newLevel, closeLevelUpModal } = useGamification();
    const { width, height } = useWindowSize();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeLevelUpModal();
            }
        };
        if (isLevelUpModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLevelUpModalOpen, closeLevelUpModal]);

    if (!isLevelUpModalOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] backdrop-blur-sm"
            onClick={closeLevelUpModal}>
            {}
            <Confetti width={width} height={height} recycle={false} numberOfPieces={400} tweenDuration={8000} onConfettiComplete={(confetti) => {
                closeLevelUpModal(); 
                if (confetti) confetti.reset();
            }} />
            
            {}
            <div 
                className="bg-dark-card border border-accent-purple rounded-xl p-8 text-center transform scale-100 max-w-sm mx-4"
                onClick={e => e.stopPropagation()} 
            >
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2 animate-pulse">
                    LEVEL UP!
                </h2>
                {}
                <p className="text-white text-2xl mb-4">You've reached Level {newLevel}!</p>
                <p className="text-accent-cyan text-lg font-semibold mb-6">Keep up the great work!</p>
                <button
                    onClick={closeLevelUpModal}
                    className="px-8 py-3 bg-accent-purple text-white font-bold rounded-md hover:shadow-glow-purple transition-all"
                >
                    Awesome!
                </button>
            </div>
        </div>
    );
};

export default LevelUpModal;