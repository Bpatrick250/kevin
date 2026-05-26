import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
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
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img 
              src={logo} 
              alt="RLG Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-lg md:text-xl font-bold text-primary-blue">Rising Leaders</span>
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

          {/* Donate Button - Desktop */}
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
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition z-50"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu Drawer */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out transform lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: 0, zIndex: 100 }}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <img 
                src={logo} 
                alt="RLG Logo" 
                className="w-10 h-10 object-contain"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            
            {/* Mobile Menu Links */}
            <div className="flex-1 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block py-3 px-6 transition ${
                      isActive 
                        ? 'bg-gradient-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            
            {/* Mobile Menu Footer */}
            <div className="p-4 border-t">
              <Link to="/donate" onClick={handleLinkClick}>
                <button className="btn btn-primary w-full">
                  Donate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;