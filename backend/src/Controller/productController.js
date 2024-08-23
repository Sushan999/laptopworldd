// const Product = require('../Models/productModel');

// // Function to create a new product
// const createProduct = async (req, res) => {
//   try {
//     const { category,name, productCount, specs, originalPrice, currentPrice } = req.body;
//     const image = req.file ? `uploads/products/${req.file.filename}` : null;

//     const newProduct = new Product({
//       category,
//       name,
//       productCount,
//       specs,
//       originalPrice,
//       currentPrice,
//       image
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// module.exports = { createProduct };



// const sendErrorResponse = (res, error) => {
//   console.log(error);
//   res.status(500).json({ msg: error.message });
// };

// const createProduct = async (req, res) => {
//   try {
//     const {
//       category,
//       name,
//       productCount,
//       specs,
//       originalPrice,
//       currentPrice
//     } = req.body;

//     let productData = {
//       category,
//       name,
//       productCount,
//       specs,
//       originalPrice,
//       currentPrice
//     };

//     if (req.file) {
//       const image = `uploads/products/${req.file.filename}`;
//       productData.image = image;
//     }

//     const product = new Product(productData);
//     await product.save();

//     res.status(201).json({
//       msg: "Product created successfully",
//       product: product,
//       success: true,
//     });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };




// // Function to get all products
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch all products from the database
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { createProduct, getProducts };


// const Product = require("../Models/productModel");
// const domain = "http://localhost:4000";

// // Helper function to send error responses
// const sendErrorResponse = (res, error) => {
//   console.log(error);
//   res.status(500).json({ msg: error.message });
// };

// // Create a new product (Admin Only)
// const createProduct = async (req, res) => {
//     try {
//       const {
//         category,
//         name,
//         productCount,
//         specs,
//         originalPrice,
//         currentPrice
//       } = req.body;
  
//       let productData = {
//         category,
//         name,
//         productCount,
//         specs,
//         originalPrice,
//         currentPrice
//       };
  
//       if (req.file) {
//         const image = req.file ? `uploads/products/${req.file.filename}` : null;
//         productData.image = image;
//       }
  
//       const product = new Product(productData);
//       await product.save();
  
//       res.status(201).json({
//         msg: "Product created successfully",
//         product: product,
//         success: true,
//       });
//     } catch (error) {
//       sendErrorResponse(res, error);
//     }
//   };
// // Update a product (Admin Only)
// const updateProduct = async (req, res) => {
//   try {
//     const {
//       category,
//       name,
//       productCount,
//       specs,
//       originalPrice,
//       currentPrice,
//       image
// ,
//     } = req.body;
//     let updateData = {
//       category,
//       name,
//       productCount,
//       specs,
//       originalPrice,
//       currentPrice,
//       image
//     };

//     if (req.file) {
//       const image = req.file ? `uploads/products/${req.file.filename}` : null;
//       updateData.productImage = productImage;
//     }

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     res.status(200).json({
//       msg: "Product updated successfully",
//       product: product,
//       success: true,
//     });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

// // // Get all products (Public) ////////------------Search
// const getProducts = async (req, res) => {
//   const { search, sort } = req.query;
//   let query = {};
//   if (search) {
//     query.name = { $regex: search, $options: "i" };
//   }

//   let products = await Product.find(query);

//   if (sort) {
//     const sortOrder = sort === "asc" ? 1 : -1;
//     products = products.sort((a, b) => (a.price - b.price) * sortOrder);
//   }

//   res.json(products);
// };

// // Get all products (Public) ////////------------Search
// const searchProducts = async (req, res) => {
//   const { search, sort } = req.query;
//   let query = {};
//   if (search) {
//     query.name = { $regex: search, $options: "i" };
//   }

//   let products = await Product.find(query);

//   if (sort) {
//     const sortOrder = sort === "asc" ? 1 : -1;
//     products = products.sort((a, b) => (a.price - b.price) * sortOrder);
//   }

//   res.json(products);
// };

// // Get all products (Public) and filter by category
// const getProductsByCategory = async (req, res) => {
//   try {
//     const products = await Product.find({ category: req.params.categoryId });
//     res.status(200).json(products);
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

// // Get a single product by ID (Public)
// const getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

// // Delete a product (Admin Only)
// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     res
//       .status(200)
//       .json({ msg: "Product deleted successfully", success: true });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

// module.exports = {
//   createProduct,
//   updateProduct,
//   getProducts,
//   searchProducts,
//   getProduct,
//   deleteProduct,
// };


const Product = require("../Models/productModel");
const domain = "http://localhost:4000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new product (Admin Only)
const createProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      productCount,
      specs,
      originalPrice,
      currentPrice,
      image

    } = req.body;
    let productData = {
      category,
      name,
      productCount,
      specs,
      originalPrice,
      currentPrice,
      image
    };

    if (req.file) {
      const image = req.file ? `uploads/products/${req.file.filename}` : null;
      productData.image =image;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      msg: "Product created successfully",
      product: product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a product (Admin Only)
const updateProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      price,
      description,
      brand,
      rating,
      numReviews,
      countInStock,
    } = req.body;
    let updateData = {
      category,
      name,
      price,
      description,
      brand,
      rating,
      numReviews,
      countInStock,
    };

    if (req.file) {
      const image = req.file ? `uploads/products/${req.file.filename}` : null;
      updateData.image = image;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({
      msg: "Product updated successfully",
      product: product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// // Get all products (Public) ////////------------Search
// const getProducts = async (req, res) => {
//   const { search, sort } = req.query;
//   let query = {};
//   if (search) {
//     query.name = { $regex: search, $options: "i" };
//   }

//   let products = await Product.find(query);

//   if (sort) {
//     const sortOrder = sort === "asc" ? 1 : -1;
//     products = products.sort((a, b) => (a.price - b.price) * sortOrder);
//   }

//   res.json(products);
// };

// Get all products (Public) and filter by category
const getProducts = async (req, res) => {
  try {
    const { search, sort, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    let products = await Product.find(query);

    if (sort) {
      const sortOrder = sort === "asc" ? 1 : -1;
      products = products.sort((a, b) => (a.price - b.price) * sortOrder);
    }

    res.json(products);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};




// Get all products (Public) ////////------------Search
const searchProducts = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let products = await Product.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    products = products.sort((a, b) => (a.price - b.price) * sortOrder);
  }

  res.json(products);
};

// Get all products (Public) and filter by category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.status(200).json(products);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get a single product by ID (Public)
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a product (Admin Only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res
      .status(200)
      .json({ msg: "Product deleted successfully", success: true });
  } catch (error) {
    sendErrorResponse(res, error);
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
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the order status to 'canceled'
    order.status = 'canceled';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error('Error canceling the order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  searchProducts,
  getProduct,
  deleteProduct,
  getProductsByCategory,
  
};