import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:4000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (error) {
      setErrorMessage('Error fetching orders.');
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/api/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Order status updated successfully.');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      setSelectedOrder(null);
      setStatus('');
    } catch (error) {
      setErrorMessage('Error updating order status.');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Orders</h1>
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-gray-200 text-green-800 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Contact no.</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-300 p-2">{order._id}</td>
              <td className="border border-gray-300 p-2">{order.product.name}</td>
              <td className="border border-gray-300 p-2">{order.user.firstName} {order.user.lastName}</td>
              <td className="border border-gray-300 p-2">{order.user.email} </td>
              <td className="border border-gray-300 p-2">{order.user.phoneNumber} </td>
              <td className="border border-gray-300 p-2">{order.user.address} </td>
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2">
                {selectedOrder === order._id ? (
                  <div>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mr-2 p-2 border rounded"
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="shipping">Shipping</option>
                      <option value="shipped">Shipped</option>
                    </select>
                    <button
                      onClick={() => handleStatusChange(order._id)}
                      className="bg-gray-700 text-white py-1 px-2 rounded hover:bg-gray-900 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedOrder(order._id)}
                    className="bg-gray-700 hover:bg-gray-900 w-20 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
