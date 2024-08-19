import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <button 
          onClick={onClose} 
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please log in to access Cart.');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:4000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError(error.response ? error.response.data.msg : 'Error fetching cart');
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      await axios.delete(`http://localhost:4000/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter(item => item.product._id !== productId)
      }));

      setModalMessage('Item removed from cart successfully!');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError(error.response ? error.response.data.msg : 'Error removing item from cart');
    }
  };

  const handleBuy = (productId) => {
    navigate(`/checkout/${productId}`);  // Navigate to CheckoutComponent with productId
  };

  if (loading) return <div className="text-center mt-24">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-24">{error}</div>;

  return (
    <div className="container mx-auto px-4 max-w-6xl mt-24">
      <h1 className="text-2xl font-bold text-center my-6">My Cart</h1>
      {cart && cart.products.length > 0 ? (
        <div className="space-y-4 w-full mt-8 p-6 border rounded-lg lg:border-2 text-gray-900">
          {cart.products.map((item) => (
            <div key={item.product._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
              <img 
                src={`http://localhost:4000/${item.product.image}`} 
                alt={item.product.name} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{item.product.name}</h2>
                <p className="text-gray-600">Rs.{item.product.currentPrice}</p>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => handleBuy(item.product._id)}
                  className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
                >
                  Buy
                </button>
                <button 
                  onClick={() => handleRemove(item.product._id)}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">Your cart is empty.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-gray-900 text-lg font-semibold">{modalMessage}</p>
      </Modal>

      <div className="text-center mt-6 space-y-4">
       
        <button
          onClick={() => navigate('/userorders')}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          My Orders
        </button>
        <Link to="/" className="text-gray-600 hover:underline block">← Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;
