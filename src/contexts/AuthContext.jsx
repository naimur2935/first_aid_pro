import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount based on email in localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const savedEmail = localStorage.getItem('user_email');
      if (savedEmail) {
        try {
          const res = await axiosPublic.get(`/users/${savedEmail}`);
          if (res?.data?._id) {
            setUser(res.data);
          } else {
            setUser(null);
            localStorage.removeItem('user_email');
          }
        } catch (err) {
          console.error('Error fetching user:', err);
          setUser(null);
          localStorage.removeItem('user_email');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axiosPublic.get(`/users/${email}`);
      if (res?.data?._id) {
        if (res.data.password === password) {
          setUser(res.data);
          localStorage.setItem('user_email', res.data.email);
          return { success: true };
        } else {
          return { success: false, error: 'Invalid credentials' };
        }
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Login failed' };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axiosPublic.post('/users', { ...userData, role: 'user' });
      if (res?.data?.insertedId) {
        const loginStatus = await login(userData.email, userData.password);
        if (!loginStatus.success) return { success: false, error: 'Registration failed' };
        return { success: true };
      } else if (res?.data?._id) {
        return login(userData.email, userData.password);
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Registration failed' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_email');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
