import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard, faBlog, faCalendar, faImage, faEnvelope,
  faHeart, faComments, faCog, faSignOutAlt,
  faGraduationCap, faHandHoldingHeart, faBars, faTimes,
  faChevronLeft, faChevronRight, faHandsHelping
} from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../assets';
import { useAdmin } from '../contexts/AdminContext';
import Swal from 'sweetalert2';

const AdminSidebar = ({ isOpen, onToggle, isMobile, onMobileClose }) => {
  const { logout } = useAdmin();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const menuItems = [
    { path: '/admin/dashboard', icon: faDashboard, label: 'Dashboard' },
    { path: '/admin/blogs', icon: faBlog, label: 'Blogs' },
    { path: '/admin/programs', icon: faGraduationCap, label: 'Programs' },
    { path: '/admin/events', icon: faCalendar, label: 'Events' },
    { path: '/admin/gallery', icon: faImage, label: 'Gallery' },
    { path: '/admin/contacts', icon: faEnvelope, label: 'Contacts' },
    { path: '/admin/donations', icon: faHandHoldingHeart, label: 'Donations' },
    { path: '/admin/testimonials', icon: faComments, label: 'Testimonials' },
    { path: '/admin/getinvolved', icon: faHandsHelping, label: 'Get Involved' },
    { path: '/admin/settings', icon: faCog, label: 'Settings' },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#22c55e',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      logout();
      window.location.href = '/admin/login';
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (onToggle && !isMobile) {
      onToggle(!collapsed);
    }
  };

  // Desktop sidebar with collapse
  if (!isMobile) {
    return (
      <>
        <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <img src={logo} alt="RLG" className="sidebar-logo" />
              {!collapsed && <span className="sidebar-brand-text">RLG Admin</span>}
            </div>
            <button className="collapse-btn" onClick={toggleCollapse}>
              <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
            </button>
          </div>
          
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={item.icon} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
          
          <div className="sidebar-footer">
            <button className="sidebar-link logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>
        <div className={`sidebar-overlay-desktop ${collapsed ? 'collapsed' : ''}`} />
      </>
    );
  }

  // Mobile sidebar (drawer)
  return (
    <>
      <div className={`mobile-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onMobileClose} />
      <aside className={`mobile-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="mobile-sidebar-header">
          <img src={logo} alt="RLG" className="sidebar-logo" />
          <span className="sidebar-brand-text">RLG Admin</span>
          <button className="mobile-close-btn" onClick={onMobileClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;