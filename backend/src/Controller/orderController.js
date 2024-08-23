const Order = require('../Models/order');

// Create an order (accessible by any authenticated user)
exports.createOrder = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const newOrder = new Order({
      user: userId,
      product: productId,
      status: 'pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Get all orders (admin only)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product user');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Update order status (admin only)
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Check if the status is valid
    const validStatuses = ['pending','shipping', 'shipped'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

// Get orders for the authenticated user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Use authenticated user's ID
    const orders = await Order.find({ user: userId }).populate('product'); // Fetch orders for the user
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order belongs to the authenticated user
    if (order.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the order status to 'canceled'
    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling the order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  

