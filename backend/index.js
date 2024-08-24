const express = require('express');
const connectDB = require("./src/Config/db");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProfileRoutes = require('./src/Routes/ProfileRoutes');
const categoryRoutes=require('./src/Routes/categoryRoutes');
const productRoutes = require('./src/Routes/productRoutes');
const checkoutRoutes = require('./src/Routes/checkoutRoutes');
const orderRoutes = require('./src/Routes/orderRoutes');
const cartRoutes = require('./src/Routes/cartRoutes');
const path = require('path');
const auth = require('./src/Middleware/authMiddleware');
const authMiddleware = require('./src/Middleware/authMiddleware');
const contactUsRoutes = require('./src/Routes/contactUsRoutes');
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', require('./src/Routes/authRoute'));

app.use('/api/profile', ProfileRoutes);
app.use('/api/category',categoryRoutes) 
app.use('/api/products', productRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', contactUsRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));