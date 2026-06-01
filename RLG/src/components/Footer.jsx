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

  return (
    <footer className="footer">
      {/* Top Wave Decoration */}
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#FEFEFE" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
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
                  className="social-icon w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={social.label}
                  style={{ '--hover-color': social.color }}
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="text-white text-base transition-all duration-300 group-hover:text-[var(--hover-color)]" 
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 mt-1 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group text-sm"
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
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Get Involved
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 mt-1 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group text-sm"
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
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 mt-1 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group text-sm"
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
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500 mt-1 rounded-full"></span>
            </h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3 text-gray-300 group">
                <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 text-sm group-hover:text-white transition" />
                </div>
                <span className="text-sm">KG 123 St, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 group">
                <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-sm group-hover:text-white transition" />
                </div>
                <a href="mailto:contact@rlg.org" className="text-sm hover:text-blue-400 transition">contact@rlg.org</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 group">
                <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-400 text-sm group-hover:text-white transition" />
                </div>
                <a href="tel:+250788123456" className="text-sm hover:text-blue-400 transition">+250 788 123 456</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 group">
                <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <FontAwesomeIcon icon={faClock} className="text-blue-400 text-sm group-hover:text-white transition" />
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
                  className="flex-1 px-4 py-2 text-sm rounded-l-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
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
      <div className="border-t border-white border-opacity-10 mt-4">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-400 text-sm">
            <p className="flex items-center gap-1">
              &copy; {currentYear} Rising Leaders of Generation. 
              <span className="hidden md:inline">All rights reserved.</span>
            </p>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <FontAwesomeIcon icon={faHeart} className="text-blue-400 text-xs animate-pulse" />
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
    </footer>
  );
};

export default Footer;