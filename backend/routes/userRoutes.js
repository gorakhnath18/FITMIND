const express = require('express');
const router = express.Router();

const { 
    getUserProfile, 
    completeTask,
    markDayAsComplete 
} = require('../controllers/userController');

 const { protect } = require('../middleware/authMiddleware');
 
 router.get('/profile', protect, getUserProfile);
router.post('/tasks/complete', protect, completeTask);

 router.post('/progress/mark-day-complete', protect, markDayAsComplete);
 
module.exports = router;