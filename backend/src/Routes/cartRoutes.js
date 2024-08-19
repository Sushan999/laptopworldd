const express = require('express');
const router = express.Router();
const auth = require('../Middleware/authMiddleware');
const {addToCart,getCart,removeFromCart} = require('../Controller/cartController');

// Route to add a product to the cart
router.post('/add', auth, addToCart);

// Route to get the user's cart
router.get('/', auth, getCart);

router.delete('/remove/:productId', auth, removeFromCart);
module.exports = router;