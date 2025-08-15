const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Generate response
router.post('/message', chatController.generateResponse);

module.exports = router;