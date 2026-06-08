import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faBullhorn, faHeart, faFlag, faHandshake,
  faBuilding, faUsers, faArrowRight, faQuoteLeft,
  faCheckCircle, faTrophy, faSchool, faHandsHelping,
  faLightbulb, faChartLine, faRocket, faUserTie,
  faBriefcase, faNetworkWired, faClipboardList,
  faTasks, faComments, faEnvelope, faPhone, faMapMarkerAlt,
  faAward, faCrown, faLeaf, faGem, faCompass, faDove, faFire,
  faSmile, faHandSpock, faMedal, faShieldHeart, faBookOpen,
  faGraduationCap, faGlobe, faCalendarAlt, faStar
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });

/* ─── Data ────────────────────────────────────────────────────── */
const coreValues = [
  { name: "Discipline", icon: faCompass, description: "Self-control and dedication to excellence" },
  { name: "Commitment & Courage", icon: faShieldHeart, description: "Bold actions and unwavering dedication" },
  { name: "Loyalty", icon: faDove, description: "Faithful dedication to our mission" },
  { name: "Passion", icon: faFire, description: "Enthusiasm that drives change" },
  { name: "Sociable", icon: faSmile, description: "Building meaningful connections" },
  { name: "Team Work", icon: faHandshake, description: "Collaboration for greater impact" },
  { name: "Competence & Excellence", icon: faGem, description: "Mastery and outstanding quality" },
  { name: "Respect", icon: faHandSpock, description: "Valuing every individual's dignity" },
  { name: "Dignity", icon: faMedal, description: "Honorable conduct and self-worth" },
  { name: "Empathy", icon: faHandsHelping, description: "Understanding and serving others" },
];

const leadershipTeam = [
  { name: "Joshua Chris. K", role: "Founder & Managing Director", icon: faCrown, description: "Visionary leader driving RLG's mission forward" },
  { name: "Board of Directors", role: "Strategic Oversight", icon: faUsers, description: "Provides strategic guidance and accountability" },
  { name: "Programs Manager", role: "Program Coordination", icon: faBriefcase, description: "Coordinates program design and execution" },
  { name: "Community Coordinators", role: "Grassroots Connection", icon: faHandshake, description: "Connect youth and grassroots leaders to programs" },
];

const partners = [
  "Schools and Universities", "I Debate Rwanda", "Government Agencies", "Community NGOs"
];

const implementationPhases = [
  { phase: "Planning", icon: faClipboardList, activities: ["Assessment", "Consultation", "Participatory planning"] },
  { phase: "Execution", icon: faTasks, activities: ["Youth implementation", "Trainer support", "Mentor guidance"] },
  { phase: "Mentorship & Review", icon: faComments, activities: ["Regular reviews", "Impact assessments", "Feedback loop"] },
  { phase: "Sustainability", icon: faLeaf, activities: ["Building partnerships", "Capacity development", "Long-term growth"] },
];

const goals = [
  { icon: faTrophy, title: "Influencing Generational Competence", description: "Values with account to visionary and transforming leadership." },
  { icon: faLightbulb, title: "Mental Transformation", description: "Heritage and welfare for sustainable development." },
  { icon: faChartLine, title: "Social & Economic Prosperity", description: "Empowerment by advancing understanding about mental, social and economic prosperity." },
  { icon: faHandshake, title: "Building Strong Communities", description: "Societies with strong relationships, trustworthy and togetherness." },
  { icon: faBuilding, title: "Strategic Partnerships", description: "Building partnerships with schools, universities, NGOs, and private sector organizations." },
];

/* ─── Component ───────────────────────────────────────────────── */
export default function About() {
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % implementationPhases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePartnerClick = () => {
    showInfo("Partner With Us", "Join us in empowering young leaders across Rwanda!");
  };

  return (
    <div className="rlg-about-page pt-16">
      <style>{`
        /* ── Reset & tokens (same as home page) ── */
        .rlg-about-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
        :root {
          --green-900: #14532d;
          --green-800: #166534;
          --green-700: #15803d;
          --green-600: #16a34a;
          --green-500: #22c55e;
          --green-400: #4ade80;
          --green-100: #dcfce7;
          --green-50:  #f0fdf4;
          --shadow-sm: 0 2px 8px rgba(21,128,61,.10);
          --shadow-md: 0 8px 30px rgba(21,128,61,.15);
          --shadow-lg: 0 20px 60px rgba(21,128,61,.20);
          --radius:    1rem;
          --transition: .3s cubic-bezier(.4,0,.2,1);
        }

        /* ── Animations ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:none } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideIn { from { transform:translateX(-30px); opacity:0 } to { transform:none; opacity:1 } }
        
        .fade-up { animation: fadeUp .7s both; }
        .fade-up-1 { animation: fadeUp .7s .1s both; }
        .fade-up-2 { animation: fadeUp .7s .2s both; }
        .fade-up-3 { animation: fadeUp .7s .3s both; }
        .slide-in { animation: slideIn .6s both; }

        /* ── Layout ── */
        .rlg-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }

        /* ── Hero Section ── */
        .rlg-hero {
          position: relative; min-height: 50vh; display: flex; align-items: center;
          background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%);
          overflow: hidden;
        }
        .rlg-hero::before {
          content:''; position:absolute; inset:0;
          background: url(${heroBg}) center/cover no-repeat;
          opacity:.12;
        }
        .rlg-hero-content { position: relative; z-index: 2; padding: 5rem 0; text-align: center; }
        .rlg-hero h1 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2.5rem,5vw,4rem); font-weight:800; color:#fff; margin-bottom:1rem; }
        .rlg-hero p { color:rgba(255,255,255,.85); font-size:1.1rem; max-width:700px; margin:0 auto; line-height:1.7; }

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
        .rlg-section-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800; color:#111; margin-bottom:.75rem; }
        .rlg-section-sub { color:#6b7280; font-size:1rem; line-height:1.7; max-width:580px; }

        /* ── Cards ── */
        .rlg-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          transition: var(--transition);
        }
        .rlg-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #22c55e; }
        
        .rlg-icon-circle {
          width: 4rem; height: 4rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .rlg-icon-circle svg { color: #fff; font-size: 1.5rem; }

        /* ─── Vision & Mission Cards ─── */
        .rlg-vision-mission { background: var(--green-50); padding: 5rem 0; }
        .rlg-vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; }
        @media (max-width: 768px) { .rlg-vm-grid { grid-template-columns: 1fr; } }
        .rlg-vm-card {
          background: #fff; border-radius: var(--radius); padding: 2rem;
          text-align: center; box-shadow: var(--shadow-sm); transition: var(--transition);
          border-top: 4px solid #22c55e;
        }
        .rlg-vm-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .rlg-vm-card svg { font-size: 2.5rem; color: #22c55e; margin-bottom: 1rem; }
        .rlg-vm-card h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #14532d; }
        .rlg-vm-card p { color: #6b7280; line-height: 1.7; }

        /* ── Mission Quote ── */
        .rlg-mission-quote {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-left: 4px solid #22c55e;
          padding: 2rem;
          border-radius: var(--radius);
          margin: 2rem 0;
          font-style: italic;
        }
        .rlg-mission-quote p { font-size: 1.1rem; line-height: 1.8; color: #14532d; }

        /* ── Goals Grid ── */
        .rlg-goals { padding: 5rem 0; background: #fff; }
        .rlg-goals-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 2rem; }
        @media (max-width: 768px) { .rlg-goals-grid { grid-template-columns: 1fr; } }
        .rlg-goal-card {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.5rem; background: var(--green-50); border-radius: var(--radius);
          transition: var(--transition);
        }
        .rlg-goal-card:hover { transform: translateX(5px); background: #fff; box-shadow: var(--shadow-sm); }
        .rlg-goal-card svg { font-size: 1.5rem; color: #22c55e; flex-shrink: 0; margin-top: .2rem; }
        .rlg-goal-card h3 { font-weight: 700; margin-bottom: .5rem; color: #14532d; font-size: 1rem; }
        .rlg-goal-card p { color: #6b7280; font-size: .9rem; line-height: 1.5; }

        /* ── Values Grid ── */
        .rlg-values-section { background: var(--green-50); padding: 5rem 0; }
        .rlg-values-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (max-width: 1024px) { .rlg-values-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .rlg-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .rlg-values-grid { grid-template-columns: 1fr; } }
        .rlg-value-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
          transition: all 0.4s ease;
          border: 1px solid #e5e7eb;
        }
        .rlg-value-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #22c55e; }
        .rlg-value-icon {
          width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .rlg-value-icon svg { color: #fff; font-size: 1.2rem; }
        .rlg-value-card h3 { font-weight: 700; font-size: .9rem; margin-bottom: .5rem; color: #14532d; }
        .rlg-value-card p { font-size: .7rem; color: #6b7280; }

        /* ── Leadership Team ── */
        .rlg-leadership { padding: 5rem 0; background: #fff; }
        .rlg-leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2rem; }
        @media (max-width: 1024px) { .rlg-leadership-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .rlg-leadership-grid { grid-template-columns: 1fr; } }
        .rlg-leader-card {
          background: #fff; border-radius: var(--radius); padding: 2rem;
          text-align: center; border: 1px solid #e5e7eb; transition: var(--transition);
        }
        .rlg-leader-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #22c55e; }
        .rlg-leader-icon {
          width: 5rem; height: 5rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .rlg-leader-icon svg { color: #fff; font-size: 2rem; }
        .rlg-leader-card h3 { font-weight: 800; font-size: 1.1rem; color: #14532d; margin-bottom: .3rem; }
        .rlg-leader-card .role { color: #22c55e; font-size: .8rem; font-weight: 600; margin-bottom: .5rem; }
        .rlg-leader-card p { color: #6b7280; font-size: .8rem; line-height: 1.5; }

        /* ── Partners Section ── */
        .rlg-partners { background: var(--green-50); padding: 5rem 0; }
        .rlg-partners-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
        .rlg-partner-card {
          background: #fff; border-radius: 999px; padding: .8rem 1.8rem;
          display: flex; align-items: center; gap: .5rem;
          transition: var(--transition); border: 1px solid #e5e7eb;
        }
        .rlg-partner-card:hover { transform: translateY(-3px); border-color: #22c55e; box-shadow: var(--shadow-sm); }
        .rlg-partner-card svg { color: #22c55e; }
        .rlg-partner-card span { font-weight: 600; color: #14532d; }

        /* ── Implementation Framework ── */
        .rlg-framework { padding: 5rem 0; background: #fff; }
        .rlg-framework-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2rem; }
        @media (max-width: 1024px) { .rlg-framework-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .rlg-framework-grid { grid-template-columns: 1fr; } }
        .rlg-phase-card {
          background: #fff; border-radius: var(--radius); padding: 1.5rem;
          text-align: center; border: 1px solid #e5e7eb; transition: var(--transition);
          position: relative; overflow: hidden;
        }
        .rlg-phase-card.active { border-color: #22c55e; box-shadow: var(--shadow-md); }
        .rlg-phase-card.active::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #22c55e, #16a34a);
        }
        .rlg-phase-icon {
          width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .rlg-phase-icon svg { color: #fff; font-size: 1.2rem; }
        .rlg-phase-card h3 { font-weight: 800; font-size: 1.1rem; color: #14532d; margin-bottom: 1rem; }
        .rlg-phase-card ul { list-style: none; padding: 0; margin: 0; }
        .rlg-phase-card li { color: #6b7280; font-size: .8rem; padding: .25rem 0; }

        /* ── Vision Outlook ── */
        .rlg-outlook { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 5rem 0; text-align: center; color: #fff; }
        .rlg-outlook h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); margin-bottom: 1rem;color: #fff }
        .rlg-outlook p { max-width: 700px; margin: 0 auto 2rem; color: rgba(255,255,255,.8); }
        .rlg-outlook-stats { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; margin-top: 2rem; }
        .rlg-outlook-stat { text-align: center; }
        .rlg-outlook-stat .number { font-size: 2.5rem; font-weight: 800; font-family: 'Playfair Display', serif; display: block; background: linear-gradient(135deg, #4ade80, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .rlg-outlook-stat span { color: rgba(255,255,255,.7); }

        /* ── CTA Buttons ── */
        .btn-primary-rlg {
          display: inline-flex; align-items: center; gap: .5rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; padding: .8rem 1.8rem; border-radius: 999px;
          font-weight: 700; border: none; cursor: pointer; transition: var(--transition);
          text-decoration: none;
        }
        .btn-primary-rlg:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }
        .btn-outline-rlg {
          display: inline-flex; align-items: center; gap: .5rem;
          background: transparent; color: #fff; padding: .8rem 1.8rem;
          border-radius: 999px; font-weight: 700; border: 2px solid rgba(255,255,255,0.5);
          cursor: pointer; transition: var(--transition); text-decoration: none;
        }
        .btn-outline-rlg:hover { background: rgba(255,255,255,0.1); border-color: #fff; transform: translateY(-2px); }
        .rlg-cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-hero-content">
          <div className="rlg-container">
            <div className="fade-up">
              <h1>About RLG</h1>
              <p>Raising Leaders of Generation (RLG) is a youth-centered advocacy dedicated to nurture and empower the leading spirit in young people through social impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="rlg-goals">
        <div className="rlg-container">
          <div className="slide-in">
            <div className="rlg-label"><FontAwesomeIcon icon={faBookOpen} /> Our Story</div>
            <h2 className="rlg-section-title">The Journey Begins</h2>
          </div>
          <div className="rlg-mission-quote fade-up">
            <p>Raising Leaders of Generation (RLG) is a <strong>youth-centered advocacy</strong> dedicated to nurture and empower the leading spirit in young people through social impact.</p>
            <p style={{ marginTop: "1rem" }}>The organization came into place when <strong>Joshua Chris. K</strong> perceived an aperture — a critical gap — in understanding the dynamics and mysteries alongside leadership responsibilities, especially in young people.</p>
            <p style={{ marginTop: "1rem" }}>RLG is in line of maintaining good leadership legacies. We believe the young generation should be conscious through <strong>mental transformation</strong> and should <strong>rile inner abilities early</strong> to overtake leadership success and achieve <strong>Transgenerational relevance</strong>.</p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="rlg-vision-mission">
        <div className="rlg-container">
          <div className="rlg-vm-grid">
            <div className="rlg-vm-card fade-up">
              <FontAwesomeIcon icon={faEye} />
              <h3>Our Vision</h3>
              <p>Nurturing visionary, action and transforming leaders with potential knowledge and reclined understanding of responsibilities with influence to dominate sociological sphere and well-being.</p>
            </div>
            <div className="rlg-vm-card fade-up-1">
              <FontAwesomeIcon icon={faBullhorn} />
              <h3>Our Mission</h3>
              <p>Empowering leading spirit in young generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR GOALS */}
      <section className="rlg-goals">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faFlag} /> Our Goals</div>
            <h2 className="rlg-section-title">What We Aim to Achieve</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Strategic objectives driving our mission forward</p>
          </div>
          <div className="rlg-goals-grid">
            {goals.map((goal, i) => (
              <div key={i} className={`rlg-goal-card fade-up-${i % 4}`}>
                <FontAwesomeIcon icon={goal.icon} />
                <div>
                  <h3>{goal.title}</h3>
                  <p>{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="rlg-values-section">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faHeart} /> Our Core Values</div>
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

      {/* GOVERNANCE & LEADERSHIP */}
      <section className="rlg-leadership">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faUsers} /> Governance Structure</div>
            <h2 className="rlg-section-title">Our Leadership Team</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Committed individuals steering RLG towards success</p>
          </div>
          <div className="rlg-leadership-grid">
            {leadershipTeam.map((leader, i) => (
              <div key={i} className="rlg-leader-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-leader-icon">
                  <FontAwesomeIcon icon={leader.icon} />
                </div>
                <h3>{leader.name}</h3>
                <div className="role">{leader.role}</div>
                <p>{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS & COLLABORATIONS */}
      <section className="rlg-partners">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faHandshake} /> Our Partners</div>
            <h2 className="rlg-section-title">Collaborations That Empower</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>RLG is highly empowered through collaboration with strategic partners</p>
          </div>
          <div className="rlg-partners-grid">
            {partners.map((partner, i) => (
              <div key={i} className="rlg-partner-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION FRAMEWORK */}
      <section className="rlg-framework">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faTasks} /> Our Approach</div>
            <h2 className="rlg-section-title">Implementation Framework</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Structured process ensuring effective program delivery</p>
          </div>
          <div className="rlg-framework-grid">
            {implementationPhases.map((phase, i) => (
              <div key={i} className={`rlg-phase-card fade-up ${activePhase === i ? 'active' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-phase-icon">
                  <FontAwesomeIcon icon={phase.icon} />
                </div>
                <h3>{phase.phase}</h3>
                <ul>
                  {phase.activities.map((activity, j) => (
                    <li key={j}>• {activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-YEAR OUTLOOK */}
      <section className="rlg-outlook">
        <div className="rlg-container">
          <h2>Our Outlook (7-Year Vision)</h2>
          <p>By the next 7 years, RLG envisions expanding across Rwanda, organizing an annual youth leadership summit, and building a network of empowered young leaders who will influence governance, business, and social change.</p>
          <div className="rlg-outlook-stats">
            <div className="rlg-outlook-stat"><span className="number">7+</span> <span>Years Vision</span></div>
            <div className="rlg-outlook-stat"><span className="number">30+</span> <span>Districts</span></div>
            <div className="rlg-outlook-stat"><span className="number">10k+</span> <span>Youth Impacted</span></div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="rlg-leadership" style={{ background: "var(--green-50)" }}>
        <div className="rlg-container" style={{ textAlign: "center" }}>
          <div className="rlg-vm-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <FontAwesomeIcon icon={faHandshake} style={{ fontSize: "2rem", color: "#22c55e", marginBottom: "1rem" }} />
            <h3 style={{ color: "#14532d", marginBottom: "1rem" }}>Partner With Us</h3>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Join us in empowering young leaders across Rwanda. Together, we can create lasting change.</p>
            <div className="rlg-cta-buttons">
              <Link to="/getinvolved">
                <button className="btn-primary-rlg" onClick={handlePartnerClick}>
                  <FontAwesomeIcon icon={faHandshake} /> Partner With Us
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn-outline-rlg" style={{ borderColor: "#22c55e", color: "#14532d" }}>
                  <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}