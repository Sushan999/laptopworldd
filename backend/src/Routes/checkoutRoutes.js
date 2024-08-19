const express = require('express');
const router = express.Router();
const { createCheckout } = require('../Controller/checkoutController'); // Adjust the path as needed
const authenticate = require('../Middleware/authMiddleware'); // Adjust the path as needed

router.post('/checkout', authenticate, createCheckout);

module.exports = router;
