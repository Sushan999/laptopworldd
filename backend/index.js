const express = require('express');
const connectDB = require("./src/Config/db");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProfileRoutes = require('./src/Routes/ProfileRoutes');
const categoryRoutes=require('./src/Routes/categoryRoutes');
const productRoutes = require('./src/Routes/productRoutes');
const path = require('path');
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


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));