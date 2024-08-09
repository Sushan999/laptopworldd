const express = require('express');
const router = express.Router();
const { register,login,getUserProfile } = require('../Controller/authController');
const auth = require("../Middleware/authMiddleware");


router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getUserProfile);

module.exports = router;
