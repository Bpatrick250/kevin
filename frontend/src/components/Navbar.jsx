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
      <nav className={`rlg-navbar ${isScrolled ? 'rlg-scrolled' : ''}`}>
        <div className="rlg-nav-container">
          {/* Logo */}
          <Link to="/" className="rlg-logo" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="RLG Logo" className="rlg-logo-img" />
            <div className="rlg-logo-text">
              <span className="rlg-logo-title">Rising Leaders</span>
              <span className="rlg-logo-sub">of Generation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="rlg-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `rlg-nav-link ${isActive ? 'rlg-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Donate Button */}
          <div className="rlg-nav-buttons">
            <Link to="/donate">
              <button className="rlg-donate-btn">
                <FontAwesomeIcon icon={faHeart} /> Donate Now
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="rlg-hamburger" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && <div className="rlg-overlay" onClick={() => setIsOpen(false)} />}

        {/* Mobile Menu Drawer */}
        <div className={`rlg-drawer ${isOpen ? 'rlg-drawer-open' : ''}`}>
          <div className="rlg-drawer-header">
            <img src={logo} alt="RLG Logo" className="rlg-drawer-logo" />
            <div>
              <div className="rlg-drawer-title">Rising Leaders</div>
              <div className="rlg-drawer-sub">of Generation</div>
            </div>
            <button className="rlg-drawer-close" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="rlg-drawer-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `rlg-drawer-link ${isActive ? 'rlg-drawer-active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          
          <div className="rlg-drawer-footer">
            <Link to="/donate" onClick={() => setIsOpen(false)}>
              <button className="rlg-drawer-donate">Donate Now</button>
            </Link>
            <div className="rlg-drawer-contact">
              <p>📧 raisingleaderofgeneration@gmail.com</p>
              <p>📞 +250784769382 | +250792588272</p>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        /* Main Navbar Styles */
        .rlg-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .rlg-navbar.rlg-scrolled {
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        /* Container */
        .rlg-nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        @media (max-width: 1024px) {
          .rlg-nav-container {
            height: 70px;
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .rlg-nav-container {
            height: 64px;
            padding: 0 1rem;
          }
        }

        /* Logo */
        .rlg-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .rlg-logo-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .rlg-logo-img {
            width: 40px;
            height: 40px;
          }
        }

        .rlg-logo-text {
          display: flex;
          flex-direction: column;
        }

        .rlg-logo-title {
          font-size: 1.2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #14532d, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1.2;
        }

        .rlg-logo-sub {
          font-size: 0.7rem;
          color: #6b7280;
          margin-top: -2px;
        }

        @media (max-width: 640px) {
          .rlg-logo-text {
            display: none;
          }
        }

        /* Desktop Navigation Links - Visible on large screens */
        .rlg-nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 1024px) {
          .rlg-nav-links {
            display: none;
          }
        }

        .rlg-nav-link {
          padding: 0.5rem 1rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-radius: 0.5rem;
        }

        .rlg-nav-link:hover {
          color: #22c55e;
          background: rgba(34,197,94,0.05);
        }

        .rlg-nav-link.rlg-active {
          color: #14532d;
          font-weight: 600;
          background: rgba(34,197,94,0.1);
        }

        /* Desktop Donate Button */
        .rlg-nav-buttons {
          display: flex;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .rlg-nav-buttons {
            display: none;
          }
        }

        .rlg-donate-btn {
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

        .rlg-donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34,197,94,0.3);
        }

        /* Hamburger Button - Visible on mobile/tablet */
        .rlg-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #4b5563;
          z-index: 1001;
        }

        .rlg-hamburger:hover {
          background: rgba(0,0,0,0.05);
        }

        @media (max-width: 1024px) {
          .rlg-hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Overlay */
        .rlg-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 1001;
          animation: fadeIn 0.3s ease;
        }

        /* Drawer */
        .rlg-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 350px;
          height: 100%;
          background: #ffffff;
          z-index: 1002;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 30px rgba(0,0,0,0.15);
        }

        .rlg-drawer.rlg-drawer-open {
          transform: translateX(0);
        }

        @media (max-width: 480px) {
          .rlg-drawer {
            width: 100%;
            max-width: none;
          }
        }

        /* Drawer Header */
        .rlg-drawer-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f0fdf4, #ffffff);
        }

        .rlg-drawer-logo {
          width: 45px;
          height: 45px;
          object-fit: contain;
        }

        .rlg-drawer-title {
          font-size: 1rem;
          font-weight: 800;
          background: linear-gradient(135deg, #14532d, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .rlg-drawer-sub {
          font-size: 0.65rem;
          color: #6b7280;
        }

        .rlg-drawer-close {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #6b7280;
        }

        .rlg-drawer-close:hover {
          background: rgba(0,0,0,0.05);
        }

        /* Drawer Links */
        .rlg-drawer-links {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
        }

        .rlg-drawer-link {
          display: block;
          padding: 0.9rem 1rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 0.5rem;
        }

        .rlg-drawer-link:hover {
          background: rgba(34,197,94,0.08);
          color: #22c55e;
          transform: translateX(5px);
        }

        .rlg-drawer-link.rlg-drawer-active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-weight: 600;
        }

        /* Drawer Footer */
        .rlg-drawer-footer {
          padding: 1.25rem;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .rlg-drawer-donate {
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
        }

        .rlg-drawer-donate:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34,197,94,0.3);
        }

        .rlg-drawer-contact {
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .rlg-drawer-contact p {
          font-size: 0.7rem;
          color: #9ca3af;
          margin: 0.25rem 0;
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