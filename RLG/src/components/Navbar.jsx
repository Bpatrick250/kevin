import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { logo } from "../assets"

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
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/programs", label: "Programs" },
    { to: "/blog", label: "Blog" },
    { to: "/gallery", label: "Gallery" },
    { to: "/getinvolved", label: "Get Involved" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Image */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="RLG Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <span className="text-xl font-bold text-primary-blue">Rising Leaders</span>
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
                  `block py-3 px-4 rounded-lg transition ${isActive ? 'bg-primary-blue text-white' : 'text-gray-600 hover:bg-gray-50'}`
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