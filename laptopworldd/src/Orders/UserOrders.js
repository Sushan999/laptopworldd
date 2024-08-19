import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Product Price</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="border border-gray-300 p-2">{order._id}</td>
               
                <td className="border border-gray-300 p-2">{order.product.name}</td>
                <td className="border border-gray-300 p-2">Rs. {order.product.currentPrice}</td> {/* Display price as string */}
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => viewOrderDetails(order._id)}
                    className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const viewOrderDetails = (orderId) => {
  // Navigate to order details page
  window.location.href = `/orders/${orderId}`;
};

export default UserOrders;
