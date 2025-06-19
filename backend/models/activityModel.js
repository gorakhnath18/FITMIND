const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    // Link this activity to a specific user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This links to our 'User' model
    },
    // The date this activity is for
    date: {
        type: Date,
        required: true,
    },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    steps: { type: Number, default: 0 },
    water: { type: Number, default: 0 }, // in glasses
    workout: { type: Number, default: 0 }, // in minutes
}, { timestamps: true });

// Ensure a user can only have one activity entry per day
activitySchema.index({ user: 1, date: 1 }, { unique: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;