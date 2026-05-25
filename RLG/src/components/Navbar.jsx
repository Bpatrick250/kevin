import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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

  const navLinks = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/about", label: "About", icon: "info-circle" },
    { to: "/programs", label: "Programs", icon: "graduation-cap" },
    { to: "/blog", label: "Blog", icon: "blog" },
    { to: "/gallery", label: "Gallery", icon: "images" },
    { to: "/getinvolved", label: "Get Involved", icon: "hand-peace" },
    { to: "/contact", label: "Contact", icon: "envelope" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">RL</span>
            </div>
            <div>
              <span className="text-xl font-bold text-green">Rising Leaders</span>
              <span className="text-xs text-gray block -mt-1">of Generation</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
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

          {/* Donate Button */}
          <div className="hidden lg:block">
            <Link to="/donate">
              <button className="btn btn-primary">
                Donate Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition ${isActive ? 'bg-green text-white' : 'text-gray-600 hover:bg-gray-50'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/donate" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-2 btn btn-primary">
                Donate Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;