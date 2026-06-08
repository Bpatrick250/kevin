import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard, faBlog, faCalendar, faImage, faEnvelope,
  faHeart, faUsers, faComments, faCog, faSignOutAlt,
  faGraduationCap, faHandHoldingHeart
} from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../assets';

const AdminSidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/admin/dashboard', icon: faDashboard, label: 'Dashboard' },
    { path: '/admin/blogs', icon: faBlog, label: 'Blogs' },
    { path: '/admin/programs', icon: faGraduationCap, label: 'Programs' },
    { path: '/admin/events', icon: faCalendar, label: 'Events' },
    { path: '/admin/gallery', icon: faImage, label: 'Gallery' },
    { path: '/admin/contacts', icon: faEnvelope, label: 'Contacts' },
    { path: '/admin/donations', icon: faHandHoldingHeart, label: 'Donations' },
    { path: '/admin/testimonials', icon: faComments, label: 'Testimonials' },
    { path: '/admin/settings', icon: faCog, label: 'Settings' },
  ];

  return (
    <>
      <aside className={`admin-sidebar ${!isOpen ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <img src={logo} alt="RLG" className="sidebar-logo" />
          {isOpen && <span className="sidebar-brand-text">RLG Admin</span>}
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={item.icon} />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
      
      {!isOpen && (
        <div className="sidebar-toggle-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faDashboard} />
        </div>
      )}

      <style>{`
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #0a2a1a 0%, #06122a 100%);
          color: white;
          transition: width 0.3s ease;
          z-index: 100;
          overflow-y: auto;
        }
        
        .admin-sidebar.collapsed {
          width: 70px;
        }
        
        .admin-sidebar.collapsed .sidebar-brand-text,
        .admin-sidebar.collapsed .sidebar-link span {
          display: none;
        }
        
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
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
        
        .sidebar-nav {
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
          border-left: 3px solid white;
        }
        
        .sidebar-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .sidebar-toggle-btn {
          position: fixed;
          left: 80px;
          top: 15px;
          background: #22c55e;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 101;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.collapsed {
            transform: translateX(0);
            width: 260px;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;