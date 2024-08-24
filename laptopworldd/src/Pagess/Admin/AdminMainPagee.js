import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMainPage = () => {
  const navigate = useNavigate();

  const handleOrdersClick = () => {
    navigate('/admin/orders');
  };

  const handleProductsClick = () => {
    navigate('/productadmin');
  };

  const handleContactClick = () => {
    navigate('/admincontact');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <div
        onClick={handleOrdersClick}
        className="cursor-pointer p-6 bg-white rounded-lg shadow-lg text-center hover:bg-gray-200 transition"
      >
        <h2 className="text-2xl font-bold text-gray-700">Orders</h2>
        <p className="text-gray-500 mt-2">Manage all orders</p>
      </div>
      <div
        onClick={handleProductsClick}
        className="cursor-pointer p-6 bg-white rounded-lg shadow-lg text-center hover:bg-gray-200 transition"
      >
        <h2 className="text-2xl font-bold text-gray-700">Products</h2>
        <p className="text-gray-500 mt-2">Manage all products</p>
      </div>
      <div
        onClick={handleContactClick}
        className="cursor-pointer p-6 bg-white rounded-lg shadow-lg text-center hover:bg-gray-200 transition"
      >
        <h2 className="text-2xl font-bold text-gray-700">Contact Messages</h2>
        <p className="text-gray-500 mt-2">View and manage contact messages</p>
      </div>
    </div>
  );
};

export default AdminMainPage;
