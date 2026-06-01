import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faPaperPlane,
  faHeart,
  faArrowRight,
  faClock,
  faShieldAlt,
  faCertificate,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { logo } from "../assets";
import { showSuccess, showToast } from "../utils/alert";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      showSuccess("Subscribed! 🎉", `Thank you for subscribing with ${email}. You'll receive updates about leadership programs!`);
      e.target.reset();
    } else {
      showToast("Please enter your email address", "error");
    }
  };

  const quickLinks = [
    { to: "/about", label: "About Us" },
    { to: "/programs", label: "Programs" },
    { to: "/blog", label: "Blog" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" }
  ];

  const getInvolvedLinks = [
    { to: "/getinvolved", label: "Volunteer" },
    { to: "/getinvolved", label: "Become a Mentor" },
    { to: "/donate", label: "Donate" },
    { to: "/programs", label: "Join a Program" }
  ];

  const resourcesLinks = [
    { to: "/faq", label: "FAQs" },
    { to: "/resources", label: "Resources" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/press", label: "Press Kit" }
  ];

  const socialLinks = [
    { icon: faFacebook, href: "https://facebook.com", label: "Facebook", color: "#1877f2" },
    { icon: faTwitter, href: "https://twitter.com", label: "Twitter", color: "#1da1f2" },
    { icon: faInstagram, href: "https://instagram.com", label: "Instagram", color: "#e4405f" },
    { icon: faLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
    { icon: faYoutube, href: "https://youtube.com", label: "YouTube", color: "#ff0000" }
  ];

  return (
    <>
      <footer className="footer">
        {/* Top Decorative Border */}
        <div className="footer-top-border"></div>

        {/* Main Footer Content */}
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={logo} alt="RLG Logo" />
                <div>
                  <span className="footer-logo-text">Rising Leaders</span>
                  <span className="footer-logo-sub">of Generation</span>
                </div>
              </Link>
              <p className="footer-description">
                Empowering the next generation of leaders to create meaningful change in their communities and beyond.
              </p>
              
              {/* Trust Badges */}
              <div className="footer-badges">
                <div className="footer-badge">
                  <FontAwesomeIcon icon={faCertificate} />
                  <span>Certified</span>
                </div>
                <div className="footer-badge">
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <span>Trusted</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon"
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>
                      <span className="footer-link-dot"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Get Involved */}
            <div className="footer-section">
              <h4 className="footer-title">Get Involved</h4>
              <ul className="footer-links">
                {getInvolvedLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>
                      <span className="footer-link-dot"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div className="footer-section">
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                {resourcesLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>
                      <span className="footer-link-dot"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact & Newsletter */}
            <div className="footer-section footer-contact">
              <h4 className="footer-title">Connect With Us</h4>
              <ul className="footer-contact-list">
                <li>
                  <div className="footer-contact-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <span>KG 123 St, Kigali, Rwanda</span>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <a href="mailto:contact@rlg.org">contact@rlg.org</a>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <a href="tel:+250788123456">+250 788 123 456</a>
                </li>
                <li>
                  <div className="footer-contact-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
              
              {/* Newsletter Signup */}
              <div className="footer-newsletter">
                <p className="footer-newsletter-title">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Subscribe to our newsletter
                </p>
                <form onSubmit={handleNewsletterSubscribe} className="footer-newsletter-form">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </form>
                <p className="footer-newsletter-note">
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p>
              &copy; {currentYear} Rising Leaders of Generation. All rights reserved.
            </p>
            <div className="footer-bottom-love">
              <FontAwesomeIcon icon={faHeart} className="footer-heart" />
              <span>Made with passion for young leaders in Rwanda</span>
            </div>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      {/* Styles */}
      <style jsx>{`
        /* Footer Container */
        .footer {
          background: linear-gradient(135deg, #0a1a3a 0%, #06122a 100%);
          color: #ffffff;
          position: relative;
          margin-top: auto;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Top Border */
        .footer-top-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6);
        }

        /* Container */
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        @media (min-width: 640px) {
          .footer-container {
            padding: 3rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-container {
            padding: 4rem 2rem;
          }
        }

        /* Grid Layout */
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 2rem;
          }
        }

        /* Brand Section */
        .footer-brand {
          grid-column: span 1;
        }

        @media (min-width: 768px) {
          .footer-brand {
            grid-column: span 2;
          }
        }

        @media (min-width: 1024px) {
          .footer-brand {
            grid-column: span 1;
          }
        }

        /* Logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .footer-logo:hover {
          transform: scale(1.02);
        }

        .footer-logo img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .footer-logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          display: block;
        }

        .footer-logo-sub {
          font-size: 0.75rem;
          color: #9ca3af;
          display: block;
          margin-top: -0.25rem;
        }

        /* Description */
        .footer-description {
          color: #d1d5db;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        /* Badges */
        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .footer-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
        }

        .footer-badge svg {
          color: #3b82f6;
          font-size: 0.75rem;
        }

        .footer-badge span {
          color: #d1d5db;
          font-size: 0.75rem;
        }

        /* Social Icons */
        .footer-social {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .footer-social-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .footer-social-icon svg {
          color: #ffffff;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .footer-social-icon:hover {
          transform: translateY(-3px);
          background: rgba(59, 130, 246, 0.8);
        }

        .footer-social-icon:hover svg {
          color: white;
        }

        /* Footer Sections */
        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #3b82f6;
          border-radius: 2px;
        }

        /* Footer Links */
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links li a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links li a:hover {
          color: #60a5fa;
          transform: translateX(5px);
        }

        .footer-link-dot {
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          display: inline-block;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .footer-links li a:hover .footer-link-dot {
          opacity: 1;
          width: 6px;
          height: 6px;
        }

        /* Contact List */
        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-contact-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #d1d5db;
          font-size: 0.875rem;
        }

        .footer-contact-list li a {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-contact-list li a:hover {
          color: #60a5fa;
        }

        .footer-contact-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-contact-icon svg {
          color: #3b82f6;
          font-size: 0.875rem;
        }

        /* Newsletter */
        .footer-newsletter {
          margin-top: 1rem;
        }

        .footer-newsletter-title {
          font-size: 0.875rem;
          color: #d1d5db;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-newsletter-title svg {
          color: #3b82f6;
        }

        .footer-newsletter-form {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .footer-newsletter-form input {
          flex: 1;
          padding: 0.6rem 1rem;
          font-size: 0.875rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          border-radius: 8px 0 0 8px;
          outline: none;
          transition: all 0.3s ease;
        }

        .footer-newsletter-form input:focus {
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.1);
        }

        .footer-newsletter-form input::placeholder {
          color: #9ca3af;
        }

        .footer-newsletter-form button {
          padding: 0.6rem 1rem;
          background: #3b82f6;
          border: none;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-newsletter-form button svg {
          color: white;
          font-size: 0.875rem;
        }

        .footer-newsletter-form button:hover {
          background: #2563eb;
          transform: scale(1.02);
        }

        .footer-newsletter-note {
          font-size: 0.7rem;
          color: #9ca3af;
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 1rem;
        }

        .footer-bottom-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-bottom-container {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .footer-bottom-container p {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .footer-bottom-love {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .footer-heart {
          color: #ef4444;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-bottom-links a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #60a5fa;
        }

        /* Scroll to Top Button */
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          background: #3b82f6;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .scroll-to-top:hover {
          background: #2563eb;
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .scroll-to-top svg {
          color: white;
          font-size: 1.25rem;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .footer-section {
            text-align: center;
            align-items: center;
          }
          
          .footer-title::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .footer-links li a {
            justify-content: center;
          }
          
          .footer-contact-list li {
            justify-content: center;
          }
          
          .footer-badges {
            justify-content: center;
          }
          
          .footer-social {
            justify-content: center;
          }
          
          .footer-logo {
            justify-content: center;
          }
          
          .footer-description {
            text-align: center;
          }
        }

        /* Print Styles */
        @media print {
          .footer {
            background: #0a1a3a;
            color: white;
          }
          
          .scroll-to-top {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;