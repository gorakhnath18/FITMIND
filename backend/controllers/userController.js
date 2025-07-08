 const User = require('../models/User');

const dailyTasksConfig = [
    { id: 1, text: 'Log 8 glasses of water', xp: 25 },
    { id: 2, text: 'Complete a 30-min workout', xp: 100 },
    { id: 3, text: 'Walk 5,000 steps', xp: 50 },
    { id: 4, text: 'Follow diet plan', xp: 25 },
];

const LEVEL_THRESHOLDS = { 1: 0, 2: 200, 3: 500, 4: 1000, 5: 1800, 6: 3000 };
exports.getUserProfile = async (req, res) => {
     if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.completeTask = async (req, res) => {
     const { taskId } = req.body;
    
    const task = dailyTasksConfig.find(t => t.id === Number(taskId));
    if (!task) {
        return res.status(400).json({ message: 'Invalid Task ID' });
    }

    try {
        const user = req.user;
        user.xp += task.xp;

        const nextLevel = user.level + 1;
        const xpForNextLevel = LEVEL_THRESHOLDS[nextLevel];

        if (xpForNextLevel !== undefined && user.xp >= xpForNextLevel) {
            user.level = nextLevel;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ message: 'Server error while completing task' });
    }
};

    exports.markDayAsComplete = async (req, res) => {
    try {
         const user = req.user;
        
         const today = new Date();
        today.setHours(0, 0, 0, 0);
        const alreadyCompleted = user.completedDays.some(date => {
            const completedDate = new Date(date);
            completedDate.setHours(0, 0, 0, 0);
            return completedDate.getTime() === today.getTime();
        });

         if (alreadyCompleted) {
            return res.status(200).json({ 
                message: 'Day was already marked as complete.', 
                completedDays: user.completedDays 
            });
        }

         user.completedDays.push(today);
         await user.save();

         res.status(200).json({ 
            message: 'Day marked as complete!', 
            completedDays: user.completedDays 
        });

    } catch (error) {
        console.error("Error marking day complete:", error);
        res.status(500).json({ message: 'Server Error while marking day complete.' });
    }
};