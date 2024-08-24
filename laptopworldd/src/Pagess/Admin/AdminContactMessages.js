import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:4000/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data);
    } catch (error) {
      setErrorMessage('Error fetching messages.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-4 mt-16">Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Contact Messages</h1>
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Message List</h2>
      {messages.length === 0 ? (
        <p>No messages available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td className="border border-gray-300 p-2">{message.name}</td>
                <td className="border border-gray-300 p-2">{message.email}</td>
                <td className="border border-gray-300 p-2">{message.message}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(message.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContactMessages;