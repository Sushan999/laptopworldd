const express = require('express');
const router = express.Router();
const { submitContactUs, getContactMessages } = require('../Controller/contactUsController');
const { authorizeRole } = require('../Middleware/authorizationMiddleware');
const auth = require('../Middleware/authMiddleware');

// Route to submit contact form (open to all users)
router.post('/contactus', submitContactUs);

// Route to get contact messages (admin only)
router.get('/messages', auth, authorizeRole('admin'), getContactMessages);

module.exports = router;
