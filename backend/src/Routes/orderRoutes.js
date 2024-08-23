// const express = require('express');
// const router = express.Router();
// const { createOrder, getOrders, updateOrder, getUserOrders } = require('../Controller/orderController');
// const authMiddleware = require('../Middleware/authMiddleware');
// const { authorizeRole } = require('../Middleware/authorizationMiddleware');

// // Route to create an order (accessible by any authenticated user)
// router.post('/create', authMiddleware, createOrder);

// // Route to get all orders (admin only)
// router.get('/', authMiddleware, authorizeRole('admin'), getOrders);

// // Route to update order status (admin only)
// router.put('/:orderId', authMiddleware, authorizeRole('admin'), updateOrder);

// // Route to get orders for the authenticated user
// router.get('/orders/me', authMiddleware, getUserOrders);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder, getUserOrders,cancelOrder } = require('../Controller/orderController');
const auth = require('../Middleware/authMiddleware');
const { authorizeRole } = require('../Middleware/authorizationMiddleware');

// Define routes
router.post('/create', auth, createOrder);
router.get('/', auth, authorizeRole('admin'), getOrders); // Admin only
router.put('/:orderId', auth, authorizeRole('admin'), updateOrder); // Update order for admin
router.get('/me', auth, getUserOrders); // Fetch orders for the logged-in user
router.delete('/:orderId', auth, cancelOrder);

module.exports = router;

