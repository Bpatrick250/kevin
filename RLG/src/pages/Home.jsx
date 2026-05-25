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
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { showSuccess, showToast } from "../utils/alert";

const Home = () => {
  const handleJoinClick = () => {
    showToast("Welcome! Thanks for joining RLG community!", "success");
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Rise Above.
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Lead Tomorrow.
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-left">
            Empowering the next generation of visionary leaders to create lasting impact 
            in their communities and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-right">
            <Link to="/programs">
              <Button variant="primary" size="lg" icon={faRocket}>
                Explore Programs
              </Button>
            </Link>
            <button onClick={handleJoinClick}>
              <Button variant="outline" size="lg" icon={faUsers}>
                Join Movement
              </Button>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-card">
              <FontAwesomeIcon icon={faUsers} size="3x" className="text-green mb-3" />
              <div className="stat-number">5,000+</div>
              <div className="text-gray-600 mt-2">Active Members</div>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faGlobe} size="3x" className="text-blue mb-3" />
              <div className="stat-number">50+</div>
              <div className="text-gray-600 mt-2">Countries</div>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faGraduationCap} size="3x" className="text-green mb-3" />
              <div className="stat-number">200+</div>
              <div className="text-gray-600 mt-2">Expert Mentors</div>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="text-blue mb-3" />
              <div className="stat-number">100+</div>
              <div className="text-gray-600 mt-2">Events Yearly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">Why Join RLG?</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide the tools, community, and opportunities you need to grow as a leader.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={feature.icon} size="2x" className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of young leaders who are making a difference around the world.
          </p>
          <Link to="/getinvolved">
            <Button variant="outline" size="lg" icon={faArrowRight} iconPosition="right">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: faLightbulb,
    title: "World-Class Mentorship",
    description: "Learn from industry leaders and experienced professionals who guide your growth journey."
  },
  {
    icon: faGlobe,
    title: "Global Community",
    description: "Connect with like-minded peers from around the world and build lasting networks."
  },
  {
    icon: faChartLine,
    title: "Real Projects",
    description: "Work on impactful initiatives that create tangible change in communities."
  }
];

export default Home;