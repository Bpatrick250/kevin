import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap, faGlobe, faUsers, faCalendarAlt, faArrowRight,
  faRocket, faLightbulb, faHandshake, faChartLine, faTrophy,
  faHeart, faStar, faQuoteLeft, faCheckCircle, faClock,
  faMapMarkerAlt, faEnvelope, faPlayCircle, faAward, faTree,
  faBookOpen, faLaptopCode, faComments, faBullhorn, faBuilding,
  faUserTie, faLeaf, faEye, faStarHalfAlt, faSchool,
  faMicrophone, faChalkboardUser, faPeopleGroup, faBrain,
  faFlag, faHandshakeSimple, faMedal, faFire, faNewspaper
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

/* ─── Data ────────────────────────────────────────────────────── */
const testimonials = [
  { name: "Mukeshimana Kevin", role: "RLG Club Member at ESSA NYARUGUNGA 2026", text: "RLG transformed my leadership journey. The mentorship I received helped me gain more public speaking skills!", rating: 5, initials: "MK" },
  { name: "Joshua Chris. K", role: "Founder & Executive Director", text: "There is a gap in understanding the dynamics and mysteries of leadership responsibilities, especially in young people. RLG fills that gap.", rating: 5, initials: "JK" },
  { name: "Dr. Amina Patel", role: "Lead Mentor", text: "Working with RLG fellows has been incredibly rewarding. These young leaders are truly shaping our future.", rating: 5, initials: "AP" },
];

const coreValues = [
  "Discipline", "Commitment & Courage", "Loyalty", "Passion", 
  "Sociable", "Team Work", "Competence & Excellence", "Respect", "Dignity", "Empathy"
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

  const youthReached = useCountUp(1500);
  const schoolsPartnered = useCountUp(10);
  const annualEvents = useCountUp(5);
  const corePrograms = useCountUp(3);

  useEffect(() => {
    const id = setInterval(() => setCurrentTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleApply = () =>
    showToast("Applications are open! Head to Get Involved to apply.", "success");
  const handleWatch = () =>
    showInfo("Watch Our Story", "Check out our video to see how RLG is transforming young leaders in Rwanda and beyond!");
  const handleLearn = () =>
    showInfo("About RLG", "We are dedicated to nurturing the next generation of leaders in Rwanda through mentorship, training, and real-world projects.");
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return showToast("Please enter your email address.", "warning");
    showSuccess("Subscribed! 🎉", "Thank you for joining our newsletter. You'll receive updates about leadership programs and events!");
    setEmail("");
  };
  const handleDonate = () => {
    showInfo("Support RLG", "Your donation helps us empower more young leaders across Rwanda.");
  };

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
          background: var(--green-900); overflow: hidden;
        }
        .rlg-hero::before {
          content:''; position:absolute; inset:0;
          background: url(${heroBg}) center/cover no-repeat;
          opacity:.18;
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
        .rlg-hero h1 span { color: var(--green-500); display:block; }
        .rlg-hero p { color:rgba(255,255,255,.85); font-size:1.1rem; line-height:1.7; margin-bottom:2rem; max-width:520px; }
        @media(max-width:768px){ .rlg-hero p{ margin:0 auto 2rem; } }
        
        .rlg-hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        @media(max-width:768px){ .rlg-hero-buttons { justify-content: center; } }
        
        .rlg-hero-links { display: flex; gap: 1.5rem; flex-wrap: wrap; color: rgba(255,255,255,.7); font-size: .9rem; }
        .rlg-hero-links a { color: var(--green-400); text-decoration: none; transition: color .3s; }
        .rlg-hero-links a:hover { color: #fff; }
        
        .rlg-trust { display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem; }
        @media(max-width:768px){ .rlg-trust{justify-content:center;} }
        .rlg-trust-item { display:flex;align-items:center;gap:.4rem;color:rgba(255,255,255,.8);font-size:.85rem; }
        .rlg-trust-item svg { color:var(--green-500); }

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
        .rlg-hero-card-dot { width:2.5rem;height:2.5rem;border-radius:50%;background:var(--green-700);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .rlg-hero-card b { display:block;font-size:1rem;color:var(--green-800); }
        .rlg-hero-card span { font-size:.75rem;color:#666; }

        /* ── Buttons ── */
        .btn-primary-rlg {
          display:inline-flex;align-items:center;gap:.5rem;
          background:var(--green-700);color:#fff;
          padding:.75rem 1.75rem;border-radius:999px;font-weight:700;font-size:.95rem;
          border:none;cursor:pointer;transition:var(--transition);box-shadow:0 4px 16px rgba(21,128,61,.3);
        }
        .btn-primary-rlg:hover { background:var(--green-800);transform:translateY(-2px);box-shadow:0 8px 24px rgba(21,128,61,.4); }
        .btn-outline-rlg {
          display:inline-flex;align-items:center;gap:.5rem;
          background:transparent;color:#fff;
          padding:.75rem 1.75rem;border-radius:999px;font-weight:700;font-size:.95rem;
          border:2px solid rgba(255,255,255,.5);cursor:pointer;transition:var(--transition);
        }
        .btn-outline-rlg:hover { background:rgba(255,255,255,.12);border-color:#fff;transform:translateY(-2px); }

        /* ── Stats ── */
        .rlg-stats { background:#fff; padding:4rem 0; }
        .rlg-stats-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem; }
        @media(max-width:640px){ .rlg-stats-grid{grid-template-columns:1fr 1fr;} }
        .rlg-stat-card {
          text-align:center;padding:2rem 1rem;border-radius:var(--radius);
          border:1px solid #e5e7eb;transition:var(--transition);position:relative;overflow:hidden;
        }
        .rlg-stat-card::before {
          content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
          background:var(--green-700);transform:scaleX(0);transform-origin:left;transition:var(--transition);
        }
        .rlg-stat-card:hover { box-shadow:var(--shadow-md);transform:translateY(-4px); }
        .rlg-stat-card:hover::before { transform:scaleX(1); }
        .rlg-stat-icon { width:3.5rem;height:3.5rem;border-radius:50%;background:var(--green-100);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;transition:var(--transition); }
        .rlg-stat-card:hover .rlg-stat-icon { background:var(--green-700); }
        .rlg-stat-card:hover .rlg-stat-icon svg { color:#fff !important; }
        .rlg-stat-num { font-family:'Playfair Display',Georgia,serif;font-size:2.4rem;font-weight:800;color:var(--green-800);line-height:1; }
        .rlg-stat-label { color:#6b7280;font-size:.9rem;margin-top:.4rem; }

        /* ── Section label ── */
        .rlg-label {
          display:inline-flex;align-items:center;gap:.5rem;
          background:var(--green-100);color:var(--green-800);
          padding:.35rem 1rem;border-radius:999px;font-size:.8rem;font-weight:700;
          letter-spacing:.05em;text-transform:uppercase;margin-bottom:1rem;
        }
        .rlg-section-title { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:#111;margin-bottom:.75rem; }
        .rlg-section-sub { color:#6b7280;font-size:1rem;line-height:1.7;max-width:580px; }

        /* ── Mission Quote ── */
        .rlg-mission-quote {
          background: var(--green-50);
          border-left: 4px solid var(--green-700);
          padding: 2rem;
          border-radius: var(--radius);
          margin: 2rem 0;
          font-style: italic;
        }
        .rlg-mission-quote p { font-size: 1.1rem; line-height: 1.8; color: #374151; margin-bottom: .5rem; }
        .rlg-mission-quote cite { color: var(--green-700); font-weight: 600; font-style: normal; }

        /* ── What We Do Cards ── */
        .rlg-services { background: #fff; padding: 5rem 0; }
        .rlg-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        @media(max-width: 900px) { .rlg-services-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
        .rlg-service-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          transition: var(--transition);
          text-align: center;
        }
        .rlg-service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
        .rlg-service-icon {
          width: 4rem; height: 4rem; background: var(--green-700);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .rlg-service-icon svg { color: #fff; font-size: 1.5rem; }
        .rlg-service-card h3 { font-weight: 700; font-size: 1.2rem; margin-bottom: .5rem; }
        .rlg-service-card p { color: #6b7280; font-size: .9rem; line-height: 1.6; margin-bottom: 1rem; }
        .rlg-service-badges { display: flex; flex-wrap: wrap; gap: .5rem; justify-content: center; margin-top: 1rem; }
        .rlg-service-badge {
          background: var(--green-100); color: var(--green-800);
          padding: .25rem .75rem; border-radius: 999px; font-size: .7rem; font-weight: 600;
        }

        /* ── Values Cloud ── */
        .rlg-values { background: var(--green-50); padding: 5rem 0; }
        .rlg-values-cloud { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 2rem; }
        .rlg-value-pill {
          background: #fff;
          border: 1px solid var(--green-200);
          padding: .6rem 1.25rem;
          border-radius: 999px;
          font-size: .9rem;
          font-weight: 600;
          color: var(--green-800);
          transition: var(--transition);
        }
        .rlg-value-pill:hover { background: var(--green-700); color: #fff; transform: translateY(-2px); }

        /* ── Blog Preview ── */
        .rlg-blog { background: #fff; padding: 5rem 0; }
        .rlg-blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 3rem; }
        @media(max-width: 768px) { .rlg-blog-grid { grid-template-columns: 1fr; } }
        .rlg-blog-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          transition: var(--transition);
        }
        .rlg-blog-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .rlg-blog-date { color: var(--green-600); font-size: .8rem; margin-bottom: .5rem; display: flex; align-items: center; gap: .5rem; }
        .rlg-blog-card h3 { font-weight: 700; font-size: 1.2rem; margin-bottom: .75rem; }
        .rlg-blog-card p { color: #6b7280; font-size: .9rem; line-height: 1.6; margin-bottom: 1rem; }

        /* ── 7 Year Vision ── */
        .rlg-vision { background: var(--green-800); padding: 5rem 0; text-align: center; color: #fff; }
        .rlg-vision h2 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.5rem); margin-bottom: 1rem; }
        .rlg-vision p { max-width: 700px; margin: 0 auto 2rem; color: rgba(255,255,255,.8); }
        .rlg-vision-stats { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; margin-top: 2rem; }
        .rlg-vision-stat { text-align: center; }
        .rlg-vision-stat .number { font-size: 2rem; font-weight: 800; font-family: 'Playfair Display', serif; display: block; }

        /* ── Existing styles continue ── */
        .rlg-about, .rlg-programs, .rlg-features, .rlg-testimonials, .rlg-events, .rlg-impact, .rlg-partners, .rlg-newsletter, .rlg-cta {
          padding: 5rem 0;
        }
        .rlg-about { background: var(--green-50); }
        .rlg-programs, .rlg-events, .rlg-partners, .rlg-blog { background: #fff; }
        .rlg-testimonials { background: var(--green-800); }
        .rlg-impact { background: var(--green-50); }
        .rlg-newsletter { background: var(--green-50); }
        .rlg-cta { background: var(--green-900); }

        .rlg-about-grid, .rlg-impact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media(max-width: 768px) { .rlg-about-grid, .rlg-impact-grid { grid-template-columns: 1fr; gap: 2rem; } }
        
        .rlg-prog-grid, .rlg-evt-grid, .rlg-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        @media(max-width: 900px) { .rlg-prog-grid, .rlg-evt-grid, .rlg-feat-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width: 600px) { .rlg-prog-grid, .rlg-evt-grid, .rlg-feat-grid { grid-template-columns: 1fr; } }

        .rlg-partner-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; align-items: center; margin-top: 2rem; }
        .rlg-partner-pill { display: flex; align-items: center; gap: .6rem; background: var(--green-50); border: 1px solid #d1d5db; border-radius: 999px; padding: .5rem 1.25rem; transition: var(--transition); }
        .rlg-partner-pill:hover { border-color: var(--green-700); background: var(--green-100); transform: translateY(-2px); }
        
        .rlg-testi-card { background: #fff; border-radius: var(--radius); padding: 2.5rem; box-shadow: var(--shadow-lg); max-width: 780px; margin: 2.5rem auto 0; }
        .rlg-testi-quote { color: var(--green-200); font-size: 2.5rem; margin-bottom: 1rem; opacity: .4; }
        .rlg-testimonials .rlg-section-title { color: #fff; }
        .rlg-testimonials .rlg-section-sub { color: rgba(255,255,255,.7); }
        
        .rlg-newsletter-box { background: var(--green-800); border-radius: 1.5rem; padding: 3.5rem 2.5rem; text-align: center; position: relative; overflow: hidden; }
        .rlg-newsletter-form { display: flex; gap: .75rem; max-width: 440px; margin: 0 auto; }
        @media(max-width: 560px) { .rlg-newsletter-form { flex-direction: column; } }
        .rlg-newsletter-form input { flex: 1; padding: .75rem 1.25rem; border-radius: 999px; border: none; font-size: .95rem; outline: none; }
        
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
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faUsers} style={{ color: "var(--green-700)", fontSize: "1.3rem" }} /></div>
              <div className="rlg-stat-num">{youthReached}+</div>
              <div className="rlg-stat-label">Youth Reached</div>
            </div>
            <div className="rlg-stat-card fade-up-1">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faSchool} style={{ color: "var(--green-700)", fontSize: "1.3rem" }} /></div>
              <div className="rlg-stat-num">{schoolsPartnered}+</div>
              <div className="rlg-stat-label">Schools Partnered</div>
            </div>
            <div className="rlg-stat-card fade-up-2">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faCalendarAlt} style={{ color: "var(--green-700)", fontSize: "1.3rem" }} /></div>
              <div className="rlg-stat-num">{annualEvents}+</div>
              <div className="rlg-stat-label">Annual Events</div>
            </div>
            <div className="rlg-stat-card fade-up-3">
              <div className="rlg-stat-icon"><FontAwesomeIcon icon={faFlag} style={{ color: "var(--green-700)", fontSize: "1.3rem" }} /></div>
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
              <Link to="/programs#school"><button className="btn-ghost-rlg" style={{ marginTop: "1rem" }}>Learn More →</button></Link>
            </div>
            <div className="rlg-service-card fade-up-1">
              <div className="rlg-service-icon"><FontAwesomeIcon icon={faMicrophone} /></div>
              <h3>Tournaments & Competitions</h3>
              <p>Debate, public speaking, interschool challenges, entrepreneurship and leadership awards.</p>
              <div className="rlg-service-badges">
                <span className="rlg-service-badge">Light the Flame</span>
                <span className="rlg-service-badge">Oasis of Wealth</span>
              </div>
              <Link to="/programs#tournaments"><button className="btn-ghost-rlg" style={{ marginTop: "1rem" }}>Learn More →</button></Link>
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
              <Link to="/programs#forums"><button className="btn-ghost-rlg" style={{ marginTop: "1rem" }}>Learn More →</button></Link>
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

      {/* CORE VALUES */}
      <section className="rlg-values">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faMedal} /> Our Core Values</div>
            <h2 className="rlg-section-title">What We Stand For</h2>
          </div>
          <div className="rlg-values-cloud">
            {coreValues.map((value, i) => (
              <span key={i} className="rlg-value-pill fade-up" style={{ animationDelay: `${i * 0.05}s` }}>{value}</span>
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
            <div className="rlg-label rlg-testi-label"><FontAwesomeIcon icon={faComments} /> Success Stories</div>
            <h2 className="rlg-section-title">What Our Community Says</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto", color: "rgba(255,255,255,.7)" }}>Hear from young leaders who transformed their lives through RLG</p>
          </div>
          <div className="rlg-testi-card">
            <div className="rlg-testi-quote"><FontAwesomeIcon icon={faQuoteLeft} /></div>
            <p>{testimonials[currentTestimonial].text}</p>
            <div className="rlg-testi-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="rlg-testi-avatar" style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "var(--green-700)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{testimonials[currentTestimonial].initials}</div>
                <div>
                  <h4 style={{ fontWeight: 700 }}>{testimonials[currentTestimonial].name}</h4>
                  <span style={{ color: "#6b7280", fontSize: ".8rem" }}>{testimonials[currentTestimonial].role}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: ".5rem" }}>
                {testimonials.map((_, idx) => (
                  <button key={idx} className={`rlg-testi-dot`} style={{ width: idx === currentTestimonial ? "1.5rem" : ".5rem", height: ".5rem", borderRadius: "999px", background: idx === currentTestimonial ? "var(--green-700)" : "#d1d5db", border: "none", cursor: "pointer", transition: "var(--transition)" }} onClick={() => setCurrentTestimonial(idx)} />
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
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--green-400)" }} />
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
          <div className="rlg-cta-btns" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-white-rlg" onClick={handleApply}><FontAwesomeIcon icon={faRocket} /> Apply for Programs</button>
            <Link to="/contact"><button className="btn-outline-rlg"><FontAwesomeIcon icon={faComments} /> Talk to an Advisor</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}