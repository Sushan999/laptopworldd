import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    productCount: '',
    specs: '',
    originalPrice: '',
    currentPrice: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/products');
      setProducts(data);
    } catch (error) {
      setErrorMessage('Error fetching products.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
  
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      };
  
      if (editingProduct) {
        await axios.put(`http://localhost:4000/api/products/${editingProduct._id}`, form, config);
        setSuccessMessage('Product updated successfully.');
        setEditingProduct(null);
      } else {
        await axios.post('http://localhost:4000/api/products', form, config);
        setSuccessMessage('Product added successfully.');
      }
      setFormData({
        category: '',
        name: '',
        productCount: '',
        specs: '',
        originalPrice: '',
        currentPrice: '',
        image: null,
      });
      fetchProducts();
    } catch (error) {
      setErrorMessage('Error saving product.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      category: product.category,
      name: product.name,
      productCount: product.productCount,
      specs: product.specs.join(', '),
      originalPrice: product.originalPrice,
      currentPrice: product.currentPrice,
      image: null,
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      setSuccessMessage('Product deleted successfully.');
      fetchProducts();
    } catch (error) {
      setErrorMessage('Error deleting product.');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h1>
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="productCount"
          value={formData.productCount}
          onChange={handleInputChange}
          placeholder="Product Count"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="specs"
          value={formData.specs}
          onChange={handleInputChange}
          placeholder="Specifications (comma-separated)"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="originalPrice"
          value={formData.originalPrice}
          onChange={handleInputChange}
          placeholder="Original Price"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="currentPrice"
          value={formData.currentPrice}
          onChange={handleInputChange}
          placeholder="Current Price"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="border p-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Original Price</th>
            <th className="border border-gray-300 p-2">Current Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.originalPrice}</td>
              <td className="border border-gray-300 p-2">{product.currentPrice}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
