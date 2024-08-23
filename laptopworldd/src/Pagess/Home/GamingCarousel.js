import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GamingCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products', {
          params: {
            category: '66b13c9069c4a6802b105492' // Updated category ID
          }
        });
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + productsPerPage) % products.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - productsPerPage + products.length) % products.length
    );
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`); // Navigate to the product details page
  };

  const displayedProducts = products.slice(currentIndex, currentIndex + productsPerPage);

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-8 relative">
      <h1 className="text-3xl font-bold text-center my-8">Gaming Laptops You May Like</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex flex-wrap justify-between items-stretch gap-2 sm:gap-4">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 w-[calc(50%-4px)] sm:w-[calc(25%-12px)]"
          >
            <img
              src={`http://localhost:4000/${product.image}`} // Construct the full URL
              alt={product.name}
              className="w-full h-32 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-2 sm:p-4 flex flex-col flex-grow">
              <h2 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">{product.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{product.productCount}</p>
              <p className="text-xs text-gray-500 mb-1 sm:mb-2 hidden sm:block">{product.specs.join(' • ')}</p>
              <div className="mt-auto">
                <p className="text-xs sm:text-sm line-through text-gray-400">Starting at Rs.{product.originalPrice}</p>
                <p className="text-sm sm:text-xl font-bold mb-2 sm:mb-4">Rs.{product.currentPrice}</p>
                <button
                  onClick={() => handleViewDetails(product)}
                  className="w-full bg-white text-black border border-black py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-base hover:bg-gray-900 hover:text-white transition-colors"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={prevSlide} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
      >
        &lt;
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default GamingCarousel;
