import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faGlobe, 
  faUsers, 
  faCalendarAlt,
  faArrowRight,
  faRocket,
  faLightbulb,
  faHandshake,
  faChartLine,
  faTrophy,
  faHeart,
  faStar,
  faQuoteLeft,
  faCheckCircle,
  faVideo,
  faClock,
  faMapMarkerAlt,
  faEnvelope,
  faPlayCircle,
  faAward,
  faTree,
  faBookOpen,
  faLaptopCode,
  faComments,
  faBullhorn,
  faBuilding,
  faUserTie,
  faLeaf,
  faEye,
  faUsers as faUsersIcon
} from '@fortawesome/free-solid-svg-icons';
import { showSuccess, showToast, showInfo } from "../utils/alert";
import { 
  heroBg, 
  heroImage, 
  programIcon1,
  programIcon2,
  programIcon3,
  testimonial1,
  testimonial2,
  testimonial3 
} from "../assets";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counters, setCounters] = useState({
    members: 0,
    countries: 0,
    mentors: 0,
    events: 0
  });

  // Counter animation
  useEffect(() => {
    const targets = { members: 100, countries: 3, mentors: 20, events: 10 };
    const duration = 3000;
    const step = 20;
    const increment = {
      members: targets.members / (duration / step),
      countries: targets.countries / (duration / step),
      mentors: targets.mentors / (duration / step),
      events: targets.events / (duration / step)
    };
    
    let current = { members: 0, countries: 0, mentors: 0, events: 0 };
    const timer = setInterval(() => {
      current.members = Math.min(current.members + increment.members, targets.members);
      current.countries = Math.min(current.countries + increment.countries, targets.countries);
      current.mentors = Math.min(current.mentors + increment.mentors, targets.mentors);
      current.events = Math.min(current.events + increment.events, targets.events);
      setCounters({ ...current });
      
      if (current.members >= targets.members) clearInterval(timer);
    }, step);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleJoinNewsletter = () => {
    showSuccess("Subscribed! 🎉", "Thank you for joining our newsletter. You'll receive updates about leadership programs and events!");
  };

  const handleWatchVideo = () => {
    showInfo("Watch Our Story", "Check out our video to learn how RLG is transforming young leaders in Rwanda and beyond!");
  };

  const handleApplyNow = () => {
    showToast("Applications are now open! Navigate to Get Involved page to fill the application form.", "success");
  };

  const handleLearnMore = () => {
    showInfo("About RLG", "We are dedicated to nurturing the next generation of leaders in Rwanda through mentorship, training, and real-world projects.");
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "RLG Alumni 2024",
      text: "RLG transformed my leadership journey. The mentorship I received helped me launch my own non-profit organization!",
      rating: 5,
      image: testimonial1,
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Current Fellow",
      text: "The global network and resources provided by RLG are unmatched. I've connected with mentors from top companies worldwide.",
      rating: 5,
      image: testimonial2,
      initials: "MC"
    },
    {
      name: "Dr. Amina Patel",
      role: "Lead Mentor",
      text: "Working with RLG fellows has been incredibly rewarding. These young leaders are truly shaping our future.",
      rating: 5,
      image: testimonial3,
      initials: "AP"
    }
  ];

  const programs = [
    {
      title: "Leadership Accelerator",
      description: "12-week intensive program for emerging leaders ready to scale their impact.",
      duration: "12 Weeks",
      spots: "15 spots left",
      icon: faUserTie,
      color: "primary"
    },
    {
      title: "Young Entrepreneurs Hub",
      description: "Learn business skills, get mentorship, and launch your startup with funding opportunities.",
      duration: "6 Months",
      spots: "20 spots left",
      icon: faBuilding,
      color: "green"
    },
    {
      title: "Sustainability Champions",
      description: "Lead environmental projects and become a catalyst for green change in your community.",
      duration: "8 Weeks",
      spots: "10 spots left",
      icon: faLeaf,
      color: "secondary"
    }
  ];

  const upcomingEvents = [
    { title: "Leadership Summit 2025", date: "June 15, 2025", time: "9:00 AM - 6:00 PM", location: "Virtual + Kigali", spots: 150 },
    { title: "Design Thinking Workshop", date: "July 5, 2025", time: "2:00 PM - 5:00 PM", location: "Online", spots: 50 },
    { title: "Networking Gala", date: "August 20, 2025", time: "6:00 PM - 9:00 PM", location: "Kigali", spots: 200 }
  ];

  const partners = [
    "Google", "Microsoft", "UN Foundation", "Harvard", "MIT", "World Bank"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Parallel Content - No Gradient */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative'
        }}
      >
        {/* Dark Overlay for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}></div>
        
        <div className="container py-16 md:py-20" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
                <FontAwesomeIcon icon={faBullhorn} className="text-white" />
                <span className="text-white text-sm">Applications Open for 2025 Cohort</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Lead and Empower
                <span className="block text-green-light">
                  For Change
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-white opacity-95">
                Empowering the next generation of visionary leaders to create lasting impact 
                in their communities and beyond. Join 100+ young leaders in Rwanda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button onClick={handleApplyNow}>
                  <Button variant="primary" size="lg" icon={faRocket}>
                    Apply Now
                  </Button>
                </button>
                <button onClick={handleWatchVideo}>
                  <Button variant="outline" size="lg" icon={faPlayCircle}>
                    Watch Video
                  </Button>
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-light" />
                  <span className="text-white text-sm">Free to Apply</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-light" />
                  <span className="text-white text-sm">Scholarships Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-light" />
                  <span className="text-white text-sm">Global Recognition</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Young Leaders in Rwanda" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  style={{ maxHeight: '450px' }}
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-light rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-primary-blue rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="stat-card">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-white text-xl md:text-2xl" />
              </div>
              <div className="stat-number text-2xl md:text-4xl">{Math.floor(counters.members)}+</div>
              <div className="text-gray-600 text-sm md:text-base mt-2">Active Members</div>
              <div className="text-xs text-green mt-1">↑ 45% this year</div>
            </div>
            
            <div className="stat-card">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGlobe} className="text-white text-xl md:text-2xl" />
              </div>
              <div className="stat-number text-2xl md:text-4xl">{Math.floor(counters.countries)}+</div>
              <div className="text-gray-600 text-sm md:text-base mt-2">Countries</div>
              <div className="text-xs text-green mt-1">Global reach</div>
            </div>
            
            <div className="stat-card">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl md:text-2xl" />
              </div>
              <div className="stat-number text-2xl md:text-4xl">{Math.floor(counters.mentors)}+</div>
              <div className="text-gray-600 text-sm md:text-base mt-2">Expert Mentors</div>
              <div className="text-xs text-green mt-1">Industry leaders</div>
            </div>
            
            <div className="stat-card">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-xl md:text-2xl" />
              </div>
              <div className="stat-number text-2xl md:text-4xl">{Math.floor(counters.events)}+</div>
              <div className="text-gray-600 text-sm md:text-base mt-2">Events Yearly</div>
              <div className="text-xs text-green mt-1">Workshops & summits</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Short */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
                <FontAwesomeIcon icon={faEye} className="text-green" />
                <span className="text-green text-sm font-semibold">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Building Tomorrow's Leaders Today</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, Rising Leaders of Generation (RLG) has been at the forefront of youth leadership development in Rwanda. We believe that every young person has the potential to be a leader.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our programs combine world-class mentorship, practical projects, and a supportive community to help young leaders thrive and create lasting impact in their communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={handleLearnMore}>
                  <Button variant="primary" icon={faArrowRight} iconPosition="right">
                    Learn More About Us
                  </Button>
                </button>
                <Link to="/about">
                  <Button variant="outline" icon={faUserTie}>
                    Meet Our Team
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faBullhorn} size="3x" className="text-green mb-3" />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm">Empower young leaders with skills, networks, and opportunities.</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faEye} size="3x" className="text-primary-blue mb-3" />
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm">A world where every young person can lead positive change.</p>
              </div>
              <div className="card p-6 text-center col-span-2">
                <FontAwesomeIcon icon={faHeart} size="3x" className="text-secondary-blue mb-3" />
                <h3 className="text-xl font-bold mb-2">Our Values</h3>
                <p className="text-gray-600 text-sm">Integrity, Innovation, Collaboration, Excellence, and Impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Short Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <FontAwesomeIcon icon={faStar} className="text-green" />
              <span className="text-green text-sm font-semibold">Our Programs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Leadership Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our specialized programs designed to help you grow as a leader
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, index) => (
              <div key={index} className={`card p-6 text-center group hover:shadow-xl transition ${program.color === 'primary' ? 'card-primary' : program.color === 'green' ? 'card-green' : 'card-secondary'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  program.color === 'primary' ? 'bg-primary-blue' : program.color === 'green' ? 'bg-primary-green' : 'bg-secondary-blue'
                }`}>
                  <FontAwesomeIcon icon={program.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>📅 {program.duration}</span>
                  <span className="text-green font-semibold">{program.spots}</span>
                </div>
                <button onClick={handleApplyNow} className="btn btn-secondary w-full text-sm">
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/programs">
              <Button variant="outline" icon={faArrowRight} iconPosition="right">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <FontAwesomeIcon icon={faLightbulb} className="text-green" />
              <span className="text-green text-sm font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes RLG Different</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to grow as a leader and make a real impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center group hover:shadow-xl transition">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="text-left space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green text-xs" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <FontAwesomeIcon icon={faComments} className="text-white" />
              <span className="text-white text-sm">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Hear from young leaders who transformed their lives through RLG
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="testimonial-card bg-white text-gray-900 p-6 md:p-8 rounded-2xl shadow-xl">
              <FontAwesomeIcon icon={faQuoteLeft} size="2x" className="text-green-light mb-4 opacity-50" />
              <p className="text-lg md:text-xl mb-6 leading-relaxed">{testimonials[currentTestimonial].text}</p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].role}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentTestimonial ? 'bg-green w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-green" />
                <span className="text-green text-sm font-semibold">Don't Miss Out</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
            </div>
            <Link to="/events">
              <Button variant="outline" icon={faArrowRight} iconPosition="right">
                View All Events
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-primary rounded-lg p-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-xl" />
                  </div>
                  <span className="badge badge-green">{event.spots} spots left</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="text-green text-sm" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green text-sm" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <button onClick={handleApplyNow} className="btn btn-secondary w-full">
                  Register Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
                <FontAwesomeIcon icon={faTrophy} className="text-green" />
                <span className="text-green text-sm font-semibold">Our Impact</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference in Rwanda</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Since 2020, RLG has been committed to developing the next generation of leaders 
                who are creating positive change in their communities across Rwanda.
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Community Projects Completed</span>
                    <span className="text-green font-bold">150+</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Mentorship Hours Provided</span>
                    <span className="text-green font-bold">10,000+</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Youth Employed/Placed</span>
                    <span className="text-green font-bold">2,000+</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faTree} size="2x" className="text-green mb-3" />
                <div className="stat-number text-2xl md:text-3xl">5,000+</div>
                <p className="text-gray-600 text-sm">Trees Planted</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faBookOpen} size="2x" className="text-green mb-3" />
                <div className="stat-number text-2xl md:text-3xl">50+</div>
                <p className="text-gray-600 text-sm">Scholarships</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faLaptopCode} size="2x" className="text-green mb-3" />
                <div className="stat-number text-2xl md:text-3xl">30+</div>
                <p className="text-gray-600 text-sm">Tech Workshops</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faAward} size="2x" className="text-green mb-3" />
                <div className="stat-number text-2xl md:text-3xl">25+</div>
                <p className="text-gray-600 text-sm">Awards Won</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Trusted By Leading Organizations</h3>
            <p className="text-gray-600">Join 100+ partners who believe in our mission</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faHandshake} className="text-gray-400 text-2xl" />
                </div>
                <span className="text-sm text-gray-600">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="newsletter text-center p-6 md:p-12">
            <FontAwesomeIcon icon={faEnvelope} size="3x" className="mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with RLG</h3>
            <p className="text-base md:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter for leadership tips, event announcements, and success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-white text-gray-900"
              />
              <button onClick={handleJoinNewsletter} className="btn btn-primary whitespace-nowrap">
                Subscribe Now
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
            <p className="text-xs md:text-sm mt-4 opacity-75">
              <FontAwesomeIcon icon={faHeart} className="mr-1" />
              No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Leadership Journey?</h2>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join young leaders who are making a difference in Rwanda and around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleApplyNow}>
              <Button variant="outline" size="lg" icon={faRocket}>
                Apply for Programs
              </Button>
            </button>
            <Link to="/contact">
              <Button variant="secondary" size="lg" icon={faComments}>
                Talk to an Advisor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: faLightbulb,
    title: "World-Class Mentorship",
    description: "Learn from industry leaders and experienced professionals who guide your growth journey.",
    points: ["1-on-1 mentoring sessions", "Career guidance", "Networking opportunities", "Personalized feedback"]
  },
  {
    icon: faGlobe,
    title: "Global Community",
    description: "Connect with like-minded peers from around the world and build lasting networks.",
    points: ["3+ countries represented", "Cultural exchange programs", "Global conferences", "Online community platform"]
  },
  {
    icon: faChartLine,
    title: "Real Projects",
    description: "Work on impactful initiatives that create tangible change in communities.",
    points: ["Social impact projects", "Leadership portfolios", "Funding opportunities", "Recognition awards"]
  }
];

export default Home;