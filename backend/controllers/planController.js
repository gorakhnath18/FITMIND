 const Plan = require('../models/Plan');
exports.savePlan = async (req, res) => {
     const { planName, generationParams, workoutPlan, nutritionPlan } = req.body;

     if (!planName || !generationParams || !workoutPlan || !nutritionPlan) {
        return res.status(400).json({ message: 'Missing required plan data.' });
    }

    try {
        const newPlan = new Plan({
            user: req.user._id, 
            planName,
            generationParams,
            workoutPlan,
            nutritionPlan
        });

        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);  
    } catch (error) {
        console.error("Error saving plan:", error);
        res.status(500).json({ message: 'Server error while saving plan' });
    }
};

exports.getSavedPlans = async (req, res) => {
    try {
          const plans = await Plan.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ message: 'Server error while fetching plans' });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

         if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

         if (plan.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this plan' });
        }

         await plan.deleteOne();  

        res.status(200).json({ message: 'Plan removed successfully' });
    } catch (error) {
        console.error("Error deleting plan:", error);
        res.status(500).json({ message: 'Server error while deleting plan' });
    }
};

 