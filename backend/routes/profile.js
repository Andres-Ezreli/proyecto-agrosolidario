const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');

// Get user profile
router.get('/me', protect, getUserProfile);

// Update user profile
router.put('/update', protect, updateUserProfile);

module.exports = router;
