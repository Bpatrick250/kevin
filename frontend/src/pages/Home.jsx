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
  faMicrophone, faChalkboardUser, faPeopleGroup, faBrain,
  faFlag, faHandshakeSimple, faMedal, faFire, faNewspaper,
  faShieldHeart, faSeedling, faHandsHelping, faCompass,
  faGem, faDove, faHandSpock, faSmile
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  heroBg, heroImage, testimonial1, testimonial2, testimonial3,
} from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });
const showToast = (message, icon = "success") =>
  Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true })
    .fire({ icon, title: message });

/* ─── API Service ─────────────────────────────────────────────── */
const API_URL = 'http://localhost:5000/api';

const api = {
  subscribeNewsletter: async (email) => {
    const response = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
  getTestimonials: async () => {
    try {
      const response = await fetch(`${API_URL}/testimonials`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return [];
    }
  },
  getPrograms: async () => {
    try {
      const response = await fetch(`${API_URL}/programs`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return [];
    }
  },
  getStats: async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/stats`);
      const data = await response.json();
      return data.data || {};
    } catch (error) {
      return {};
    }
  }
};

/* ─── Data ────────────────────────────────────────────────────── */
const coreValues = [
  { name: "Discipline", icon: faCompass, color: "#14532d", description: "Self-control and dedication to excellence" },
  { name: "Commitment & Courage", icon: faShieldHeart, color: "#166534", description: "Bold actions and unwavering dedication" },
  { name: "Loyalty", icon: faDove, color: "#15803d", description: "Faithful dedication to our mission" },
  { name: "Passion", icon: faFire, color: "#16a34a", description: "Enthusiasm that drives change" },
  { name: "Sociable", icon: faSmile, color: "#22c55e", description: "Building meaningful connections" },
  { name: "Team Work", icon: faHandshake, color: "#14532d", description: "Collaboration for greater impact" },
  { name: "Competence & Excellence", icon: faGem, color: "#166534", description: "Mastery and outstanding quality" },
  { name: "Respect", icon: faHandSpock, color: "#15803d", description: "Valuing every individual's dignity" },
  { name: "Dignity", icon: faMedal, color: "#16a34a", description: "Honorable conduct and self-worth" },
  { name: "Empathy", icon: faHandsHelping, color: "#22c55e", description: "Understanding and serving others" },
];

const blogPosts = [
  {
    title: "Why Mental Transformation is the First Step to Leadership",
    excerpt: "Understanding leadership starts from within. Here's how RLG is helping young people rewire their minds for impact.",
    date: "May 15, 2025",
    link: "/blog/mental-transformation"
  },
  {
    title: "Recap: Light the Flame Debate Competition 2025",
    excerpt: "Students from 5 schools battled in public speaking. See the winners and highlights.",
    date: "April 28, 2025",
    link: "/blog/light-the-flame-2025"
  }
];

/* ─── useCountUp hook ─────────────────────────────────────────── */
function useCountUp(target, duration = 2800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

/* ─── Component ───────────────────────────────────────────────── */
export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [backendTestimonials, setBackendTestimonials] = useState([]);
  const [backendPrograms, setBackendPrograms] = useState([]);
  const [backendStats, setBackendStats] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const youthReached = useCountUp(backendStats.totalUsers || 1500);
  const schoolsPartnered = useCountUp(backendStats.totalBlogs || 10);
  const annualEvents = useCountUp(5);
  const corePrograms = useCountUp(3);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      const [testimonialsData, programsData, statsData] = await Promise.all([
        api.getTestimonials(),
        api.getPrograms(),
        api.getStats()
      ]);
      
      if (testimonialsData.length > 0) {
        setBackendTestimonials(testimonialsData);
      }
      if (programsData.length > 0) {
        setBackendPrograms(programsData);
      }
      if (statsData) {
        setBackendStats(statsData);
      }
      setDataLoaded(true);
    };
    fetchData();
  }, []);

  // Use backend testimonials if available, otherwise use static ones
  const activeTestimonials = backendTestimonials.length > 0 ? backendTestimonials : [
    { name: "Mukeshimana Kevin", role: "RLG Club Member at ESSA NYARUGUNGA 2026", text: "RLG transformed my leadership journey. The mentorship I received helped me gain more public speaking skills!", rating: 5, initials: "MK" },
    { name: "Joshua Chris. K", role: "Founder & Executive Director", text: "There is a gap in understanding the dynamics and mysteries of leadership responsibilities, especially in young people. RLG fills that gap.", rating: 5, initials: "JK" },
    { name: "Dr. Amina Patel", role: "Lead Mentor", text: "Working with RLG fellows has been incredibly rewarding. These young leaders are truly shaping our future.", rating: 5, initials: "AP" },
  ];

  useEffect(() => {
    const id = setInterval(() => setCurrentTestimonial(p => (p + 1) % activeTestimonials.length), 5000);
    return () => clearInterval(id);
  }, [activeTestimonials.length]);

  const handleApply = () =>
    showToast("Applications are open! Head to Get Involved to apply.", "success");
  const handleWatch = () =>
    showInfo("Watch Our Story", "Check out our video to see how RLG is transforming young leaders in Rwanda and beyond!");
  const handleLearn = () =>
    showInfo("About RLG", "We are dedicated to nurturing the next generation of leaders in Rwanda through mentorship, training, and real-world projects.");
  
  // Updated newsletter handler with backend API
  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return showToast("Please enter your email address.", "warning");
    
    try {
      await api.subscribeNewsletter(email);
      showSuccess("Subscribed! 🎉", "Thank you for joining our newsletter. You'll receive updates about leadership programs and events!");
      setEmail("");
    } catch (error) {
      showToast(error.message || "Subscription failed. Please try again.", "error");
    }
  };
  
  const handleDonate = () => {
    showInfo("Support RLG", "Your donation helps us empower more young leaders across Rwanda.");
  };

  // Get the current testimonial text
  const currentTestimonialData = activeTestimonials[currentTestimonial] || activeTestimonials[0];

  return (
    <div className="rlg-home pt-16">
      <style>{`
        /* ── Reset & tokens ── */
        .rlg-home { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
        :root {
          --green-900: #14532d;
          --green-800: #166534;
          --green-700: #15803d;
          --green-600: #16a34a;
          --green-500: #22c55e;
          --green-400: #4ade80;
          --green-100: #dcfce7;
          --green-50:  #f0fdf4;
          --cream:     #fafaf8;
          --shadow-sm: 0 2px 8px rgba(21,128,61,.10);
          --shadow-md: 0 8px 30px rgba(21,128,61,.15);
          --shadow-lg: 0 20px 60px rgba(21,128,61,.20);
          --radius:    1rem;
          --transition: .3s cubic-bezier(.4,0,.2,1);
        }

        /* ── Animations ── */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:none } }
        @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes glow     { 0%,100%{box-shadow:0 0 5px rgba(34,197,94,.3)} 50%{box-shadow:0 0 20px rgba(34,197,94,.6)} }

        .fade-up   { animation: fadeUp .7s both; }
        .fade-up-1 { animation: fadeUp .7s .1s both; }
        .fade-up-2 { animation: fadeUp .7s .2s both; }
        .fade-up-3 { animation: fadeUp .7s .3s both; }
        .float { animation: floatBob 4s ease-in-out infinite; }

        /* ── Layout ── */
        .rlg-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }

        /* ── Hero ── */
        .rlg-hero {
          position: relative; min-height: 90vh; display: flex; align-items: center;
          background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%);
          overflow: hidden;
        }
        .rlg-hero::before {
          content:''; position:absolute; inset:0;
          background: url(${heroBg}) center/cover no-repeat;
          opacity:.12;
        }
        .rlg-hero-grid { display: grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; position:relative; z-index:2; padding:5rem 0; }
        @media(max-width:768px){ .rlg-hero-grid{grid-template-columns:1fr;gap:2rem;padding:3rem 0;text-align:center;} }
        .rlg-hero-badge {
          display:inline-flex;align-items:center;gap:.5rem;
          background:rgba(255,255,255,.12);backdrop-filter:blur(8px);
          border:1px solid rgba(255,255,255,.2);border-radius:999px;
          padding:.4rem 1rem;margin-bottom:1.5rem;color:#fff;font-size:.85rem;
        }
        .rlg-hero h1 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2.4rem,5vw,3.8rem); font-weight:800; color:#fff; line-height:1.15; margin-bottom:1.2rem; }
        .rlg-hero h1 span { background: linear-gradient(135deg, #4ade80, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; display:block; }
        .rlg-hero p { color:rgba(255,255,255,.85); font-size:1.1rem; line-height:1.7; margin-bottom:2rem; max-width:520px; }
        @media(max-width:768px){ .rlg-hero p{ margin:0 auto 2rem; } }
        
        /* ── Enhanced Buttons ── */
        .rlg-hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        @media(max-width:768px){ .rlg-hero-buttons { justify-content: center; } }
        
        .btn-primary-rlg {
          display:inline-flex;align-items:center;gap:.6rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color:#fff;
          padding:.9rem 2rem;
          border-radius:999px;
          font-weight:700;
          font-size:1rem;
          border:none;
          cursor:pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(34,197,94,0.3);
          position: relative;
          overflow: hidden;
        }
        .btn-primary-rlg::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .btn-primary-rlg:hover::before {
          width: 300px;
          height: 300px;
        }
        .btn-primary-rlg:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(34,197,94,0.5);
        }
        .btn-primary-rlg:active {
          transform: translateY(0);
        }
        
        .btn-outline-rlg {
          display:inline-flex;align-items:center;gap:.6rem;
          background:transparent;
          color:#fff;
          padding:.9rem 2rem;
          border-radius:999px;
          font-weight:700;
          font-size:1rem;
          border:2px solid rgba(255,255,255,0.5);
          cursor:pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-outline-rlg:hover {
          background:rgba(255,255,255,0.15);
          border-color:#fff;
          transform:translateY(-2px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        
        .btn-white-rlg {
          display:inline-flex;align-items:center;gap:.6rem;
          background:#fff;
          color:#14532d;
          padding:.9rem 2rem;
          border-radius:999px;
          font-weight:700;
          font-size:1rem;
          border:none;
          cursor:pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .btn-white-rlg:hover {
          transform:translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          background: #f0fdf4;
        }
        
        .btn-ghost-rlg {
          display:inline-flex;align-items:center;gap:.5rem;
          background:transparent;
          color:#15803d;
          padding:.7rem 1.5rem;
          border-radius:999px;
          font-weight:600;
          font-size:.9rem;
          border:2px solid #15803d;
          cursor:pointer;
          transition: all 0.3s ease;
        }
        .btn-ghost-rlg:hover {
          background:#15803d;
          color:#fff;
          transform:translateY(-2px);
          gap:.8rem;
        }
        
        .rlg-hero-links { display: flex; gap: 1.5rem; flex-wrap: wrap; color: rgba(255,255,255,.7); font-size: .9rem; }
        .rlg-hero-links a { color: #4ade80; text-decoration: none; transition: color .3s; }
        .rlg-hero-links a:hover { color: #fff; }
        
        /* ── Trust Indicators ── */
        .rlg-trust { display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem; }
        @media(max-width:768px){ .rlg-trust{justify-content:center;} }
        .rlg-trust-item { display:flex;align-items:center;gap:.4rem;color:rgba(255,255,255,.8);font-size:.85rem; }
        .rlg-trust-item svg { color:#4ade80; }

        .rlg-hero-img-wrap { position:relative; }
        .rlg-hero-img-wrap img {
          width:100%;border-radius:var(--radius);box-shadow:var(--shadow-lg);
          max-height:460px;object-fit:cover;
        }
        .rlg-hero-img-wrap::before {
          content:'';position:absolute;inset:-12px;border-radius:calc(var(--radius)+12px);
          border:2px solid rgba(34,197,94,.25);z-index:-1;
        }
        .rlg-hero-card {
          position:absolute;bottom:-1.2rem;left:-1.2rem;
          background:#fff;border-radius:.75rem;padding:1rem 1.25rem;
          box-shadow:var(--shadow-md);display:flex;align-items:center;gap:.75rem;
          animation:fadeUp .7s .5s both;
        }
        @media(max-width:768px){ .rlg-hero-card{display:none;} }
        .rlg-hero-card-dot { width:2.5rem;height:2.5rem;border-radius:50%;background:linear-gradient(135deg, #22c55e, #16a34a);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .rlg-hero-card b { display:block;font-size:1rem;color:var(--green-800); }
        .rlg-hero-card span { font-size:.75rem;color:#666; }

        /* ── Stats Cards ── */
        .rlg-stats { background:#fff; padding:4rem 0; }
        .rlg-stats-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem; }
        @media(max-width:640px){ .rlg-stats-grid{grid-template-columns:1fr 1fr;} }
        .rlg-stat-card {
          text-align:center;padding:2rem 1rem;border-radius:var(--radius);
          border:1px solid #e5e7eb;transition:var(--transition);position:relative;overflow:hidden;
          background:#fff;
        }
        .rlg-stat-card::before {
          content:'';position:absolute;bottom:0;left:0;right:0;height:4px;
          background:linear-gradient(90deg, #22c55e, #16a34a);
          transform:scaleX(0);transform-origin:left;transition:var(--transition);
        }
        .rlg-stat-card:hover { box-shadow:var(--shadow-md);transform:translateY(-6px); }
        .rlg-stat-card:hover::before { transform:scaleX(1); }
        .rlg-stat-icon { 
          width:4rem;height:4rem;border-radius:50%;background:linear-gradient(135deg, #dcfce7, #f0fdf4);
          display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;
          transition:var(--transition);
        }
        .rlg-stat-card:hover .rlg-stat-icon { background:linear-gradient(135deg, #22c55e, #16a34a); transform:scale(1.1); }
        .rlg-stat-card:hover .rlg-stat-icon svg { color:#fff !important; }
        .rlg-stat-num { font-family:'Playfair Display',Georgia,serif;font-size:2.5rem;font-weight:800;background:linear-gradient(135deg, #14532d, #22c55e);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1; }
        .rlg-stat-label { color:#6b7280;font-size:.9rem;margin-top:.4rem;font-weight:600; }

        /* ── Section Label ── */
        .rlg-label {
          display:inline-flex;align-items:center;gap:.5rem;
          background:linear-gradient(135deg, #dcfce7, #f0fdf4);
          color:#14532d;
          padding:.5rem 1.25rem;
          border-radius:999px;
          font-size:.8rem;
          font-weight:700;
          letter-spacing:.05em;
          text-transform:uppercase;
          margin-bottom:1rem;
          border:1px solid rgba(34,197,94,0.3);
        }
        .rlg-section-title { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:#111;margin-bottom:.75rem; }
        .rlg-section-sub { color:#6b7280;font-size:1rem;line-height:1.7;max-width:580px; }

        /* ── Mission Quote ── */
        .rlg-mission-quote {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-left: 4px solid #22c55e;
          padding: 2rem;
          border-radius: var(--radius);
          margin: 2rem 0;
          font-style: italic;
          box-shadow: var(--shadow-sm);
        }
        .rlg-mission-quote p { font-size: 1.1rem; line-height: 1.8; color: #14532d; margin-bottom: .5rem; }
        .rlg-mission-quote cite { color: #16a34a; font-weight: 600; font-style: normal; }

        /* ── Service Cards ── */
        .rlg-services { background: #fff; padding: 5rem 0; }
        .rlg-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        @media(max-width: 900px) { .rlg-services-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
        .rlg-service-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .rlg-service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(34,197,94,0.1), transparent);
          transition: left 0.6s;
        }
        .rlg-service-card:hover::before {
          left: 100%;
        }
        .rlg-service-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); border-color: #22c55e; }
        .rlg-service-icon {
          width: 5rem; height: 5rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1.5rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(34,197,94,0.3);
        }
        .rlg-service-card:hover .rlg-service-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 30px rgba(34,197,94,0.4);
        }
        .rlg-service-icon svg { color: #fff; font-size: 1.8rem; }
        .rlg-service-card h3 { font-weight: 800; font-size: 1.3rem; margin-bottom: .75rem; color: #14532d; }
        .rlg-service-card p { color: #6b7280; font-size: .9rem; line-height: 1.6; margin-bottom: 1rem; }
        .rlg-service-badges { display: flex; flex-wrap: wrap; gap: .5rem; justify-content: center; margin: 1rem 0; }
        .rlg-service-badge {
          background: linear-gradient(135deg, #dcfce7, #f0fdf4);
          color: #14532d;
          padding: .3rem .8rem;
          border-radius: 999px;
          font-size: .7rem;
          font-weight: 600;
        }

        /* ── Values Cards ── */
        .rlg-values { background: linear-gradient(135deg, #f0fdf4, #ffffff); padding: 5rem 0; }
        .rlg-values-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }
        @media(max-width: 1024px) { .rlg-values-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(max-width: 768px) { .rlg-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width: 480px) { .rlg-values-grid { grid-template-columns: 1fr; } }
        .rlg-value-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
        }
        .rlg-value-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .rlg-value-card:hover::after {
          transform: scaleX(1);
        }
        .rlg-value-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: #22c55e;
        }
        .rlg-value-icon {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          transition: all 0.3s ease;
        }
        .rlg-value-card:hover .rlg-value-icon {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 8px 20px rgba(34,197,94,0.3);
        }
        .rlg-value-icon svg { color: #fff; font-size: 1.5rem; }
        .rlg-value-card h3 { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; color: #14532d; }
        .rlg-value-card p { font-size: 0.75rem; color: #6b7280; line-height: 1.4; }

        /* ── Blog Cards ── */
        .rlg-blog { background: #fff; padding: 5rem 0; }
        .rlg-blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 3rem; }
        @media(max-width: 768px) { .rlg-blog-grid { grid-template-columns: 1fr; } }
        .rlg-blog-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          transition: all 0.4s ease;
        }
        .rlg-blog-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: #22c55e;
        }
        .rlg-blog-date { color: #16a34a; font-size: .8rem; margin-bottom: .5rem; display: flex; align-items: center; gap: .5rem; font-weight: 600; }
        .rlg-blog-card h3 { font-weight: 800; font-size: 1.2rem; margin-bottom: .75rem; color: #14532d; }
        .rlg-blog-card p { color: #6b7280; font-size: .9rem; line-height: 1.6; margin-bottom: 1rem; }

        /* ── Testimonials ── */
        .rlg-testimonials { background: linear-gradient(135deg, #14532d, #0a2a1a); padding: 5rem 0; }
        .rlg-testi-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
          max-width: 780px;
          margin: 2.5rem auto 0;
          transition: transform 0.3s ease;
        }
        .rlg-testi-card:hover {
          transform: scale(1.02);
        }
        .rlg-testi-quote { color: #22c55e; font-size: 2.5rem; margin-bottom: 1rem; opacity: .5; }
        .rlg-testimonials .rlg-section-title { color: #fff; }
        .rlg-testimonials .rlg-section-sub { color: rgba(255,255,255,.7); }
        .rlg-testi-dot {
          width: .5rem;
          height: .5rem;
          border-radius: 999px;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .rlg-testi-dot.active {
          width: 1.5rem;
          background: #22c55e;
        }

        /* ── Vision Section ── */
        .rlg-vision { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 5rem 0; text-align: center; color: #fff; }
        .rlg-vision h2 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.5rem); margin-bottom: 1rem;color: #fff }
        .rlg-vision p { max-width: 700px; margin: 0 auto 2rem; color: rgba(255,255,255,.8); }
        .rlg-vision-stats { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; margin-top: 2rem; }
        .rlg-vision-stat { text-align: center; }
        .rlg-vision-stat .number { font-size: 2.5rem; font-weight: 800; font-family: 'Playfair Display', serif; display: block; background: linear-gradient(135deg, #4ade80, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; }

        /* ── Newsletter ── */
        .rlg-newsletter { background: #f0fdf4; padding: 5rem 0; }
        .rlg-newsletter-box {
          background: linear-gradient(135deg, #14532d, #0a2a1a);
          border-radius: 1.5rem;
          padding: 3.5rem 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .rlg-newsletter-form { display: flex; gap: .75rem; max-width: 440px; margin: 0 auto; }
        @media(max-width: 560px) { .rlg-newsletter-form { flex-direction: column; } }
        .rlg-newsletter-form input {
          flex: 1;
          padding: .9rem 1.25rem;
          border-radius: 999px;
          border: none;
          font-size: .95rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .rlg-newsletter-form input:focus {
          box-shadow: 0 0 0 3px rgba(34,197,94,0.3);
        }

        /* ── CTA ── */
        .rlg-cta { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 5rem 0; text-align: center; }
        .rlg-cta h2 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.5rem); margin-bottom: 1rem; color: #fff; }
        .rlg-cta p { color: rgba(255,255,255,.8); max-width: 520px; margin: 0 auto 2rem; }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-container">
          <div className="rlg-hero-grid">
            <div className="fade-up">
              <div className="rlg-hero-badge">
                <FontAwesomeIcon icon={faStarHalfAlt} />
                <span>RLG RWANDA</span>
              </div>
              <h1>
                Lead and Empower
                <span>For Change</span>
              </h1>
              <p><strong>Raising Leaders of Generation (RLG)</strong> nurtures visionary, action-driven young people through social impact, mental transformation, and moral integrity.</p>
              
              <div className="rlg-hero-buttons">
                <button className="btn-primary-rlg" onClick={handleApply}>
                  <FontAwesomeIcon icon={faRocket} /> Our Programs
                </button>
                <button className="btn-outline-rlg" onClick={handleDonate}>
                  <FontAwesomeIcon icon={faHeart} /> Donate Now
                </button>
                <Link to="/getinvolved">
                  <button className="btn-outline-rlg">
                    <FontAwesomeIcon icon={faHandshake} /> Get Involved
                  </button>
                </Link>
              </div>
              
              <div className="rlg-hero-links">
                <span>📧 raisingleaderofgeneration@gmail.com</span>
                <span>📞 +250784769382 | +250792588272</span>
              </div>
            </div>
            <div className="rlg-hero-img-wrap fade-up-2 float">
              <img src={heroImage} alt="Young Leaders in Rwanda" />
              <div className="rlg-hero-card">
                <div className="rlg-hero-card-dot">
                  <FontAwesomeIcon icon={faUsers} style={{ color: "#fff" }} />
                </div>
                <div>
                  <b>1500+ Young Leaders</b>
                  <span>Across Rwanda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="rlg-stats">
        <div className="rlg-container">
          <div className="rlg-stats-grid">
            <div className="rlg-stat-card fade-up">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faUsers} style={{ color: "#15803d", fontSize: "1.5rem" }} /></div>
              <div className="rlg-stat-num">{youthReached}+</div>
              <div className="rlg-stat-label">Youth Reached</div>
            </div>
            <div className="rlg-stat-card fade-up-1">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faSchool} style={{ color: "#15803d", fontSize: "1.5rem" }} /></div>
              <div className="rlg-stat-num">{schoolsPartnered}+</div>
              <div className="rlg-stat-label">Schools Partnered</div>
            </div>
            <div className="rlg-stat-card fade-up-2">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faCalendarAlt} style={{ color: "#15803d", fontSize: "1.5rem" }} /></div>
              <div className="rlg-stat-num">{annualEvents}+</div>
              <div className="rlg-stat-label">Annual Events</div>
            </div>
            <div className="rlg-stat-card fade-up-3">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faFlag} style={{ color: "#15803d", fontSize: "1.5rem" }} /></div>
              <div className="rlg-stat-num">{corePrograms}</div>
              <div className="rlg-stat-label">Core Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="rlg-about">
        <div className="rlg-container">
          <div className="rlg-mission-quote">
            <p>RLG is a youth-centered advocacy dedicated to nurturing the leading spirit in young people. We ensure the next generation produces prominent leaders with absolute qualities, moral integrity, and resilience that dominates the next edge for a better future.</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO - SERVICES */}
      <section className="rlg-services">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faLightbulb} /> What We Do</div>
            <h2 className="rlg-section-title">Empowering Through Action</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Our programs are designed to develop leaders through practical experience and mentorship</p>
          </div>
          <div className="rlg-services-grid">
            <div className="rlg-service-card fade-up">
              <div className="rlg-service-icon"><FontAwesomeIcon icon={faSchool} /></div>
              <h3>School Leadership Development</h3>
              <p>Trainings and mentoring for students through student councils and leadership bootcamps.</p>
              <div className="rlg-service-badges">
                <span className="rlg-service-badge">RLG Clubs Coordinate</span>
                <span className="rlg-service-badge">RLG Impact</span>
                <span className="rlg-service-badge">RLG Green Life</span>
              </div>
              <Link to="/programs#school"><button className="btn-ghost-rlg">Learn More →</button></Link>
            </div>
            <div className="rlg-service-card fade-up-1">
              <div className="rlg-service-icon"><FontAwesomeIcon icon={faMicrophone} /></div>
              <h3>Tournaments & Competitions</h3>
              <p>Debate, public speaking, interschool challenges, entrepreneurship and leadership awards.</p>
              <div className="rlg-service-badges">
                <span className="rlg-service-badge">Light the Flame</span>
                <span className="rlg-service-badge">Oasis of Wealth</span>
              </div>
              <Link to="/programs#tournaments"><button className="btn-ghost-rlg">Learn More →</button></Link>
            </div>
            <div className="rlg-service-card fade-up-2">
              <div className="rlg-service-icon"><FontAwesomeIcon icon={faChalkboardUser} /></div>
              <h3>Leadership Forums & Conferences</h3>
              <p>Summits and forums on governance, entrepreneurship, and networking platforms.</p>
              <div className="rlg-service-badges">
                <span className="rlg-service-badge">My Role</span>
                <span className="rlg-service-badge">Oasis of Wealth</span>
                <span className="rlg-service-badge">My Heritage</span>
              </div>
              <Link to="/programs#forums"><button className="btn-ghost-rlg">Learn More →</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RLG QUOTE */}
      <section className="rlg-features">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faQuoteLeft} /> Why RLG</div>
            <div className="rlg-mission-quote" style={{ background: "#fff", maxWidth: "800px", margin: "0 auto" }}>
              <p>"There is a gap in understanding the dynamics and mysteries of leadership responsibilities, especially in young people. RLG fills that gap."</p>
              <cite>— Joshua Chris. K, Founder</cite>
            </div>
            <p style={{ marginTop: "1.5rem", color: "#6b7280" }}>We believe young people must be conscious through <strong>mental transformation</strong> and must <strong>rile inner abilities early</strong> to overtake leadership success and achieve <strong>Transgenerational relevance</strong>.</p>
          </div>
        </div>
      </section>

      {/* CORE VALUES - CARDS */}
      <section className="rlg-values">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faMedal} /> Our Core Values</div>
            <h2 className="rlg-section-title">What We Stand For</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>These values guide everything we do at RLG</p>
          </div>
          <div className="rlg-values-grid">
            {coreValues.map((value, i) => (
              <div key={i} className="rlg-value-card fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="rlg-value-icon">
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <h3>{value.name}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="rlg-blog">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faNewspaper} /> Latest from Our Blog</div>
            <h2 className="rlg-section-title">Stories & Insights</h2>
          </div>
          <div className="rlg-blog-grid">
            {blogPosts.map((post, i) => (
              <div key={i} className="rlg-blog-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-blog-date"><FontAwesomeIcon icon={faCalendarAlt} /> {post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={post.link}><button className="btn-ghost-rlg">Read More →</button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="rlg-testimonials">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}><FontAwesomeIcon icon={faComments} /> Success Stories</div>
            <h2 className="rlg-section-title">What Our Community Says</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto", color: "rgba(255,255,255,.7)" }}>Hear from young leaders who transformed their lives through RLG</p>
          </div>
          <div className="rlg-testi-card">
            <div className="rlg-testi-quote"><FontAwesomeIcon icon={faQuoteLeft} /></div>
            <p>{currentTestimonialData.text}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                  {currentTestimonialData.initials || currentTestimonialData.name?.charAt(0) || "RL"}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: "#14532d" }}>{currentTestimonialData.name}</h4>
                  <span style={{ color: "#6b7280", fontSize: ".8rem" }}>{currentTestimonialData.role}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: ".5rem" }}>
                {activeTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`rlg-testi-dot ${idx === currentTestimonial ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 YEAR VISION */}
      <section className="rlg-vision">
        <div className="rlg-container">
          <h2>Be Part of the Next Generation of Prominent Leaders</h2>
          <p>By the next 7 years, RLG will expand across Rwanda, organize an annual youth leadership summit, and build a network of empowered young leaders influencing governance, business, and social change.</p>
          <Link to="/getinvolved"><button className="btn-white-rlg">Get Involved Today →</button></Link>
          <div className="rlg-vision-stats">
            <div className="rlg-vision-stat"><span className="number">7+</span> <span>Years Vision</span></div>
            <div className="rlg-vision-stat"><span className="number">30+</span> <span>Districts</span></div>
            <div className="rlg-vision-stat"><span className="number">10k+</span> <span>Youth Impacted</span></div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="rlg-newsletter">
        <div className="rlg-container">
          <div className="rlg-newsletter-box">
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#4ade80" }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>Stay Updated with RLG</h3>
            <p style={{ color: "rgba(255,255,255,.75)", marginBottom: "1.75rem" }}>Subscribe to our newsletter for leadership tips, event announcements, and success stories.</p>
            <form className="rlg-newsletter-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="btn-primary-rlg">Subscribe <FontAwesomeIcon icon={faArrowRight} /></button>
            </form>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".8rem", marginTop: "1rem" }}><FontAwesomeIcon icon={faHeart} /> No spam, unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rlg-cta">
        <div className="rlg-container">
          <h2>Ready to Start Your Leadership Journey?</h2>
          <p>Join young leaders who are making a difference in Rwanda and around the world.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-white-rlg" onClick={handleApply}><FontAwesomeIcon icon={faRocket} /> Apply for Programs</button>
            <Link to="/contact"><button className="btn-outline-rlg" style={{ borderColor: "#fff", color: "#fff" }}><FontAwesomeIcon icon={faComments} /> Talk to an Advisor</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}