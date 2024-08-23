import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ultrabook = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products', {
          params: {
            category: '66b13c7a69c4a6802b10548a' // UltraBooks category ID
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`); // Use navigate to transition to the details page
  };

  return (
    <div className="container mx-auto px-4 mt-24">
      <h1 className="text-3xl font-bold text-center my-8">UltraBooks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-110"
          >
            <img
              src={`http://localhost:4000/${product.image}`} // Construct the full URL
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.productCount}</p>
              <p className="text-xs text-gray-500 mb-2">{product.specs.join(' • ')}</p>
              <div className="mt-auto">
                <p className="text-sm line-through text-gray-400">Starting at Rs.{product.originalPrice}</p>
                <p className="text-xl font-bold mb-4">Rs.{product.currentPrice}</p>
                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="w-full bg-white text-black border border-black py-2 px-4 rounded hover:bg-gray-900 hover:text-white transition-colors"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ultrabook;
