import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool, faUsers, faTree, faMicrophone, faAward, faGavel,
  faComments, faChartLine, faClipboardList, faTasks,
  faHandshake, faLeaf, faCalendarAlt, faArrowRight, faStar,
  faCheckCircle, faLightbulb, faRocket, faHeart, faTrophy,
  faFlag, faGlobe, faUserGraduate, faChalkboardUser, faFire,
  faSeedling, faHandsHelping, faMedal, faCrown, faBookOpen,
  faLaptopCode, faBullhorn, faBuilding, faUserTie, faClock
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });
const showToast = (message, icon = "success") =>
  Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true })
    .fire({ icon, title: message });

/* ─── Data ────────────────────────────────────────────────────── */
const programCategories = [
  {
    id: 1,
    title: "School Leadership Development",
    target: "Students in primary and secondary schools",
    description: "Trainings and mentoring for students through student councils and leadership bootcamps.",
    icon: faSchool,
    color: "#22c55e",
    subPrograms: [
      { name: "RLG Clubs Coordinate", icon: faUsers, description: "In-school leadership clubs where students meet regularly to discuss leadership topics, plan activities, and practice decision-making." },
      { name: "RLG Impact", icon: faHandsHelping, description: "Social action projects led by students — from community cleanups to fundraising for local causes. Students learn by doing." },
      { name: "RLG Green Life", icon: faLeaf, description: "Environmental and sustainability leadership. Students learn to protect their communities while leading green initiatives." }
    ],
    howToJoin: "Ask your teacher or principal to contact RLG to start a club at your school.",
    actionText: "Start an RLG Club",
    actionLink: "/get-involved"
  },
  {
    id: 2,
    title: "Tournaments & Competitions",
    target: "Interschool teams and individual youth (ages 13–25)",
    description: "Debate, public speaking, interschool challenges, entrepreneurship and leadership awards.",
    icon: faTrophy,
    color: "#16a34a",
    subPrograms: [
      { name: "Light the Flame", icon: faFire, description: "Debate and public speaking competitions. Students develop confidence, critical thinking, and persuasive communication skills." },
      { name: "Oasis of Wealth", icon: faAward, description: "Entrepreneurship and leadership awards. Young people pitch ideas, showcase business plans, and win recognition and small grants." }
    ],
    howToJoin: "Next Light the Flame tournament coming soon. Register your interest today!",
    actionText: "Register for Next Tournament",
    actionLink: "/contact"
  },
  {
    id: 3,
    title: "Leadership Forums & Conferences",
    target: "Young leaders, university students, aspiring entrepreneurs",
    description: "Summits and forums on governance, entrepreneurship, and networking platforms.",
    icon: faComments,
    color: "#15803d",
    subPrograms: [
      { name: "My Role", icon: faCrown, description: "Governance and personal responsibility forums. Young people learn how to take ownership of their communities and nation." },
      { name: "Oasis of Wealth", icon: faChartLine, description: "Economic prosperity sessions — financial literacy, career planning, and wealth creation for youth." },
      { name: "My Heritage", icon: faBookOpen, description: "Cultural and legacy discussions. Understanding where we come from to lead where we are going." }
    ],
    howToJoin: "Next Annual Youth Leadership Summit — Date TBA",
    actionText: "Attend Next Summit",
    actionLink: "/get-involved"
  }
];

const implementationPhases = [
  { phase: "Planning", icon: faClipboardList, description: "Assessment, consultation, participatory planning with youth.", color: "#22c55e" },
  { phase: "Execution", icon: faTasks, description: "Youth-led implementation supported by professional trainers and mentors.", color: "#16a34a" },
  { phase: "Mentorship & Review", icon: faComments, description: "Regular reviews, impact assessments, and a continuous feedback loop.", color: "#15803d" },
  { phase: "Sustainability", icon: faLeaf, description: "Building long-term partnerships and capacity development.", color: "#14532d" }
];

const programCalendar = [
  { month: "February", activity: "Light the Flame – School qualifiers", icon: faFire },
  { month: "April", activity: "RLG Green Life – Tree planting campaign", icon: faLeaf },
  { month: "June", activity: "My Role Governance Forum", icon: faCrown },
  { month: "September", activity: "Oasis of Wealth Awards", icon: faAward },
  { month: "November", activity: "Annual Youth Leadership Summit", icon: faStar }
];

/* ─── Component ───────────────────────────────────────────────── */
export default function Programs() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredProgram, setHoveredProgram] = useState(null);

  const handleJoinClick = (programName) => {
    showSuccess("Registration Interest!", `Thank you for your interest in ${programName}. We'll contact you soon!`);
  };

  const handleSponsorClick = () => {
    showInfo("Sponsor a Program", "Thank you for considering sponsorship. Our team will reach out to you shortly.");
  };

  const handleVolunteerClick = () => {
    showToast("Volunteer applications are open! Visit Get Involved page to apply.", "success");
  };

  return (
    <div className="rlg-programs-page pt-16">
      <style>{`
        .rlg-programs-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
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

        @keyframes fadeUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:none } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideIn { from { transform:translateX(-30px); opacity:0 } to { transform:none; opacity:1 } }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        
        .fade-up { animation: fadeUp .7s both; }
        .fade-up-1 { animation: fadeUp .7s .1s both; }
        .fade-up-2 { animation: fadeUp .7s .2s both; }
        .fade-up-3 { animation: fadeUp .7s .3s both; }
        .slide-in { animation: slideIn .6s both; }

        .rlg-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }

        /* Hero Section */
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

        /* Section Label */
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

        /* Program Category Cards */
        .rlg-programs-categories { padding: 5rem 0; background: #fff; }
        .rlg-category-card {
          background: #fff;
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 3rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid #e5e7eb;
        }
        .rlg-category-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
        .rlg-category-header {
          padding: 2rem;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-bottom: 1px solid #e5e7eb;
        }
        .rlg-category-icon {
          width: 4rem; height: 4rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .rlg-category-icon svg { color: #fff; font-size: 1.8rem; }
        .rlg-category-header h2 { font-size: 1.5rem; font-weight: 800; color: #14532d; margin-bottom: .5rem; }
        .rlg-category-target { display: inline-block; background: #fff; padding: .25rem .75rem; border-radius: 999px; font-size: .75rem; color: #22c55e; font-weight: 600; margin-top: .5rem; }
        .rlg-category-body { padding: 2rem; }

        /* Sub-Programs Grid */
        .rlg-subprograms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        @media (max-width: 900px) { .rlg-subprograms-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rlg-subprograms-grid { grid-template-columns: 1fr; } }
        .rlg-subprogram-card {
          background: var(--green-50);
          border-radius: var(--radius);
          padding: 1.5rem;
          transition: var(--transition);
          border: 1px solid #e5e7eb;
        }
        .rlg-subprogram-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); border-color: #22c55e; }
        .rlg-subprogram-icon {
          width: 3rem; height: 3rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 0.75rem; display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .rlg-subprogram-icon svg { color: #fff; font-size: 1.2rem; }
        .rlg-subprogram-card h3 { font-weight: 800; font-size: 1rem; color: #14532d; margin-bottom: .5rem; }
        .rlg-subprogram-card p { color: #6b7280; font-size: .8rem; line-height: 1.5; }

        .rlg-how-to-join {
          background: var(--green-50);
          padding: 1rem;
          border-radius: var(--radius);
          margin: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .rlg-how-to-join p { margin: 0; color: #14532d; font-weight: 500; }
        .rlg-btn-sm {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; padding: .6rem 1.2rem; border-radius: 999px;
          font-weight: 600; font-size: .8rem; border: none; cursor: pointer;
          transition: var(--transition);
        }
        .rlg-btn-sm:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(34,197,94,0.3); }

        /* Implementation Framework */
        .rlg-framework { background: var(--green-50); padding: 5rem 0; }
        .rlg-framework-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) { .rlg-framework-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rlg-framework-grid { grid-template-columns: 1fr; } }
        .rlg-phase-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
          transition: var(--transition);
          border: 1px solid #e5e7eb;
        }
        .rlg-phase-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #22c55e; }
        .rlg-phase-icon {
          width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .rlg-phase-icon svg { color: #fff; font-size: 1.2rem; }
        .rlg-phase-card h3 { font-weight: 800; font-size: 1rem; color: #14532d; margin-bottom: .5rem; }
        .rlg-phase-card p { color: #6b7280; font-size: .8rem; line-height: 1.5; }

        /* Calendar Section */
        .rlg-calendar { padding: 5rem 0; background: #fff; }
        .rlg-calendar-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) { .rlg-calendar-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .rlg-calendar-grid { grid-template-columns: 1fr; } }
        .rlg-calendar-card {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: var(--radius);
          padding: 1rem;
          text-align: center;
          transition: var(--transition);
          border: 1px solid #e5e7eb;
        }
        .rlg-calendar-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); }
        .rlg-calendar-month {
          font-weight: 800;
          font-size: 1rem;
          color: #14532d;
          margin-bottom: .5rem;
          padding-bottom: .5rem;
          border-bottom: 2px solid #22c55e;
          display: inline-block;
        }
        .rlg-calendar-card p { color: #6b7280; font-size: .8rem; margin-top: .5rem; }

        /* CTA Section */
        .rlg-cta-section { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 4rem 0; text-align: center; }
        .rlg-cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
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

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-hero-content">
          <div className="rlg-container">
            <div className="fade-up">
              <h1>Our Programs</h1>
              <p>How We Build Leaders — RLG runs three major program areas, each designed to nurture visionary, action-oriented leaders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM CATEGORIES */}
      <section className="rlg-programs-categories">
        <div className="rlg-container">
          {programCategories.map((category, index) => (
            <div key={category.id} className={`rlg-category-card fade-up-${index % 3}`}>
              <div className="rlg-category-header">
                <div className="rlg-category-icon">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h2>{category.title}</h2>
                <div className="rlg-category-target">
                  <FontAwesomeIcon icon={faUserGraduate} style={{ marginRight: ".3rem", fontSize: ".7rem" }} />
                  {category.target}
                </div>
              </div>
              <div className="rlg-category-body">
                <p style={{ color: "#6b7280", marginBottom: "1rem", lineHeight: "1.7" }}>{category.description}</p>
                
                <h4 style={{ fontWeight: 700, color: "#14532d", marginBottom: "1rem", fontSize: "1.1rem" }}>
                  <FontAwesomeIcon icon={faStar} style={{ color: "#22c55e", marginRight: ".5rem", fontSize: ".9rem" }} />
                  Sub-Programs
                </h4>
                <div className="rlg-subprograms-grid">
                  {category.subPrograms.map((sub, idx) => (
                    <div 
                      key={idx} 
                      className="rlg-subprogram-card"
                      onMouseEnter={() => setHoveredProgram(`${category.id}-${idx}`)}
                      onMouseLeave={() => setHoveredProgram(null)}
                    >
                      <div className="rlg-subprogram-icon">
                        <FontAwesomeIcon icon={sub.icon} />
                      </div>
                      <h3>{sub.name}</h3>
                      <p>{sub.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="rlg-how-to-join">
                  <p><FontAwesomeIcon icon={faCheckCircle} style={{ color: "#22c55e", marginRight: ".5rem" }} />{category.howToJoin}</p>
                  <button className="rlg-btn-sm" onClick={() => handleJoinClick(category.title)}>
                    {category.actionText} <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: ".5rem" }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPLEMENTATION FRAMEWORK */}
      <section className="rlg-framework">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faTasks} /> How We Implement Everything</div>
            <h2 className="rlg-section-title">Our Implementation Framework</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>A structured approach ensuring effective program delivery and lasting impact</p>
          </div>
          <div className="rlg-framework-grid">
            {implementationPhases.map((phase, i) => (
              <div key={i} className="rlg-phase-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-phase-icon">
                  <FontAwesomeIcon icon={phase.icon} />
                </div>
                <h3>{phase.phase}</h3>
                <p>{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM CALENDAR */}
      <section className="rlg-calendar">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faCalendarAlt} /> Program Calendar</div>
            <h2 className="rlg-section-title">Year-Round Leadership Activities</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Sample calendar of our annual programs and events</p>
          </div>
          <div className="rlg-calendar-grid">
            {programCalendar.map((item, i) => (
              <div key={i} className="rlg-calendar-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-calendar-month">
                  <FontAwesomeIcon icon={item.icon} style={{ marginRight: ".3rem", fontSize: ".8rem" }} />
                  {item.month}
                </div>
                <p>{item.activity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="rlg-cta-section">
        <div className="rlg-container">
          <h2 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "1rem" }}>Ready to Get Involved?</h2>
          <p style={{ color: "rgba(255,255,255,.8)", maxWidth: "600px", margin: "0 auto" }}>
            Whether you want to participate, volunteer, or sponsor a program, there's a place for you at RLG.
          </p>
          <div className="rlg-cta-buttons">
            <button className="btn-primary-rlg" onClick={handleVolunteerClick}>
              <FontAwesomeIcon icon={faHandsHelping} /> Volunteer as a Trainer
            </button>
            <button className="btn-outline-rlg" onClick={handleSponsorClick}>
              <FontAwesomeIcon icon={faHeart} /> Sponsor a Program
            </button>
            <Link to="/contact">
              <button className="btn-outline-rlg">
                <FontAwesomeIcon icon={faEnvelope} /> Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}