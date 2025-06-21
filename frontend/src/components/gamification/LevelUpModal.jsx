 import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useGamification } from '../../context/GamificationContext'; // Use our updated context
import { useWindowSize } from 'react-use';

const LevelUpModal = () => {
    // Get the new state and functions directly from the context
    const { isLevelUpModalOpen, newLevel, closeLevelUpModal } = useGamification();
    const { width, height } = useWindowSize();

    // Effect to allow closing the modal with the Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeLevelUpModal();
            }
        };
        // Only listen for the keydown event if the modal is open
        if (isLevelUpModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLevelUpModalOpen, closeLevelUpModal]);

    // The modal's visibility is now controlled by the state from the context
    if (!isLevelUpModalOpen) {
        return null;
    }

    return (
        // The overlay that covers the screen
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] backdrop-blur-sm"
            onClick={closeLevelUpModal} // Close the modal if the overlay is clicked
        >
            {/* The confetti effect */}
            <Confetti width={width} height={height} recycle={false} numberOfPieces={400} tweenDuration={8000} onConfettiComplete={(confetti) => {
                closeLevelUpModal(); // Also close modal when confetti finishes
                if (confetti) confetti.reset();
            }} />
            
            {/* The modal content itself */}
            <div 
                className="bg-dark-card border border-accent-purple rounded-xl p-8 text-center transform scale-100 max-w-sm mx-4"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            >
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2 animate-pulse">
                    LEVEL UP!
                </h2>
                {/* Display the new level passed from the context */}
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