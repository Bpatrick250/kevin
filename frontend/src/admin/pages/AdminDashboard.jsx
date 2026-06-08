import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../services/adminApi';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faBlog, faDollarSign, faEnvelope, faCalendar,
  faEye, faHeart, faUserPlus, faSpinner
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentActivity(),
      ]);
      setStats(statsRes.data.data);
      setRecentActivity(activityRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: faUsers, color: '#22c55e', change: '+12%' },
    { title: 'Total Blogs', value: stats?.totalBlogs || 0, icon: faBlog, color: '#3b82f6', change: '+5%' },
    { title: 'Donations', value: `$${stats?.totalDonations?.toLocaleString() || 0}`, icon: faDollarSign, color: '#f59e0b', change: '+23%' },
    { title: 'Pending Contacts', value: stats?.pendingContacts || 0, icon: faEnvelope, color: '#ef4444', change: '-2%' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with RLG today.</p>
      </div>
      
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div className="chart-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.recentUsers?.slice(0, 5).map((user, i) => (
              <div key={i} className="activity-item">
                <FontAwesomeIcon icon={faUserPlus} className="activity-icon" />
                <div>
                  <p><strong>{user.name}</strong> joined RLG</p>
                  <small>{new Date(user.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="quick-action-btn">+ Create New Blog</button>
            <button className="quick-action-btn">+ Add Gallery Image</button>
            <button className="quick-action-btn">+ Create Event</button>
            <button className="quick-action-btn">View Donations</button>
          </div>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          animation: fadeIn 0.5s ease;
        }
        
        .dashboard-header {
          margin-bottom: 25px;
        }
        
        .dashboard-header h1 {
          font-size: 28px;
          color: #1f2937;
          margin-bottom: 5px;
        }
        
        .dashboard-header p {
          color: #6b7280;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .chart-card h3 {
          margin-bottom: 15px;
          color: #374151;
        }
        
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          background: #f9fafb;
        }
        
        .activity-icon {
          color: #22c55e;
          font-size: 18px;
        }
        
        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .quick-action-btn {
          padding: 12px;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }
        
        .quick-action-btn:hover {
          background: #22c55e;
          color: white;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          gap: 20px;
          color: #22c55e;
        }
        
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;