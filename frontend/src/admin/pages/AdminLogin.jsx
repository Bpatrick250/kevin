import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faSignInAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../assets';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);
    if (result.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <img src={logo} alt="RLG Logo" className="admin-login-logo" />
            <h1>Admin Portal</h1>
            <p>Rising Leaders of Generation</p>
          </div>
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rlg.org"
                required
              />
            </div>
            
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            
            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSignInAlt} /> Login to Dashboard
                </>
              )}
            </button>
          </form>
          
          <div className="admin-login-footer">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>Secure Admin Access Only</span>
          </div>
        </div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%);
          position: relative;
          overflow: hidden;
        }
        
        .admin-login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.03)"/><circle cx="150" cy="120" r="60" fill="rgba(255,255,255,0.02)"/></svg>');
          opacity: 0.5;
        }
        
        .admin-login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 450px;
          padding: 20px;
        }
        
        .admin-login-card {
          background: rgba(255,255,255,0.98);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
        }
        
        .admin-login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .admin-login-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 15px;
        }
        
        .admin-login-header h1 {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #14532d, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 5px;
        }
        
        .admin-login-header p {
          color: #6b7280;
          font-size: 14px;
        }
        
        .admin-login-form .form-group {
          margin-bottom: 20px;
        }
        
        .admin-login-form label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .admin-login-form label .input-icon {
          margin-right: 8px;
          color: #22c55e;
        }
        
        .admin-login-form input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .admin-login-form input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }
        
        .password-input-wrapper {
          position: relative;
        }
        
        .password-input-wrapper input {
          padding-right: 45px;
        }
        
        .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
        }
        
        .admin-login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .admin-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34,197,94,0.3);
        }
        
        .admin-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .admin-login-footer {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 12px;
        }
        
        .admin-login-footer svg {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;