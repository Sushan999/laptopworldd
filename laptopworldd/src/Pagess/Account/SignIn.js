import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [user, setUser] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:4000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setUser(res.data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          localStorage.removeItem('token');
        }
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formValues.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formValues);
      localStorage.setItem('token', res.data.token);
      const profileRes = await axios.get('http://localhost:4000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${res.data.token}`,
        },
      });
      setUser(profileRes.data);
      console.log('User Role:', profileRes.data.role); // Log user role here
      setModalMessage('Login successful!');
      setIsModalOpen(true);

      // Redirect to home after 3 seconds if not manually closed
      setRedirectTimeout(setTimeout(() => {
        navigate('/');
      }, 3000));
    } catch (error) {
      setServerError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/account'); // Redirect to the account page after logout
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    clearTimeout(redirectTimeout); // Clear timeout if modal is closed manually
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-20">
      {!user ? (
        <>
          <h1 className="text-2xl font-bold text-center my-6 p-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-6 w-full mt-12 p-6 border rounded-lg bg-white shadow-lg">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember Me
                </label>
              </div>
              
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
            >
              Sign In
            </button>
          </form>
          
          {serverError && <p className="text-red-500 text-sm text-center mt-2">{serverError}</p>}

          <p className="text-sm text-center mt-4">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
          </p>
          
          <div className="mt-6">
            <p className="text-center font-semibold">Or Sign In With</p>
            <div className="flex justify-center flex-wrap space-x-2 mt-2">
              <button className="border px-4 py-2 rounded">Facebook</button>
              <button className="border px-4 py-2 rounded">Google</button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full p-6 border rounded-lg bg-white shadow-lg mt-48">
          <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
          <div className="space-y-4">
            <p className="text-lg"><strong>First Name:</strong> {user.firstName}</p>
            <p className="text-lg"><strong>Last Name:</strong> {user.lastName}</p>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg"><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p className="text-lg"><strong>Role:</strong> {user.role}</p> {/* Display role */}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <p className="text-gray-900 text-lg font-semibold">{modalMessage}</p>
        <button
          onClick={handleModalClose}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

export default SignIn;
