import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { logo } from "../assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/programs", label: "Programs" },
    { to: "/blog", label: "Blog" },
    { to: "/gallery", label: "Gallery" },
    { to: "/getinvolved", label: "Get Involved" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="RLG Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-title">Rising Leaders</span>
              <span className="logo-sub">of Generation</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Donate Button - Hidden on mobile/tablet */}
          <div className="desktop-buttons">
            <Link to="/donate">
              <button className="donate-btn">
                <FontAwesomeIcon icon={faHeart} /> Donate Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button - Only visible on mobile/tablet */}
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <img src={logo} alt="RLG Logo" className="drawer-logo" />
          <div className="drawer-brand">
            <span className="drawer-brand-title">Rising Leaders</span>
            <span className="drawer-brand-sub">of Generation</span>
          </div>
          <button className="drawer-close" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="drawer-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        
        <div className="drawer-footer">
          <Link to="/donate" onClick={() => setIsOpen(false)}>
            <button className="drawer-donate-btn">
              <FontAwesomeIcon icon={faHeart} /> Donate Now
            </button>
          </Link>
          <div className="drawer-contact">
            <p>📧 raisingleaderofgeneration@gmail.com</p>
            <p>📞 +250784769382 | +250792588272</p>
          </div>
        </div>
      </div>

      <style>{`
        /* ========================================
           NAVBAR STYLES
        ======================================== */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .navbar.scrolled {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        /* Container */
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        /* Responsive Container */
        @media (max-width: 1200px) {
          .nav-container {
            max-width: 95%;
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 1024px) {
          .nav-container {
            height: 70px;
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            height: 64px;
            padding: 0 1rem;
          }
        }

        /* ========================================
           LOGO STYLES
        ======================================== */
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          z-index: 1001;
        }

        .logo-img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        @media (max-width: 1024px) {
          .logo-img {
            width: 42px;
            height: 42px;
          }
        }

        @media (max-width: 768px) {
          .logo-img {
            width: 38px;
            height: 38px;
          }
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 1.2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #14532d, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1.2;
        }

        .logo-sub {
          font-size: 0.7rem;
          color: #6b7280;
          margin-top: -2px;
        }

        @media (max-width: 640px) {
          .logo-text {
            display: none;
          }
        }

        /* ========================================
           DESKTOP NAVIGATION
           Visible on screens 1024px and above
        ======================================== */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 1023px) {
          .desktop-nav {
            display: none;
          }
        }

        .nav-link {
          padding: 0.5rem 1rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-radius: 0.5rem;
        }

        .nav-link:hover {
          color: #22c55e;
          background: rgba(34,197,94,0.05);
        }

        .nav-link.active {
          color: #14532d;
          font-weight: 600;
          background: rgba(34,197,94,0.1);
        }

        /* Desktop Donate Button */
        .desktop-buttons {
          display: flex;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .desktop-buttons {
            display: none;
          }
        }

        .donate-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(34,197,94,0.2);
        }

        .donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34,197,94,0.3);
        }

        /* ========================================
           MOBILE MENU BUTTON
           Visible only on screens below 1024px
        ======================================== */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #4b5563;
          z-index: 1001;
        }

        .mobile-menu-btn:hover {
          background: rgba(0,0,0,0.05);
        }

        @media (max-width: 1023px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* ========================================
           MOBILE OVERLAY
        ======================================== */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* ========================================
           MOBILE DRAWER
           Perfect size for mobile screens
        ======================================== */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100%;
          background: #ffffff;
          z-index: 1002;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 30px rgba(0,0,0,0.15);
        }

        .mobile-drawer.active {
          transform: translateX(0);
        }

        /* Small mobile screens */
        @media (max-width: 480px) {
          .mobile-drawer {
            width: 85%;
            max-width: 300px;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .mobile-drawer {
            width: 90%;
          }
        }

        /* Drawer Header */
        .drawer-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f0fdf4, #ffffff);
        }

        .drawer-logo {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }

        .drawer-brand {
          flex: 1;
        }

        .drawer-brand-title {
          font-size: 0.95rem;
          font-weight: 800;
          background: linear-gradient(135deg, #14532d, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: block;
        }

        .drawer-brand-sub {
          font-size: 0.6rem;
          color: #6b7280;
        }

        .drawer-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #6b7280;
        }

        .drawer-close:hover {
          background: rgba(0,0,0,0.05);
        }

        /* Drawer Navigation Links */
        .drawer-nav {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
        }

        .drawer-link {
          display: block;
          padding: 0.75rem 1rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-radius: 0.5rem;
        }

        .drawer-link:hover {
          background: rgba(34,197,94,0.08);
          color: #22c55e;
        }

        .drawer-link.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-weight: 600;
        }

        /* Drawer Footer */
        .drawer-footer {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .drawer-donate-btn {
          width: 100%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 0.7rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .drawer-donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34,197,94,0.3);
        }

        .drawer-contact {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .drawer-contact p {
          font-size: 0.65rem;
          color: #9ca3af;
          margin: 0.25rem 0;
        }

        /* Custom Scrollbar for Drawer */
        .drawer-nav::-webkit-scrollbar {
          width: 3px;
        }

        .drawer-nav::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .drawer-nav::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 10px;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar;