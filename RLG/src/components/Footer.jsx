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
      <footer className="rlg-footer">
        {/* Top Border */}
        <div className="footer-top-border"></div>

        {/* Main Footer */}
        <div className="footer-main">
          <div className="footer-grid">
            
            {/* Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={logo} alt="RLG Logo" />
                <div className="footer-logo-text">
                  <span>Rising Leaders</span>
                  <span>of Generation</span>
                </div>
              </Link>
              <p className="footer-description">
                Empowering the next generation of leaders to create meaningful change in their communities and beyond.
              </p>
              
              <div className="footer-badges">
                <span className="footer-badge">
                  <FontAwesomeIcon icon={faCertificate} />
                  Certified
                </span>
                <span className="footer-badge">
                  <FontAwesomeIcon icon={faShieldAlt} />
                  Trusted
                </span>
              </div>
              
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
            <div className="footer-links-section">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Get Involved */}
            <div className="footer-links-section">
              <h4>Get Involved</h4>
              <ul>
                {getInvolvedLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div className="footer-links-section">
              <h4>Resources</h4>
              <ul>
                {resourcesLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact & Newsletter */}
            <div className="footer-contact-section">
              <h4>Connect With Us</h4>
              <div className="footer-contact-info">
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> KG 123 St, Kigali, Rwanda</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:contact@rlg.org">contact@rlg.org</a></p>
                <p><FontAwesomeIcon icon={faPhone} /> <a href="tel:+250788123456">+250 788 123 456</a></p>
                <p><FontAwesomeIcon icon={faClock} /> Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="footer-newsletter">
                <p><FontAwesomeIcon icon={faPaperPlane} /> Subscribe to our newsletter</p>
                <form onSubmit={handleNewsletterSubscribe}>
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </form>
                <small>No spam, unsubscribe anytime.</small>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Rising Leaders of Generation. All rights reserved.</p>
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

      {/* Scroll to Top */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      <style>{`
        /* ========================================
           FOOTER STYLES
        ======================================== */
        .rlg-footer {
          background: linear-gradient(135deg, #0a1a3a 0%, #06122a 100%);
          color: #ffffff;
          position: relative;
          margin-top: auto;
          width: 100%;
        }

        /* Top Border */
        .footer-top-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #16a34a, #22c55e);
        }

        /* Main Footer */
        .footer-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        /* Footer Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
        }

        /* Responsive Grid */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-main {
            padding: 2rem 1.5rem;
          }
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .footer-main {
            padding: 2rem 1rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* Brand Section */
        .footer-brand {
          grid-column: span 1;
        }

        @media (max-width: 1024px) {
          .footer-brand {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .footer-brand {
            grid-column: span 2;
          }
        }

        @media (max-width: 480px) {
          .footer-brand {
            grid-column: span 1;
          }
        }

        /* Logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          margin-bottom: 1rem;
        }

        .footer-logo img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-text span:first-child {
          font-size: 1.1rem;
          font-weight: 800;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .footer-logo-text span:last-child {
          font-size: 0.7rem;
          color: #9ca3af;
          margin-top: -2px;
        }

        /* Description */
        .footer-description {
          color: #d1d5db;
          font-size: 0.85rem;
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
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255,255,255,0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          color: #d1d5db;
        }

        .footer-badge svg {
          color: #22c55e;
          font-size: 0.7rem;
        }

        /* Social Icons */
        .footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .footer-social-icon {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #d1d5db;
        }

        .footer-social-icon:hover {
          transform: translateY(-3px);
          background: #22c55e;
          color: white;
        }

        /* Links Sections */
        .footer-links-section h4,
        .footer-contact-section h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
        }

        .footer-links-section h4::after,
        .footer-contact-section h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 35px;
          height: 2px;
          background: #22c55e;
          border-radius: 2px;
        }

        .footer-links-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-section li {
          margin-bottom: 0.6rem;
        }

        .footer-links-section a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .footer-links-section a:hover {
          color: #22c55e;
          padding-left: 5px;
        }

        /* Contact Section */
        .footer-contact-info p {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #d1d5db;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .footer-contact-info svg {
          color: #22c55e;
          width: 18px;
        }

        .footer-contact-info a {
          color: #d1d5db;
          text-decoration: none;
        }

        .footer-contact-info a:hover {
          color: #22c55e;
        }

        /* Newsletter */
        .footer-newsletter {
          margin-top: 1.5rem;
        }

        .footer-newsletter p {
          font-size: 0.85rem;
          color: #d1d5db;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-newsletter p svg {
          color: #22c55e;
        }

        .footer-newsletter form {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .footer-newsletter input {
          flex: 1;
          padding: 0.6rem 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          border-radius: 8px 0 0 8px;
          color: white;
          font-size: 0.85rem;
          outline: none;
        }

        .footer-newsletter input:focus {
          border-color: #22c55e;
        }

        .footer-newsletter input::placeholder {
          color: #9ca3af;
        }

        .footer-newsletter button {
          padding: 0.6rem 1rem;
          background: #22c55e;
          border: none;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .footer-newsletter button:hover {
          background: #16a34a;
        }

        .footer-newsletter button svg {
          color: white;
        }

        .footer-newsletter small {
          font-size: 0.65rem;
          color: #9ca3af;
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem 2rem;
        }

        .footer-bottom-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-bottom-content p {
          color: #9ca3af;
          font-size: 0.8rem;
        }

        .footer-bottom-love {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.8rem;
        }

        .footer-heart {
          color: #ef4444;
          animation: pulse 1.5s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .footer-bottom-links a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #22c55e;
        }

        /* Scroll to Top Button */
        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          background: #22c55e;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 15px rgba(34,197,94,0.3);
        }

        .scroll-top-btn:hover {
          background: #16a34a;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(34,197,94,0.4);
        }

        .scroll-top-btn svg {
          color: white;
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
};

export default Footer;