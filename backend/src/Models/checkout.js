const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
 
  },
  cvv: {
    type: String,
    required: true,

  },
  expirationDate: {
    type: String,
    required: true
  }
}, );

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
