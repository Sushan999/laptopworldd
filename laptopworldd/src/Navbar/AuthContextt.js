// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const profileRes = await axios.get('http://localhost:4000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${res.data.token}`,
        },
      });
      setUser(profileRes.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
