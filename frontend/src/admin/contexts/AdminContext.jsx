import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminAuth } from '../services/adminApi';
import Swal from 'sweetalert2';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) {
      loadAdmin();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadAdmin = async () => {
    try {
      const response = await adminAuth.getMe();
      setAdmin(response.data.data);
    } catch (error) {
      console.error('Failed to load admin:', error);
      localStorage.removeItem('adminToken');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await adminAuth.login(credentials);
      const { token, admin: adminData } = response.data.data;
      localStorage.setItem('adminToken', token);
      setToken(token);
      setAdmin(adminData);
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `Hello ${adminData.name}, you have successfully logged in.`,
        timer: 2000,
        showConfirmButton: false,
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials',
      });
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      await adminAuth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      setToken(null);
      setAdmin(null);
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const changePassword = async (data) => {
    try {
      await adminAuth.changePassword(data);
      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been updated successfully.',
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response?.data?.message || 'Failed to change password',
      });
      return { success: false };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        changePassword,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};