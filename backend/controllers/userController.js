 const User = require('../models/User');

// --- Gamification Rules  
const dailyTasksConfig = [
    { id: 1, text: 'Log 8 glasses of water', xp: 25 },
    { id: 2, text: 'Complete a 30-min workout', xp: 100 },
    { id: 3, text: 'Walk 5,000 steps', xp: 50 },
    { id: 4, text: 'Follow diet plan', xp: 25 },
];

const LEVEL_THRESHOLDS = { 1: 0, 2: 200, 3: 500, 4: 1000, 5: 1800, 6: 3000 };

// --- GET USER PROFILE LOGIC ---
// @desc    Get the logged-in user's profile
// @route   GET /api/users/profile
exports.getUserProfile = async (req, res) => {
    // Because our 'protect' middleware ran first, the full user object (minus password)
    // is already attached to the request object as 'req.user'.
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// --- COMPLETE DAILY TASK LOGIC ---
// @desc    Update user XP and level for completing a task
// @route   POST /api/users/tasks/complete
exports.completeTask = async (req, res) => {
    const { taskId } = req.body;
    
    // Find the task in our secure, backend configuration
    const task = dailyTasksConfig.find(t => t.id === Number(taskId));
    if (!task) {
        return res.status(400).json({ message: 'Invalid Task ID' });
    }

    try {
        // The user is available from our 'protect' middleware
        const user = req.user;

        // Add the XP from the config to the user's current XP
        user.xp += task.xp;

        // Check if the user's new XP total crosses the threshold for the next level
        const nextLevel = user.level + 1;
        const xpForNextLevel = LEVEL_THRESHOLDS[nextLevel];

        if (xpForNextLevel !== undefined && user.xp >= xpForNextLevel) {
            user.level = nextLevel; // Level up!
        }

        // Save the updated user document back to the database
        const updatedUser = await user.save();

        // Send the complete, updated user object back to the frontend
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ message: 'Server error while completing task' });
    }
};