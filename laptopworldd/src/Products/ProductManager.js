import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    categoryId: '',
    name: '',
    productCount: '',
    specs: '',
    originalPrice: '',
    currentPrice: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const categoryOptions = [
    { id: '66b13c6d69c4a6802b105486', name: 'Notebook' },
    { id: '66b13c7a69c4a6802b10548a', name: 'Ultrabook' },
    { id: '66b13c8369c4a6802b10548e', name: 'Macbook' },
    { id: '66b13c9069c4a6802b105492', name: 'Gaming Laptops' },
    { id: '66b13c9769c4a6802b105496', name: 'Top Selling' },
  ];

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
    if (name === 'category') {
      const selectedCategory = categoryOptions.find(cat => cat.name === value);
      setFormData(prev => {
        const newState = {
          ...prev,
          category: selectedCategory ? selectedCategory.id : '',
          categoryId: selectedCategory ? selectedCategory.id : ''
        };
        console.log('Updated form data:', newState);
        return newState;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

    console.log('Form data being sent:', Object.fromEntries(form));

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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
        categoryId: '',
        name: '',
        productCount: '',
        specs: '',
        originalPrice: '',
        currentPrice: '',
        image: null,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setErrorMessage('Error saving product.');
    }
  };

  const handleEdit = (product) => {
    const category = categoryOptions.find(cat => cat.id === product.categoryId);
    setEditingProduct(product);
    setFormData({
      category: category ? category.id : '',
      categoryId: product.categoryId,
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
      <h1 className="text-2xl font-bold mb-4 text-center">{editingProduct ? 'Edit Product' : 'Add Product'}</h1>
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
      <form onSubmit={handleSubmit} className="mb-8">
        <select
          name="category"
          value={categoryOptions.find(cat => cat.id === formData.category)?.name || ''}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Category</option>
          {categoryOptions.map(option => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
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
          className="bg-gray-700  hover:bg-gray-900 text-white px-4 py-2 rounded"
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
                  className="bg-gray-700 hover:bg-gray-900 w-20 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-700 hover:bg-red-900 w-20 text-white px-2 py-1 rounded"
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