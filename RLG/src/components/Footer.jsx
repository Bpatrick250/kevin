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
  faArrowRight
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

  const socialLinks = [
    { icon: faFacebook, href: "https://facebook.com", label: "Facebook", color: "#1877f2" },
    { icon: faTwitter, href: "https://twitter.com", label: "Twitter", color: "#1da1f2" },
    { icon: faInstagram, href: "https://instagram.com", label: "Instagram", color: "#e4405f" },
    { icon: faLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
    { icon: faYoutube, href: "https://youtube.com", label: "YouTube", color: "#ff0000" }
  ];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src={logo} 
                alt="RLG Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-xl font-bold text-white">Rising Leaders</span>
                <span className="text-xs text-gray-300 block -mt-1">of Generation</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Empowering the next generation of leaders to create meaningful change in their communities and beyond.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-white text-lg" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green mt-1"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-green transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green transition-all duration-300"></span>
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
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green mt-1"></span>
            </h4>
            <ul className="space-y-3">
              {getInvolvedLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-green transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green mt-1"></span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green mt-1" />
                <span className="text-sm">KG 123 St, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FontAwesomeIcon icon={faEnvelope} className="text-green" />
                <a href="mailto:contact@rlg.org" className="hover:text-green transition">contact@rlg.org</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FontAwesomeIcon icon={faPhone} className="text-green" />
                <a href="tel:+250788123456" className="hover:text-green transition">+250 788 123 456</a>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faPaperPlane} className="text-green" />
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleNewsletterSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 text-sm rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green"
                  required
                />
                <button 
                  type="submit"
                  className="bg-green hover:bg-green-dark px-4 py-2 rounded-r-lg transition-all duration-300 hover:scale-105"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="text-white" />
                </button>
              </form>
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
              <FontAwesomeIcon icon={faHeart} className="text-green text-xs" />
              <span>Made with passion for young leaders in Rwanda</span>
            </div>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-green transition">Privacy Policy</a>
              <a href="#" className="hover:text-green transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;