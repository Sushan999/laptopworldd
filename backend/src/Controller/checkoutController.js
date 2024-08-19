// controllers/checkoutController.js
const Checkout = require('../Models/checkout');
const Product = require('../Models/productModel');
const User = require('../Models/User');

const createCheckout = async (req, res) => {
  try {
    // Extract data from the request body
    const { product, fullName, cardNumber, cvv, expirationDate } = req.body;
    const userId = req.user.id;

    // Create a new checkout entry
    const checkout = new Checkout({
      user: userId,
      product,
      fullName,
      cardNumber,
      cvv,
      expirationDate
    });

    // Save the checkout entry to the database
    await checkout.save();

    // Respond with the created checkout
    res.status(201).json({
      message: 'Checkout created successfully',
      checkout
    });
  } catch (error) {
    // Handle any errors
    console.error('Error creating checkout:', error);
    res.status(500).json({
      message: 'Error creating checkout',
      error: error.message
    });
  }
};

module.exports = {
  createCheckout
};