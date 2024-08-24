import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.firstName) tempErrors.firstName = "First name is required";
    if (!formValues.lastName) tempErrors.lastName = "Last name is required";
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formValues.phoneNumber) tempErrors.phoneNumber = "Phone number is required";
    if (!formValues.address) tempErrors.address = "Address is required";
    if (!formValues.password) tempErrors.password = "Password is required";
    if (formValues.password !== formValues.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', formValues);
      console.log(res.data);
      setErrors({});
      setIsModalOpen(true);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setErrors({ general: error.response.data.msg || 'An error occurred' });
      } else if (error.request) {
        console.error('Error request:', error.request);
        setErrors({ general: 'No response received from server' });
      } else {
        console.error('Error message:', error.message);
        setErrors({ general: 'Request setup error' });
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/signin');
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-24">
      <h1 className="text-2xl font-bold text-center my-6">Register</h1>
      <form onSubmit={onSubmit} className="space-y-4 w-full mt-8 p-6 border rounded-lg lg:border-2 text-gray-900">
        <input
          type="text"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

        <input
          type="text"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="tel"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

        <input
          type="text"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="subscribe"
            className="mr-2"
          />
          <label htmlFor="subscribe" className="text-sm">
            Subscribe for exclusive e-mail deals and discounts
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
        >
          Create an Account
        </button>
      </form>

      {errors.general && <p className="text-red-500 text-sm text-center mt-2">{errors.general}</p>}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="text-gray-900 text-lg font-semibold">Registration successful!</p>
        <p className="mt-2">Click 'Close' to proceed to sign in.</p>
      </Modal>

      <p className="text-sm text-center mt-4">
        By creating an account, you agree to LaptopWorld's Privacy Policy and Terms of Use
      </p>

      <div className="text-center mt-3">
        <Link to="/signin" className="text-blue-600 hover:underline">← Back</Link>
      </div>

      <div className="mt-2">
        <p className="text-center font-semibold">Or Sign In With</p>
        <div className="flex justify-center flex-wrap space-x-2 mt-2">
          <button className="border px-4 py-2 rounded">Facebook</button>
          <button className="border px-4 py-2 rounded">Google</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
