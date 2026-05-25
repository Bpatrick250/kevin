import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RLG
              </span>
              <span className="text-white font-semibold">Rising Leaders</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering the next generation of leaders to create meaningful change in their communities and beyond.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">📘</a>
              <a href="#" className="text-gray-400 hover:text-white transition">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white transition">📸</a>
              <a href="#" className="text-gray-400 hover:text-white transition">💼</a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/programs" className="text-gray-400 hover:text-white transition">Programs</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><Link to="/getinvolved" className="text-gray-400 hover:text-white transition">Volunteer</Link></li>
              <li><Link to="/getinvolved" className="text-gray-400 hover:text-white transition">Become a Mentor</Link></li>
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition">Donate</Link></li>
              <li><Link to="/programs" className="text-gray-400 hover:text-white transition">Join a Program</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <span>📍</span>
                <span>123 Leadership Ave, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <span>📧</span>
                <span>contact@rlg.org</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Rising Leaders of Generation. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;