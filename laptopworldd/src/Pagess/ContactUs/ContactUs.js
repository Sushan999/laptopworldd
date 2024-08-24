// ContactUs.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.name) tempErrors.name = 'Name is required';
    if (!formValues.email) tempErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formValues.email)) tempErrors.email = 'Email is invalid';
    if (!formValues.message) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:4000/api/contactus', formValues);
      setResponseMessage(res.data.success);
      setFormValues({ name: '', email: '', message: '' });
    } catch (error) {
      setResponseMessage('Failed to send message');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-20">
      <h1 className="text-2xl font-bold text-center my-6 p-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full mt-12 p-6 border rounded-lg bg-white shadow-lg">
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-3 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        
        <textarea
          name="message"
          value={formValues.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full p-3 border rounded"
          rows="6"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-900"
        >
          Send Message
        </button>

        {responseMessage && <p className="text-center mt-4">{responseMessage}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
