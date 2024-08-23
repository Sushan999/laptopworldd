
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import AboutComponent from "./components/About/aboutComponent";
import HomeComponent from "./components/Home/homeComponent";
import ShopComponent from "./components/Shop/shopComponent";
import ProductComponent from "./components/Product/ProductComponent";
import ContactComponent from "./components/Contact/ContactComponent";
import RegistrationForm from "./components/Register/RegisterComponent";
import CategoryComponent from "./components/Category/CategoryComponent";
import AddProductComponent from "./components/AddProduct/AddProductComponent";
import ProtectedRoute from "./ProtectedRoutes/protectedRoute";
import LoginComponent from "./components/Login/LoginComponen";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/about" element={<AboutComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginComponent/>} />

            <Route 
              path="/shop" 
              element={
                <ProtectedRoute>
                  <ShopComponent />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/product" 
              element={
                <ProtectedRoute>
                  <ProductComponent />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/category" 
              element={
                <ProtectedRoute role="admin">
                  <CategoryComponent />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/addproduct" 
              element={
                <ProtectedRoute role="admin">
                  <AddProductComponent />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
