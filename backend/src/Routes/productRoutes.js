// const express = require('express');
// const { createProduct, getProducts } = require('../Controller/productController');
// const { productImage } = require('../Middleware/uploadMiddleware');
// const router = express.Router();

// // Route to create a new product
// router.post('/', productImage.single('image'), createProduct);

// // Route to get all products
// router.get('/', getProducts);

// module.exports = router;


// const express = require('express');
// const router = express.Router();

// const authMiddleware = require('../Middleware/authMiddleware');
// const { authorizeRole } = require('../Middleware/authorizationMiddleware');
// const { productImage } = require('../Middleware/uploadMiddleware');
// const {
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProduct,
//   getProducts
// } = require('../Controller/productController');

// /**
//  * @description Create a new product
//  * @route POST /api/products
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the created product
//  */
// router.post('/', authMiddleware, authorizeRole('admin'), productImage.single('productImage'), createProduct);

// /**
//  * @description Update an existing product
//  * @route PUT /api/products/:id
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the updated product
//  */
// router.patch('/:id', authMiddleware, authorizeRole('admin'), productImage.single('productImage'), updateProduct);

// /**
//  * @description Delete a product
//  * @route DELETE /api/products/:id
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object confirming deletion
//  */
// router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteProduct);

// /**
//  * @description Get a single product by ID
//  * @route GET /api/products/:id
//  * @access Public
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the product data
//  */
// router.get('/:id', getProduct);

// /**
//  * @description Get all products
//  * @route GET /api/products
//  * @access Public
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing an array of products
//  */
// router.get('/', getProducts);

// module.exports = router;

//  const express = require('express');


// const authMiddleware = require('../Middleware/authMiddleware');
// const { authorizeRole } = require('../Middleware/authorizationMiddleware');
// const { productImage } = require('../Middleware/uploadMiddleware');
// const {
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProduct,
//   getProducts
// } = require('../Controller/productController');

// /**
//  * @description Create a new product
//  * @route POST /api/products
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the created product
//  */
// router.post('/', authMiddleware, authorizeRole('admin'), productImage.single('productImage'), createProduct);

// /**
//  * @description Update an existing product
//  * @route PUT /api/products/:id
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the updated product
//  */
// router.patch('/:id', authMiddleware, authorizeRole('admin'), productImage.single('productImage'), updateProduct);

// /**
//  * @description Delete a product
//  * @route DELETE /api/products/:id
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object confirming deletion
//  */
// router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteProduct);

// /**
//  * @description Get a single product by ID
//  * @route GET /api/products/:id
//  * @access Public
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the product data
//  */
// router.get('/:id', getProduct);

// /**
//  * @description Get all products
//  * @route GET /api/products
//  * @access Public
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing an array of products
//  */
// router.get('/', getProducts);

// module.exports = router;








// const express = require('express');
// const router = express.Router();

// const authMiddleware = require('../Middleware/authMiddleware');
// const { authorizeRole } = require('../Middleware/authorizationMiddleware');
// const { productImage } = require('../Middleware/uploadMiddleware');
// const {
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProduct,
//   getProducts
// } = require('../Controller/productController');

// /**
//  * @description Create a new product
//  * @route POST /api/products
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the created product
//  */
// router.post('/', authMiddleware, authorizeRole('admin'), productImage.single('productImage'), createProduct);

// /**
//  * @description Update an existing product
//  * @route PUT /api/products/:id
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the updated product
//  */
// router.patch('/:id', authMiddleware, authorizeRole('admin'), productImage.single('productImage'), updateProduct);

// /**
//  * @description Delete a product
//  * @route DELETE /api/products/:id
//  * @access Private/Admin
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object confirming deletion
//  */
// router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteProduct);

// /**
//  * @description Get a single product by ID
//  * @route GET /api/products/:id
//  * @access Public
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing the product data
//  */
// router.get('/:id', getProduct);

// /**
//  * @description Get all products
//  * @route GET /api/products
//  * @access Public
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @returns {Object} response - The response object containing an array of products
//  */
// router.get('/', getProducts);

// module.exports = router;

const express = require('express');
const {
  createProduct,
  updateProduct,
  getProducts,
  searchProducts,
  getProduct,
  deleteProduct,
  getProductsByCategory,
} = require('../Controller/productController'); // Adjust the path if necessary

const { productImage } = require('../Middleware/uploadMiddleware'); // Adjust the path if necessary
const router = express.Router(); // Ensure this line is present
const { authorizeRole } = require('../Middleware/authorizationMiddleware');
const authMiddleware = require('../Middleware/authMiddleware');

// Route to create a new product
// router.post('/', productImage.single('image'), createProduct);

// Route to create a new product (Admin Only)
router.post('/',authMiddleware, authorizeRole('admin'), productImage.single('image'), createProduct);


// Route to update a product
router.put('/:id', productImage.single('image'), updateProduct);

// Route to get all products
router.get('/', getProducts);

// Route to search products
router.get('/search', searchProducts);

// Route to get products by category
router.get('/category/:categoryId', getProductsByCategory);

// Route to get a single product by ID
router.get('/:id', getProduct);

// Route to delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
