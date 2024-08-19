const Cart = require('../Models/cart');
const Product = require('../Models/productModel');

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const userId = req.user.id;

        // Find or create a cart for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [], totalPrice: 0 });
        }

        // Check if product is already in the cart
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (existingProductIndex > -1) {
            // Update quantity
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Add new product
            cart.products.push({ product: productId, quantity });
        }

        // Calculate total price
        const products = await Product.find({ _id: { $in: cart.products.map(p => p.product) } });
        const totalPrice = cart.products.reduce((total, item) => {
            const product = products.find(p => p._id.toString() === item.product.toString());
            return total + (product.currentPrice * item.quantity);
        }, 0);

        cart.totalPrice = totalPrice;

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const userId = req.user.id;

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const userId = req.user.id;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // Find the index of the product to remove
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Recalculate total price
        const products = await Product.find({ _id: { $in: cart.products.map(p => p.product) } });
        const totalPrice = cart.products.reduce((total, item) => {
            const product = products.find(p => p._id.toString() === item.product.toString());
            return total + (product.currentPrice * item.quantity);
        }, 0);

        cart.totalPrice = totalPrice;

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
