// const express = require("express");
// const router = express.Router();
// const auth = require("../Middleware/authMiddleware");
// const { addCategory, updateCategory, getCategories } = require("../Controller/categoryController");
// const { authorizeRole } = require("../Middleware/authorizationMiddleware");

// /**
//  * @description To create a new category
//  * @api /api/category/create
//  * @access Private
//  * @type POST
//  * @return response
//  */
// router.post("/create", auth, authorizeRole("admin"), addCategory);

// /**
//  * @description To update a category by id
//  * @api /api/category/update/:id
//  * @access Private
//  * @type PATCH
//  * @return response
//  */
// router.patch("/update/:id", auth, authorizeRole('admin'), updateCategory);

// /**
//  * @description To get all categories
//  * @api /api/category
//  * @access Public
//  * @type GET
//  * @return response
//  */
// router.get("/", getCategories);

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const { authorizeRole } = require("../Middleware/authorizationMiddleware");
const { addCategory,updateCategory } = require("../Controller/categoryController");

// /
 
// @description To get all categories
// @api /api/category/create
// @access Private
// @type POST
// @return response
// */

router.post("/create", auth, authorizeRole("admin"), addCategory);

// /
 
// @description To update categories by id
// @api /api/category/update/:id
// @access Private
// @type PUT
// @return response
// */
router.patch("/update/:id", auth, authorizeRole('admin'), updateCategory);

module.exports = router;
