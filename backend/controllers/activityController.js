const Activity = require('../models/activityModel');

// @desc    Add or update a daily activity log
// @route   POST /api/activities
// @access  Private
exports.logActivity = async (req, res) => {
    const { date, calories, protein, carbs, fat, steps, water, workout } = req.body;

    // The date should be sent from the frontend as a string like "YYYY-MM-DD"
    // We'll normalize it to the start of the day to prevent timezone issues
    const activityDate = new Date(date);
    activityDate.setUTCHours(0, 0, 0, 0);

    try {
        // Find and update if an entry for this user and date already exists, otherwise create a new one
        const activity = await Activity.findOneAndUpdate(
            { user: req.user._id, date: activityDate },
            { calories, protein, carbs, fat, steps, water, workout },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(201).json(activity);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Could not log activity' });
    }
};

// @desc    Get all activities for the logged-in user
// @route   GET /api/activities
// @access  Private
exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.user._id }).sort({ date: -1 });
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};