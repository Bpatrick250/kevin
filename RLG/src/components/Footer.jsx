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
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import { logo } from "../assets";
import { showSuccess, showToast } from "../utils/alert";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  // Inline CSS styles
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #013464 0%, #012a50 100%)',
      color: '#FEFEFE',
      position: 'relative',
      marginTop: 'auto'
    },
    waveContainer: {
      position: 'absolute',
      top: '-1px',
      left: 0,
      right: 0,
      width: '100%',
      lineHeight: 0
    },
    waveSvg: {
      position: 'relative',
      display: 'block',
      width: 'calc(100% + 1.3px)',
      height: '60px'
    },
    beforeOverlay: {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    topBorder: {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)'
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#FFFFFF',
      position: 'relative',
      display: 'inline-block'
    },
    titleUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '32px',
      height: '2px',
      background: '#3b82f6',
      marginTop: '4px',
      borderRadius: '9999px'
    },
    link: {
      color: '#D1D5DB',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem'
    },
    linkHover: {
      color: '#60a5fa'
    },
    socialIcon: {
      width: '36px',
      height: '36px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    contactIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    newsletterInput: {
      flex: 1,
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      borderTopLeftRadius: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    newsletterButton: {
      backgroundColor: '#3b82f6',
      padding: '0.5rem 1rem',
      borderTopRightRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none'
    },
    bottomBar: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '1rem'
    }
  };

  return (
    <footer style={styles.footer}>
      {/* Pseudo-elements need to be in a wrapper div */}
      <div style={{ position: 'relative' }}>
        <div style={styles.topBorder}></div>
        <div style={styles.beforeOverlay}></div>
      </div>

      {/* Top Wave Decoration */}
      <div style={styles.waveContainer}>
        <svg style={styles.waveSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#FEFEFE" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group" style={{ textDecoration: 'none' }}>
              <img 
                src={logo} 
                alt="RLG Logo" 
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <span className="text-xl font-bold text-white">Rising Leaders</span>
                <span className="text-xs text-gray-300 block -mt-1">of Generation</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Empowering the next generation of leaders to create meaningful change in their communities and beyond.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-1 bg-white bg-opacity-10 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faCertificate} className="text-blue-400 text-xs" />
                <span className="text-gray-300 text-xs">Certified</span>
              </div>
              <div className="flex items-center gap-1 bg-white bg-opacity-10 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faShieldAlt} className="text-blue-400 text-xs" />
                <span className="text-gray-300 text-xs">Trusted</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  style={styles.socialIcon}
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="text-white text-base" 
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <div style={styles.sectionTitle}>
              Quick Links
              <div style={styles.titleUnderline}></div>
            </div>
            <ul className="space-y-2.5 mt-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="footer-link"
                    style={styles.link}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-blue-400 transition-all duration-300 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Get Involved */}
          <div>
            <div style={styles.sectionTitle}>
              Get Involved
              <div style={styles.titleUnderline}></div>
            </div>
            <ul className="space-y-2.5 mt-4">
              {getInvolvedLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="footer-link"
                    style={styles.link}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-blue-400 transition-all duration-300 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <div style={styles.sectionTitle}>
              Resources
              <div style={styles.titleUnderline}></div>
            </div>
            <ul className="space-y-2.5 mt-4">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="footer-link"
                    style={styles.link}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-blue-400 transition-all duration-300 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <div style={styles.sectionTitle}>
              Connect With Us
              <div style={styles.titleUnderline}></div>
            </div>
            <ul className="space-y-3 mt-4 mb-4">
              <li className="flex items-start gap-3 text-gray-300 group">
                <div style={styles.contactIcon}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 text-sm" />
                </div>
                <span className="text-sm">KG 123 St, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 group">
                <div style={styles.contactIcon}>
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-sm" />
                </div>
                <a href="mailto:contact@rlg.org" className="text-sm hover:text-blue-400 transition">contact@rlg.org</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 group">
                <div style={styles.contactIcon}>
                  <FontAwesomeIcon icon={faPhone} className="text-blue-400 text-sm" />
                </div>
                <a href="tel:+250788123456" className="text-sm hover:text-blue-400 transition">+250 788 123 456</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 group">
                <div style={styles.contactIcon}>
                  <FontAwesomeIcon icon={faClock} className="text-blue-400 text-sm" />
                </div>
                <span className="text-sm">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faPaperPlane} className="text-blue-400" />
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleNewsletterSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  style={styles.newsletterInput}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
                <button 
                  type="submit"
                  style={styles.newsletterButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRight} className="text-white text-sm" />
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-400 text-sm">
            <p className="flex items-center gap-1">
              &copy; {currentYear} Rising Leaders of Generation. 
              <span className="hidden md:inline">All rights reserved.</span>
            </p>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <FontAwesomeIcon icon={faHeart} className="text-blue-400 text-xs" style={{ animation: 'gentlePulse 1.5s ease-in-out infinite' }} />
              <span>Made with passion for young leaders in Rwanda</span>
            </div>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition text-sm">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animation style */}
      <style>{`
        @keyframes gentlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .footer-link {
          transition: all 0.3s ease;
        }
        
        .social-icon {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .footer-wave svg {
            height: 30px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;