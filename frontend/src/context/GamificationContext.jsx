 import { create } from 'zustand';

// --- Game Design Configuration ---
export const LEVEL_THRESHOLDS = { 1: 0, 2: 200, 3: 500, 4: 1000, 5: 1800, 6: 3000 };

// --- Zustand Store ---
export const useGamification = create((set, get) => ({
  // --- STATE ---
  level: 1,
  xp: 0,
  xpForNextLevel: LEVEL_THRESHOLDS[2],
  showLevelUpModal: false,
  lastReward: null,
  dailyTasks: [
    { id: 1, text: 'Log 8 glasses of water', xp: 25, completed: false },
    { id: 2, text: 'Complete a 45-min workout', xp: 50, completed: false },
    { id: 3, text: 'Walk 10,000 steps', xp: 50, completed: false },
    // --- THIS IS THE NEW LINE YOU REQUESTED ---
    { id: 4, text: 'Follow diet plan', xp: 50, completed: false },
    { id: 5, text: 'Wake-up at 6', xp: 25, completed: false },

  ],

  // --- ACTIONS ---
  completeTask: (taskId) => {
    const task = get().dailyTasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    const newXp = get().xp + task.xp;
    set(state => ({
      xp: newXp,
      dailyTasks: state.dailyTasks.map(t => t.id === taskId ? { ...t, completed: true } : t)
    }));
    
    const currentLevel = get().level;
    const nextLevel = currentLevel + 1;
    const xpForNext = LEVEL_THRESHOLDS[nextLevel];

    if (xpForNext !== undefined && newXp >= xpForNext) {
      set(state => ({
        level: nextLevel,
        xpForNextLevel: LEVEL_THRESHOLDS[nextLevel + 1] || xpForNext,
        showLevelUpModal: true,
        lastReward: `Congratulations! You've reached a new level.`,
      }));
    }
  },

  closeLevelUpModal: () => set({ showLevelUpModal: false, lastReward: null }),
}));