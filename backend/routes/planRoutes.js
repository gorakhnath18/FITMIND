 const express = require('express');
const router = express.Router();

// Import the controller functions we just created.
const { 
    savePlan, 
    getSavedPlans, 
    deletePlan 
} = require('../controllers/planController');

 const { protect } = require('../middleware/authMiddleware');

 router.route('/')
    .post(protect, savePlan)  
    .get(protect, getSavedPlans); 


router.route('/:id')
     .delete(protect, deletePlan); 

module.exports = router;