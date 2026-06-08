import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap, faGlobe, faUsers, faCalendarAlt, faArrowRight,
  faRocket, faLightbulb, faHandshake, faChartLine, faTrophy,
  faHeart, faStar, faQuoteLeft, faCheckCircle, faClock,
  faMapMarkerAlt, faEnvelope, faPlayCircle, faAward, faTree,
  faBookOpen, faLaptopCode, faComments, faBullhorn, faBuilding,
  faUserTie, faLeaf, faEye, faStarHalfAlt, faSchool,
  faMicrophone, faChalkboardUser, faSpinner
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg, heroImage } from "../assets";
import api from "../services/api";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [stats, setStats] = useState({ members: 0, countries: 3, mentors: 20, events: 10 });
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [testimonialsRes, programsRes, eventsRes] = await Promise.all([
        api.getTestimonials(),
        api.getPrograms(),
        api.getUpcomingEvents()
      ]);
      
      setTestimonials(testimonialsRes.data || []);
      setPrograms(programsRes.data || []);
      setUpcomingEvents(eventsRes.data || []);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load content. Please refresh the page.',
        confirmButtonColor: '#22c55e'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({ icon: 'warning', title: 'Email Required', text: 'Please enter your email address.', confirmButtonColor: '#22c55e' });
      return;
    }
    
    try {
      await api.subscribeNewsletter(email);
      Swal.fire({ icon: 'success', title: 'Subscribed! 🎉', text: 'Thank you for subscribing!', confirmButtonColor: '#22c55e', timer: 3000 });
      setEmail("");
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message, confirmButtonColor: '#22c55e' });
    }
  };

  const handleApply = () => {
    Swal.fire({ icon: 'info', title: 'Applications Open', text: 'Navigate to Get Involved page to apply.', confirmButtonColor: '#22c55e' });
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#22c55e" />
        <p style={{ marginTop: '20px' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="rlg-home pt-16">
      <style>{`
        .rlg-home { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
        .rlg-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }
        .hero { position: relative; min-height: 90vh; display: flex; align-items: center; background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%); overflow: hidden; }
        .hero::before { content:''; position:absolute; inset:0; background: url(${heroBg}) center/cover no-repeat; opacity:.12; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 2; padding: 5rem 0; }
        @media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 2rem; } }
        .hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 1.2rem; }
        .hero h1 span { background: linear-gradient(135deg, #4ade80, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; display: block; }
        .hero p { color: rgba(255,255,255,.85); font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; }
        .btn-primary { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 0.8rem 1.8rem; border-radius: 999px; font-weight: 600; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,0.3); }
        .btn-outline { background: transparent; color: white; padding: 0.8rem 1.8rem; border-radius: 999px; font-weight: 600; border: 2px solid rgba(255,255,255,0.5); cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; transform: translateY(-2px); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; padding: 4rem 0; background: #fff; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-card { text-align: center; padding: 2rem; border-radius: 1rem; border: 1px solid #e5e7eb; transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .stat-number { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #14532d, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .programs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        @media (max-width: 900px) { .programs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .programs-grid { grid-template-columns: 1fr; } }
        .program-card { background: #fff; border-radius: 1rem; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.3s ease; }
        .program-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
        .testimonial-card { background: #fff; border-radius: 1rem; padding: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.15); max-width: 800px; margin: 2rem auto; }
        .newsletter { background: linear-gradient(135deg, #14532d, #0a2a1a); border-radius: 1.5rem; padding: 3rem; text-align: center; color: white; }
        .loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="rlg-container">
          <div className="hero-grid">
            <div>
              <h1>Lead and Empower <span>For Change</span></h1>
              <p>Raising Leaders of Generation (RLG) nurtures visionary, action-driven young people through social impact, mental transformation, and moral integrity.</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={handleApply}><FontAwesomeIcon icon={faRocket} /> Apply Now</button>
                <Link to="/programs"><button className="btn-outline"><FontAwesomeIcon icon={faPlayCircle} /> Our Programs</button></Link>
              </div>
            </div>
            <div><img src={heroImage} alt="Young Leaders" style={{ width: "100%", borderRadius: "1rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }} /></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-number">100+</div><div>Youth Reached</div></div>
        <div className="stat-card"><div className="stat-number">10+</div><div>Schools Partnered</div></div>
        <div className="stat-card"><div className="stat-number">5+</div><div>Annual Events</div></div>
        <div className="stat-card"><div className="stat-number">3</div><div>Core Programs</div></div>
      </section>

      {/* Programs Section */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}><h2 className="rlg-section-title">Our Programs</h2></div>
          <div className="programs-grid">
            {programs.slice(0, 3).map((program, i) => (
              <div key={i} className="program-card">
                <div className="rlg-prog-icon"><FontAwesomeIcon icon={faUserTie} /></div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <Link to={`/programs/${program.slug}`}><button className="btn-primary" style={{ marginTop: "1rem" }}>Learn More →</button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={{ background: "#14532d", padding: "5rem 0", color: "white" }}>
          <div className="rlg-container">
            <div className="testimonial-card">
              <FontAwesomeIcon icon={faQuoteLeft} size="2x" style={{ color: "#22c55e", opacity: 0.5, marginBottom: "1rem" }} />
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>{testimonials[currentTestimonial]?.content}</p>
              <div style={{ marginTop: "1.5rem" }}>
                <strong>{testimonials[currentTestimonial]?.name}</strong>
                <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{testimonials[currentTestimonial]?.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section style={{ padding: "5rem 0" }}>
        <div className="rlg-container">
          <div className="newsletter">
            <FontAwesomeIcon icon={faEnvelope} size="3x" style={{ marginBottom: "1rem" }} />
            <h3>Stay Updated with RLG</h3>
            <form onSubmit={handleNewsletter} style={{ display: "flex", gap: "1rem", maxWidth: "500px", margin: "1rem auto 0" }}>
              <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, padding: "0.8rem", borderRadius: "999px", border: "none" }} />
              <button type="submit" className="btn-primary">Subscribe <FontAwesomeIcon icon={faArrowRight} /></button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;