import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewDetails = ({ product, onBack }) => {
    const navigate = useNavigate();

    if (!product) return null;

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found. Redirecting to login.');
            navigate('/signin'); // Redirect to login page if not logged in
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:4000/api/cart/add',
                { productId: product._id, quantity: 1 }, // Adding 1 item to the cart by default
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Optionally show a success message
                console.log('Product added to cart');
                navigate('/cart'); // Navigate to cart page after adding to cart
            } else {
                // Optionally handle unexpected response status
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error.response?.data || error.message);
            // Optionally show an error message to the user
        }
    };

    const handleBuyNow = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found. Redirecting to login.');
            navigate('/signin'); // Redirect to login page if not logged in
            return;
        }

        navigate(`/checkout/${product._id}`); // Navigate to checkout page with productId
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-100 shadow-2xl rounded-lg">
            <div className="relative mb-8">
                <button 
                    onClick={onBack} 
                    className="absolute left-0 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300"
                >
                    Back
                </button>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">{product.name}</h1>
            </div>
            <div className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md">
                <div className="w-full md:w-1/2 p-4">
                    <img 
                        src={`http://localhost:4000/${product.image}`} 
                        alt={product.name} 
                        className="mx-auto rounded-lg max-h-72 md:max-h-96 object-contain"
                    />
                </div>
                <div className="w-full md:w-1/2 p-4 md:p-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Key Specifications</h2>
                        <ul className="list-none space-y-2 text-gray-700">
                            {product.specs.map((spec, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-gray-600 mr-2">•</span>
                                    {spec}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 md:mt-8">
                            <p className="text-lg font-semibold text-gray-800">Expected Delivery:</p>
                            <p><span className="text-gray-700 font-medium">2 working days</span> inside Kathmandu Valley</p>
                            <p><span className="text-gray-700 font-medium">3-5 working days</span> outside the valley</p>
                            <p className="text-gray-800 font-medium">Free Cash on Delivery all over Nepal</p>
                        </div>
                        <div className="mt-6 md:mt-8">
                            <span className="text-3xl md:text-4xl font-bold text-gray-900">Rs.{product.currentPrice}</span>
                            {product.originalPrice && (
                                <span className="ml-3 text-lg text-gray-600 line-through">Rs.{product.originalPrice}</span>
                            )}
                        </div>
                        <button 
                            onClick={handleAddToCart} 
                            className="mt-6 w-full bg-gray-800 text-white px-4 md:px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
                        >
                            Add to Cart
                        </button>   
                        <button 
                            onClick={handleBuyNow} 
                            className="mt-6 w-full bg-red-800 text-white px-4 md:px-6 py-3 rounded-lg hover:bg-red-900 transition duration-300"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
