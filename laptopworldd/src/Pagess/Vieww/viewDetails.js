import React from 'react';

const ViewDetails = ({ product, onBack }) => {
    if (!product) return null;

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-100 shadow-2xl rounded-lg">
            <div className="relative mb-8">
                <button onClick={onBack} className="absolute left-0 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300">
                    Back
                </button>
                <h1 className="text-4xl font-bold text-gray-900 text-center">{product.name}</h1>
            </div>
            <div className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md">
                <div className="w-full md:w-1/2 p-4">
                    <img src={`http://localhost:4000/${product.image}`} alt={product.name} className="mx-auto rounded-lg"/>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Specifications</h2>
                        <ul className="list-none space-y-2 text-gray-700">
                            {product.specs.map((spec, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-gray-600 mr-2">•</span>
                                    {spec}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <p className="text-lg font-semibold text-gray-800">Expected Delivery:</p>
                            <p><span className="text-gray-700 font-medium">2 working days</span> inside Kathmandu Valley</p>
                            <p><span className="text-gray-700 font-medium">3-5 working days</span> outside the valley</p>
                            <p className="text-gray-800 font-medium">Free Cash on Delivery all over Nepal</p>
                        </div>
                        <div className="mt-8">
                            <span className="text-4xl font-bold text-gray-900">Rs.{product.currentPrice}</span>
                            {product.originalPrice && (
                                <span className="ml-3 text-lg text-gray-600 line-through">Rs.{product.originalPrice}</span>
                            )}
                        </div>
                        <button className="mt-6 w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
