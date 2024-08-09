// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




import GamingLaptops from './Pagess/Categories/GamingLaptops';
import Account from './Pagess/Account/Account';
import Cart from './Pagess/Cart/Cart';
import Navbar from './Navbar/Navbar';

import SignIn from './Pagess/Account/SignIn';
import Register from './Pagess/Account/Register';

import Home from './Pagess/Home/Home';
import Notebook from './Pagess/Categories/Notebook';
import Ultrabook from './Pagess/Categories/Ultrabook';
import Macbook from './Pagess/Categories/Macbook';
import TopSelling from './Pagess/Categories/TopSelling';
import ProductManager from './Products/ProductManager';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/ultrabook" element={<Ultrabook />} />
        <Route path="/macbook" element={<Macbook />} />
        <Route path="/gaming-laptops" element={<GamingLaptops/>} />
        <Route path="/topselling" element={<TopSelling />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<ProductManager />} />
      </Routes>
    </Router>
  );
}

export default App;
