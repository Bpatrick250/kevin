import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faHeart
} from '@fortawesome/free-solid-svg-icons';
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

  // Prevent body scroll when mobile menu is open
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

  // Close mobile menu on window resize (if screen becomes desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <img src={logo} alt="RLG Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-title">Rising Leaders</span>
              <span className="logo-sub">of Generation</span>
            </div>
          </Link>

          {/* Desktop Navigation - Visible on large screens */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Donate Button - Desktop */}
          <div className="nav-buttons">
            <Link to="/donate">
              <button className="donate-btn">
                <FontAwesomeIcon icon={faHeart} /> Donate Now
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            className="hamburger-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMobileMenu} />

        {/* Mobile Menu Drawer */}
        <div className={`mobile-drawer ${isOpen ? 'active' : ''}`}>
          <div className="mobile-header">
            <img src={logo} alt="RLG Logo" className="mobile-logo" />
            <div className="mobile-logo-text">
              <span className="mobile-logo-title">Rising Leaders</span>
              <span className="mobile-logo-sub">of Generation</span>
            </div>
            <button className="mobile-close" onClick={toggleMobileMenu}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `mobile-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleLinkClick}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mobile-footer">
            <Link to="/donate" onClick={handleLinkClick}>
              <button className="mobile-donate-btn">
                <FontAwesomeIcon icon={faHeart} /> Donate Now
              </button>
            </Link>
            <div className="mobile-contact">
              <p>📧 raisingleaderofgeneration@gmail.com</p>
              <p>📞 +250784769382 | +250792588272</p>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        /* Reset and Base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Navbar Container */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #FEFEFE;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .navbar.scrolled {
          background: rgba(254, 254, 254, 0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        /* Navigation Container */
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.5rem;
            height: 70px;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1rem;
            height: 64px;
          }
        }

        /* Logo Styles */
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: transform 0.2s ease;
          z-index: 1001;
        }

        .logo:hover {
          transform: scale(1.02);
        }

        .logo-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        @media (max-width: 1024px) {
          .logo-img {
            width: 45px;
            height: 45px;
          }
        }

        @media (max-width: 768px) {
          .logo-img {
            width: 40px;
            height: 40px;
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
          letter-spacing: 0.5px;
          margin-top: -2px;
        }

        @media (max-width: 640px) {
          .logo-text {
            display: none;
          }
        }

        /* Desktop Navigation Links - Visible on large screens */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 1024px) {
          .nav-links {
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
          position: relative;
        }

        .nav-link:hover {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .nav-link.active {
          color: #14532d;
          font-weight: 600;
          background: rgba(34, 197, 94, 0.1);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          border-radius: 2px;
        }

        /* Desktop Donate Button */
        .nav-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 1024px) {
          .nav-buttons {
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
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
        }

        .donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
        }

        /* Hamburger Menu Button - Visible only on mobile/tablet */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          color: #4b5563;
          z-index: 1001;
        }

        .hamburger-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
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

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 350px;
          height: 100%;
          background: #FEFEFE;
          z-index: 1002;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
        }

        .mobile-drawer.active {
          transform: translateX(0);
        }

        @media (max-width: 480px) {
          .mobile-drawer {
            width: 100%;
            max-width: none;
          }
        }

        /* Mobile Header */
        .mobile-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f0fdf4, #ffffff);
        }

        .mobile-logo {
          width: 45px;
          height: 45px;
          object-fit: contain;
        }

        .mobile-logo-text {
          flex: 1;
        }

        .mobile-logo-title {
          font-size: 1rem;
          font-weight: 800;
          background: linear-gradient(135deg, #14532d, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: block;
        }

        .mobile-logo-sub {
          font-size: 0.65rem;
          color: #6b7280;
        }

        .mobile-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          color: #6b7280;
        }

        .mobile-close:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        /* Mobile Navigation Links */
        .mobile-nav-links {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
        }

        .mobile-nav-link {
          display: block;
          padding: 0.9rem 1rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 0.5rem;
        }

        .mobile-nav-link:hover {
          background: rgba(34, 197, 94, 0.08);
          color: #22c55e;
          transform: translateX(5px);
        }

        .mobile-nav-link.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-weight: 600;
        }

        /* Mobile Footer */
        .mobile-footer {
          padding: 1.25rem;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .mobile-donate-btn {
          width: 100%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 0.8rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .mobile-donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        .mobile-contact {
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .mobile-contact p {
          font-size: 0.7rem;
          color: #9ca3af;
          margin: 0.25rem 0;
        }

        /* Scrollbar for mobile nav */
        .mobile-nav-links::-webkit-scrollbar {
          width: 3px;
        }

        .mobile-nav-links::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .mobile-nav-links::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 10px;
        }

        /* Animation keyframes */
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;