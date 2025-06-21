const express = require('express');
const router = express.Router();

const { getUserProfile, completeTask } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
 
router.get('/profile', protect, getUserProfile);
 
router.post('/tasks/complete', protect, completeTask);


module.exports = router;