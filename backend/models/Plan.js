const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
     planName: {
        type: String,
        required: [true, 'Please provide a name for the plan'],
        trim: true,  
        default: `My Fitness Plan`
    },
     generationParams: {
        type: Object,
        required: true,
    },
     workoutPlan: {
        type: Object,
        required: true,
    },
     nutritionPlan: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true 
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;