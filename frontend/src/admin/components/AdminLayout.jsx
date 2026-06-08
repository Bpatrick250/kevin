import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAdmin } from '../contexts/AdminContext';
import Swal from 'sweetalert2';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { admin, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of the admin panel.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      logout();
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/admin/login');
    }
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`admin-main ${!sidebarOpen ? 'expanded' : ''}`}>
        <AdminHeader 
          admin={admin} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={handleLogout}
        />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f3f4f6;
        }
        
        .admin-main {
          flex: 1;
          margin-left: 260px;
          transition: margin-left 0.3s ease;
        }
        
        .admin-main.expanded {
          margin-left: 70px;
        }
        
        .admin-content {
          padding: 20px;
        }
        
        @media (max-width: 768px) {
          .admin-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;