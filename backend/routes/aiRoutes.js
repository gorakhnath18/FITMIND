const express = require('express');
const router = express.Router();
const { generatePlan } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generatePlan);

module.exports = router;