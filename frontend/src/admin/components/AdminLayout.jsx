import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAdmin } from '../contexts/AdminContext';
import Swal from 'sweetalert2';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { admin, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeMobileSidebar = () => {
    setSidebarOpen(false);
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile}
        onToggle={toggleSidebar}
        onMobileClose={closeMobileSidebar}
      />
      <div className={`admin-main ${!isMobile ? 'desktop' : ''}`}>
        <AdminHeader 
          admin={admin} 
          onMenuClick={toggleSidebar} 
          onLogout={handleLogout}
          isMobile={isMobile}
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
        
        /* Desktop Sidebar */
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #0a2a1a 0%, #06122a 100%);
          color: white;
          transition: all 0.3s ease;
          z-index: 100;
          display: flex;
          flex-direction: column;
        }
        
        .admin-sidebar.collapsed {
          width: 70px;
        }
        
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .sidebar-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        
        .sidebar-brand-text {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .collapse-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .collapse-btn:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .admin-sidebar.collapsed .sidebar-brand-text,
        .admin-sidebar.collapsed .sidebar-link span {
          display: none;
        }
        
        .admin-sidebar.collapsed .sidebar-header {
          justify-content: center;
        }
        
        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
        }
        
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          color: #d1d5db;
          text-decoration: none;
          transition: all 0.3s ease;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        
        .sidebar-link:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        
        .sidebar-link.active {
          background: linear-gradient(90deg, #22c55e, #16a34a);
          color: white;
        }
        
        .sidebar-footer {
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        /* Main Content */
        .admin-main {
          flex: 1;
          margin-left: 260px;
          transition: margin-left 0.3s ease;
          width: calc(100% - 260px);
        }
        
        .admin-main.desktop {
          margin-left: 260px;
        }
        
        .admin-sidebar.collapsed ~ .admin-main {
          margin-left: 70px;
          width: calc(100% - 70px);
        }
        
        .admin-content {
          padding: 20px;
        }
        
        /* Mobile Sidebar */
        .mobile-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: linear-gradient(180deg, #0a2a1a 0%, #06122a 100%);
          color: white;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 1001;
          display: flex;
          flex-direction: column;
        }
        
        .mobile-sidebar.active {
          transform: translateX(0);
        }
        
        .mobile-sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }
        
        .mobile-close-btn {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .admin-main.desktop {
            margin-left: 0;
            width: 100%;
          }
          
          .admin-sidebar.collapsed ~ .admin-main,
          .admin-sidebar ~ .admin-main {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;