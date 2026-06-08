import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ admin, onMenuClick, onLogout, isMobile }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New contact message received', read: false },
    { id: 2, message: 'New donation of $50', read: false },
    { id: 3, message: 'Blog post published', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="admin-header">
      <button className="menu-toggle" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="header-actions">
        <div className="notification-dropdown">
          <button className="notification-btn">
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          <div className="notification-menu">
            {notifications.map(notif => (
              <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
                <p>{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="user-menu">
          <button className="user-btn" onClick={() => setShowDropdown(!showDropdown)}>
            <FontAwesomeIcon icon={faUserCircle} />
            <span>{admin?.name?.split(' ')[0] || 'Admin'}</span>
            <FontAwesomeIcon icon={faChevronDown} className="chevron" />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => window.location.href = '/admin/settings'}>
                <FontAwesomeIcon icon={faUserCircle} /> Profile Settings
              </button>
              <button onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-header {
          background: white;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 99;
        }
        
        .menu-toggle {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #374151;
          display: none;
        }
        
        .header-search input {
          padding: 8px 15px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          width: 250px;
          outline: none;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .notification-dropdown {
          position: relative;
        }
        
        .notification-btn {
          position: relative;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
        }
        
        .notification-btn .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 10px;
        }
        
        .notification-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 280px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          z-index: 100;
          display: none;
        }
        
        .notification-dropdown:hover .notification-menu {
          display: block;
        }
        
        .notification-item {
          padding: 12px 15px;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
        }
        
        .notification-item.unread {
          background: #f0fdf4;
        }
        
        .notification-item:hover {
          background: #f3f4f6;
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 8px;
        }
        
        .user-btn:hover {
          background: #f3f4f6;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          min-width: 180px;
          z-index: 100;
        }
        
        .dropdown-menu button {
          width: 100%;
          padding: 10px 15px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .dropdown-menu button:hover {
          background: #f3f4f6;
        }
        
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          
          .header-search {
            display: none;
          }
          
          .user-btn span {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;