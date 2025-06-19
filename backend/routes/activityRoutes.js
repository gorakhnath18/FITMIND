const express = require('express');
const router = express.Router();
const { logActivity, getActivities } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

// All routes in this file will be protected
router.route('/')
    .post(protect, logActivity)  // POST to /api/activities
    .get(protect, getActivities); // GET to /api/activities

module.exports = router;