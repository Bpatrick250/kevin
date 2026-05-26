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
  faPhone,
  faPlayCircle,
  faUserGraduate,
  faAward,
  faTree,
  faBookOpen,
  faLaptopCode,
  faComments,
  faThumbsUp,
  faNewspaper,
  faBullhorn,
  faUsers as faUsersIcon
} from '@fortawesome/free-solid-svg-icons';
import { showSuccess, showToast, showInfo } from "../utils/alert";
import { 
  heroBg, 
  heroImage, 
  patternBg, 
  dotsPattern,
  programIcon1,
  programIcon2,
  programIcon3,
  testimonial1,
  testimonial2,
  testimonial3 
} from "../assets";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({
    members: 0,
    countries: 0,
    mentors: 0,
    events: 0
  });

  // Counter animation
  useEffect(() => {
    const targets = { members: 100, countries: 3, mentors: 20, events: 10 };
    const duration = 5000;
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

  const handleJoinNewsletter = () => {
    showSuccess("Subscribed! 🎉", "Thank you for joining our newsletter. You'll receive updates about leadership programs and events!");
  };

  const handleWatchVideo = () => {
    showInfo("Watch Our Story", "Check out our video to learn how RLG is transforming young leaders worldwide!");
  };

  const handleApplyNow = () => {
    showToast("Applications are now open! Apply today to join our next cohort.", "success");
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

  const upcomingEvents = [
    { title: "Leadership Summit 2025", date: "June 15, 2025", time: "9:00 AM - 6:00 PM", location: "Virtual + NYC", spots: 150 },
    { title: "Design Thinking Workshop", date: "July 5, 2025", time: "2:00 PM - 5:00 PM", location: "Online", spots: 50 },
    { title: "Networking Gala", date: "August 20, 2025", time: "6:00 PM - 9:00 PM", location: "New York", spots: 200 }
  ];

  const partners = [
    "Google", "Microsoft", "UN Foundation", "Harvard", "MIT", "World Bank"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Background Image */}
      <section 
        className="hero"
        style={{
          backgroundImage: ` url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container text-center py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              
           
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Lead and Empower For Change
            
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-left">
              Empowering the next generation of visionary leaders to create lasting impact 
              in their communities and beyond. Join 100+ young leaders in Rwanda.
            </p>
            
            <div className=" justify-center animate-slide-right">
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
            
            {/* Hero Image */}
            <div className="mt-12">
              <img 
                src={heroImage} 
                alt="Young Leaders" 
                className="mx-auto rounded-2xl shadow-2xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Icons */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-white text-2xl" />
              </div>
              <div className="stat-number">{Math.floor(counters.members)}+</div>
              <div className="text-gray-600 mt-2">Active Members</div>
              <div className="text-sm text-green mt-1">↑ 45% this year</div>
            </div>
            
            <div className="stat-card">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGlobe} className="text-white text-2xl" />
              </div>
              <div className="stat-number">{Math.floor(counters.countries)}+</div>
              <div className="text-gray-600 mt-2">Countries</div>
              <div className="text-sm text-green mt-1">6 continents</div>
            </div>
            
            <div className="stat-card">
              <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-2xl" />
              </div>
              <div className="stat-number">{Math.floor(counters.mentors)}+</div>
              <div className="text-gray-600 mt-2">Expert Mentors</div>
              <div className="text-sm text-green mt-1">Top industry leaders</div>
            </div>
            
            <div className="stat-card">
              <div className="w-16 h-16 bg-gradient-green rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-2xl" />
              </div>
              <div className="stat-number">{Math.floor(counters.events)}+</div>
              <div className="text-gray-600 mt-2">Events Yearly</div>
              <div className="text-sm text-green mt-1">100+ workshops</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Program Icons */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <FontAwesomeIcon icon={faStar} className="text-green" />
              <span className="text-green text-sm font-semibold">Why Choose RLG</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Transform Your Leadership Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to grow as a leader and make a real impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group hover:shadow-xl transition">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-20 h-20 mx-auto mb-4 object-contain group-hover:scale-110 transition"
                />
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
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

      {/* Testimonials Section with Images */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <FontAwesomeIcon icon={faComments} className="text-white" />
              <span className="text-white text-sm">Success Stories</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Hear from young leaders who transformed their lives through RLG
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="testimonial-card bg-white text-gray-900 p-8 rounded-2xl shadow-xl">
              <FontAwesomeIcon icon={faQuoteLeft} size="3x" className="text-green-light mb-4 opacity-50" />
              <p className="text-xl mb-6 leading-relaxed">{testimonials[currentTestimonial].text}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
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
                        idx === currentTestimonial ? 'bg-green w-4' : 'bg-gray-300'
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
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-light bg-opacity-20 rounded-full px-4 py-2 mb-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-green" />
                <span className="text-green text-sm font-semibold">Don't Miss Out</span>
              </div>
              <h2 className="text-4xl font-bold">Upcoming Events</h2>
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
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
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
              <h2 className="text-4xl font-bold mb-4">Making a Difference Worldwide</h2>
              <p className="text-gray-600 mb-6">
                Since 2020, RLG has been committed to developing the next generation of leaders 
                who are creating positive change in their communities.
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
                <FontAwesomeIcon icon={faTree} size="3x" className="text-green mb-3" />
                <div className="stat-number">5,000+</div>
                <p className="text-gray-600 text-sm">Trees Planted</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-green mb-3" />
                <div className="stat-number">50+</div>
                <p className="text-gray-600 text-sm">Scholarships</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faLaptopCode} size="3x" className="text-green mb-3" />
                <div className="stat-number">30+</div>
                <p className="text-gray-600 text-sm">Tech Workshops</p>
              </div>
              <div className="card p-6 text-center">
                <FontAwesomeIcon icon={faAward} size="3x" className="text-green mb-3" />
                <div className="stat-number">25+</div>
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
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faHandshake} className="text-gray-400 text-3xl" />
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
          <div className="newsletter text-center">
            <FontAwesomeIcon icon={faEnvelope} size="3x" className="mb-4" />
            <h3 className="text-3xl font-bold mb-4">Stay Updated with RLG</h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter for leadership tips, event announcements, and success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-white text-gray-900"
              />
              <button onClick={handleJoinNewsletter} className="btn btn-primary">
                Subscribe Now
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              <FontAwesomeIcon icon={faHeart} className="mr-1" />
              No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Leadership Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of young leaders who are making a difference around the world.
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
    icon: programIcon1,
    title: "World-Class Mentorship",
    description: "Learn from industry leaders and experienced professionals who guide your growth journey.",
    points: ["1-on-1 mentoring sessions", "Career guidance", "Networking opportunities", "Personalized feedback"]
  },
  {
    icon: programIcon2,
    title: "Global Community",
    description: "Connect with like-minded peers from around the world and build lasting networks.",
    points: ["50+ countries represented", "Cultural exchange programs", "Global conferences", "Online community platform"]
  },
  {
    icon: programIcon3,
    title: "Real Projects",
    description: "Work on impactful initiatives that create tangible change in communities.",
    points: ["Social impact projects", "Leadership portfolios", "Funding opportunities", "Recognition awards"]
  }
];

export default Home;