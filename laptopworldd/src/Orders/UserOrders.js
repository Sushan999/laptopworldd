import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:4000/api/orders/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(data);
    } catch (error) {
      setErrorMessage('Error fetching orders.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      setErrorMessage('Error cancelling the order.');
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product details page
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl mt-24">
      <h1 className="text-2xl font-bold text-center my-6">Your Orders</h1>
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4 w-full mt-8 p-6 border rounded-lg lg:border-2 text-gray-900">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
              <img 
                src={`http://localhost:4000/${order.product.image}`} 
                alt={order.product.name} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{order.product.name}</h2>
                <p className="text-gray-600">Rs. {order.product.currentPrice}</p>
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="text-gray-900 font-bold">Status: {order.status}</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleViewProduct(order.product._id)} // Navigate to product details
                  className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
                >
                  View Product
                </button>
                <button
                  onClick={() => handleCancelOrder(order._id)} // Cancel the order
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
