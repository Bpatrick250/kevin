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
  faUserTie, faLeaf, faEye,
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
  { name: "Michael Chen", role: "Current Fellow", text: "The global network and resources provided by RLG are unmatched. I've connected with mentors from top companies worldwide.", rating: 5, initials: "MC" },
  { name: "Dr. Amina Patel", role: "Lead Mentor", text: "Working with RLG fellows has been incredibly rewarding. These young leaders are truly shaping our future.", rating: 5, initials: "AP" },
];

const programs = [
  { title: "Leadership Accelerator", description: "12-week intensive program for emerging leaders ready to scale their impact.", duration: "12 Weeks", spots: "15 spots left", icon: faUserTie },
  { title: "Young Entrepreneurs Hub", description: "Learn business skills, get mentorship, and launch your startup with funding opportunities.", duration: "6 Months", spots: "20 spots left", icon: faBuilding },
  { title: "Sustainability Champions", description: "Lead environmental projects and become a catalyst for green change in your community.", duration: "8 Weeks", spots: "10 spots left", icon: faLeaf },
];




const features = [
  {
    icon: faLightbulb,
    title: "National-Class Mentorship",
    description: "Learn from industry leaders and experienced professionals who guide your growth journey.",
    points: ["1-on-1 mentoring sessions", "Career guidance", "Networking opportunities", "Personalized feedback"],
  },
  {
    icon: faGlobe,
    title: "National Community",
    description: "Connect with like-minded peers from around Rwanda and build lasting networks.",
    points: ["Rwandans country represented", "Cultural exchange programs", "Global conferences", "Online community platform"],
  },
  {
    icon: faChartLine,
    title: "Real Projects",
    description: "Work on impactful initiatives that create tangible change in communities.",
    points: ["Social impact projects", "Leadership portfolios", "Funding opportunities", "Recognition awards"],
  },
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

  const members  = useCountUp(100);
  const countries = useCountUp(3);
  const mentors  = useCountUp(20);
  const events   = useCountUp(10);

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
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes spin     { to{transform:rotate(360deg)} }

        .fade-up   { animation: fadeUp .7s both; }
        .fade-up-1 { animation: fadeUp .7s .1s both; }
        .fade-up-2 { animation: fadeUp .7s .2s both; }
        .fade-up-3 { animation: fadeUp .7s .3s both; }
        .fade-up-4 { animation: fadeUp .7s .4s both; }
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
        .btn-green-rlg {
          display:inline-flex;align-items:center;gap:.5rem;
          background:var(--green-700);color:#fff;
          padding:.6rem 1.5rem;border-radius:999px;font-weight:600;font-size:.9rem;
          border:none;cursor:pointer;transition:var(--transition);
        }
        .btn-green-rlg:hover { background:var(--green-800);transform:translateY(-2px); }
        .btn-ghost-rlg {
          display:inline-flex;align-items:center;gap:.5rem;
          background:transparent;color:var(--green-800);
          padding:.6rem 1.5rem;border-radius:999px;font-weight:600;font-size:.9rem;
          border:2px solid var(--green-700);cursor:pointer;transition:var(--transition);
        }
        .btn-ghost-rlg:hover { background:var(--green-50);transform:translateY(-2px); }

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
        .rlg-stat-sub { color:var(--green-600);font-size:.75rem;margin-top:.3rem; }

        /* ── Section label ── */
        .rlg-label {
          display:inline-flex;align-items:center;gap:.5rem;
          background:var(--green-100);color:var(--green-800);
          padding:.35rem 1rem;border-radius:999px;font-size:.8rem;font-weight:700;
          letter-spacing:.05em;text-transform:uppercase;margin-bottom:1rem;
        }
        .rlg-section-title { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:#111;margin-bottom:.75rem; }
        .rlg-section-sub { color:#6b7280;font-size:1rem;line-height:1.7;max-width:580px; }

        /* ── About ── */
        .rlg-about { background:var(--green-50);padding:5rem 0; }
        .rlg-about-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center; }
        @media(max-width:768px){ .rlg-about-grid{grid-template-columns:1fr;gap:2.5rem;} }
        .rlg-about p { color:#4b5563;line-height:1.8;margin-bottom:1rem; }
        .rlg-about-cards { display:grid;grid-template-columns:1fr 1fr;gap:1rem; }
        .rlg-mini-card {
          background:#fff;border-radius:var(--radius);padding:1.5rem;text-align:center;
          box-shadow:var(--shadow-sm);border:1px solid #e5e7eb;transition:var(--transition);
        }
        .rlg-mini-card:hover { box-shadow:var(--shadow-md);transform:translateY(-3px); }
        .rlg-mini-card:last-child { grid-column:1/-1; }
        .rlg-mini-card svg { color:var(--green-700);margin-bottom:.75rem;font-size:2rem; }
        .rlg-mini-card h3 { font-weight:700;font-size:1rem;color:#111;margin-bottom:.4rem; }
        .rlg-mini-card p { color:#6b7280;font-size:.85rem;margin:0; }
        .rlg-btn-row { display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem; }

        /* ── Programs ── */
        .rlg-programs { background:#fff;padding:5rem 0; }
        .rlg-prog-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;margin-top:3rem; }
        @media(max-width:900px){ .rlg-prog-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px){ .rlg-prog-grid{grid-template-columns:1fr;} }
        .rlg-prog-card {
          border-radius:var(--radius);border:1px solid #e5e7eb;padding:2rem;
          transition:var(--transition);position:relative;overflow:hidden;background:#fff;
        }
        .rlg-prog-card::after {
          content:'';position:absolute;top:0;left:0;right:0;height:4px;
          background:var(--green-700);transform:scaleX(0);transform-origin:left;transition:var(--transition);
        }
        .rlg-prog-card:hover { box-shadow:var(--shadow-lg);transform:translateY(-6px); }
        .rlg-prog-card:hover::after { transform:scaleX(1); }
        .rlg-prog-icon {
          width:3.5rem;height:3.5rem;border-radius:.875rem;background:var(--green-100);
          display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;transition:var(--transition);
        }
        .rlg-prog-card:hover .rlg-prog-icon { background:var(--green-700); }
        .rlg-prog-card:hover .rlg-prog-icon svg { color:#fff !important; }
        .rlg-prog-icon svg { color:var(--green-700);font-size:1.3rem; }
        .rlg-prog-card h3 { font-weight:700;font-size:1.1rem;color:#111;margin-bottom:.5rem; }
        .rlg-prog-card p { color:#6b7280;font-size:.88rem;line-height:1.6;margin-bottom:1rem; }
        .rlg-prog-meta { display:flex;justify-content:space-between;font-size:.78rem;color:#9ca3af;margin-bottom:1.25rem; }
        .rlg-prog-meta .spots { color:var(--green-700);font-weight:700; }

        /* ── Features ── */
        .rlg-features { background:var(--green-50);padding:5rem 0; }
        .rlg-feat-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:3rem; }
        @media(max-width:900px){ .rlg-feat-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px){ .rlg-feat-grid{grid-template-columns:1fr;} }
        .rlg-feat-card {
          background:#fff;border-radius:var(--radius);padding:2rem;
          box-shadow:var(--shadow-sm);border:1px solid #e5e7eb;transition:var(--transition);
        }
        .rlg-feat-card:hover { box-shadow:var(--shadow-md);transform:translateY(-4px); }
        .rlg-feat-icon {
          width:4rem;height:4rem;border-radius:1rem;background:var(--green-700);
          display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;
          box-shadow:0 4px 14px rgba(21,128,61,.3);transition:var(--transition);
        }
        .rlg-feat-card:hover .rlg-feat-icon { transform:scale(1.1) rotate(-3deg); }
        .rlg-feat-icon svg { color:#fff;font-size:1.4rem; }
        .rlg-feat-card h3 { font-weight:700;font-size:1.1rem;color:#111;margin-bottom:.5rem; }
        .rlg-feat-card > p { color:#6b7280;font-size:.9rem;line-height:1.6;margin-bottom:1rem; }
        .rlg-feat-list { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.4rem; }
        .rlg-feat-list li { display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:#4b5563; }
        .rlg-feat-list li svg { color:var(--green-600);font-size:.75rem;flex-shrink:0; }

        /* ── Testimonials ── */
        .rlg-testimonials { background:var(--green-800);padding:5rem 0; }
        .rlg-testi-label { background:rgba(255,255,255,.15);color:#fff; }
        .rlg-testimonials .rlg-section-title { color:#fff; }
        .rlg-testimonials .rlg-section-sub { color:rgba(255,255,255,.7); }
        .rlg-testi-card {
          background:#fff;border-radius:var(--radius);padding:2.5rem;
          box-shadow:var(--shadow-lg);max-width:780px;margin:2.5rem auto 0;
          animation:fadeIn .5s both;
        }
        .rlg-testi-quote { color:var(--green-200);font-size:2.5rem;margin-bottom:1rem;opacity:.4; }
        .rlg-testi-card > p { font-size:1.1rem;line-height:1.8;color:#111;margin-bottom:1.5rem; }
        .rlg-testi-footer { display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem; }
        .rlg-testi-author { display:flex;align-items:center;gap:1rem; }
        .rlg-testi-avatar {
          width:3rem;height:3rem;border-radius:50%;background:var(--green-700);
          color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;
        }
        .rlg-testi-author h4 { font-weight:700;color:#111;font-size:.95rem;margin:0; }
        .rlg-testi-author span { color:#6b7280;font-size:.8rem; }
        .rlg-testi-stars { display:flex;gap:.2rem; }
        .rlg-testi-stars svg { color:#f59e0b;font-size:.9rem; }
        .rlg-testi-dots { display:flex;gap:.5rem;align-items:center; }
        .rlg-testi-dot { width:.5rem;height:.5rem;border-radius:999px;background:#d1d5db;border:none;cursor:pointer;padding:0;transition:var(--transition); }
        .rlg-testi-dot.active { width:1.5rem;background:var(--green-700); }

        /* ── Events ── */
        .rlg-events { background:#fff;padding:5rem 0; }
        .rlg-events-header { display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:3rem; }
        .rlg-evt-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem; }
        @media(max-width:900px){ .rlg-evt-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:600px){ .rlg-evt-grid{grid-template-columns:1fr;} }
        .rlg-evt-card {
          border-radius:var(--radius);border:1px solid #e5e7eb;padding:1.5rem;
          transition:var(--transition);background:#fff;
        }
        .rlg-evt-card:hover { box-shadow:var(--shadow-md);transform:translateY(-4px); }
        .rlg-evt-top { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem; }
        .rlg-evt-icon { width:2.8rem;height:2.8rem;border-radius:.75rem;background:var(--green-700);display:flex;align-items:center;justify-content:center; }
        .rlg-evt-icon svg { color:#fff;font-size:1rem; }
        .rlg-badge { background:var(--green-100);color:var(--green-800);font-size:.72rem;font-weight:700;padding:.25rem .75rem;border-radius:999px; }
        .rlg-evt-card h3 { font-weight:700;font-size:1rem;color:#111;margin-bottom:.75rem; }
        .rlg-evt-meta { display:flex;flex-direction:column;gap:.4rem;margin-bottom:1.25rem; }
        .rlg-evt-meta span { display:flex;align-items:center;gap:.5rem;font-size:.83rem;color:#6b7280; }
        .rlg-evt-meta svg { color:var(--green-600);font-size:.75rem; }

        /* ── Impact ── */
        .rlg-impact { background:var(--green-50);padding:5rem 0; }
        .rlg-impact-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center; }
        @media(max-width:768px){ .rlg-impact-grid{grid-template-columns:1fr;gap:2.5rem;} }
        .rlg-impact p { color:#4b5563;line-height:1.8;margin-bottom:1.5rem; }
        .rlg-progress-item { margin-bottom:1.25rem; }
        .rlg-progress-label { display:flex;justify-content:space-between;margin-bottom:.4rem; }
        .rlg-progress-label span:first-child { font-weight:600;font-size:.9rem;color:#111; }
        .rlg-progress-label span:last-child { font-weight:700;color:var(--green-700); }
        .rlg-progress-track { height:.55rem;background:#e5e7eb;border-radius:999px;overflow:hidden; }
        .rlg-progress-fill { height:100%;background:var(--green-700);border-radius:999px;transition:width 1.2s cubic-bezier(.4,0,.2,1); }
        .rlg-impact-mini { display:grid;grid-template-columns:1fr 1fr;gap:1rem; }
        .rlg-impact-card {
          background:#fff;border-radius:var(--radius);padding:1.5rem;text-align:center;
          box-shadow:var(--shadow-sm);border:1px solid #e5e7eb;transition:var(--transition);
        }
        .rlg-impact-card:hover { box-shadow:var(--shadow-md);transform:translateY(-3px); }
        .rlg-impact-card svg { color:var(--green-700);font-size:1.6rem;margin-bottom:.5rem; }
        .rlg-impact-card .num { font-family:'Playfair Display',Georgia,serif;font-size:1.7rem;font-weight:800;color:var(--green-800); }
        .rlg-impact-card p { color:#6b7280;font-size:.8rem;margin:0; }

        /* ── Partners ── */
        .rlg-partners { background:#fff;padding:4rem 0; }
        .rlg-partners h3 { font-family:'Playfair Display',Georgia,serif;font-size:1.5rem;font-weight:700;text-align:center;color:#111;margin-bottom:.4rem; }
        .rlg-partners .sub { text-align:center;color:#9ca3af;font-size:.9rem;margin-bottom:2.5rem; }
        .rlg-partner-row { display:flex;flex-wrap:wrap;justify-content:center;gap:2rem;align-items:center; }
        .rlg-partner-pill {
          display:flex;align-items:center;gap:.6rem;
          background:var(--green-50);border:1px solid #d1d5db;border-radius:999px;
          padding:.5rem 1.25rem;transition:var(--transition);
        }
        .rlg-partner-pill:hover { border-color:var(--green-700);background:var(--green-100);transform:translateY(-2px); }
        .rlg-partner-pill svg { color:var(--green-600); }
        .rlg-partner-pill span { font-weight:600;font-size:.88rem;color:#374151; }

        /* ── Newsletter ── */
        .rlg-newsletter { padding:5rem 0;background:var(--green-50); }
        .rlg-newsletter-box {
          background:var(--green-800);border-radius:1.5rem;padding:3.5rem 2.5rem;
          text-align:center;position:relative;overflow:hidden;
        }
        .rlg-newsletter-box::before {
          content:'';position:absolute;top:-60px;right:-60px;width:240px;height:240px;
          border-radius:50%;background:rgba(255,255,255,.05);
        }
        .rlg-newsletter-box::after {
          content:'';position:absolute;bottom:-80px;left:-80px;width:300px;height:300px;
          border-radius:50%;background:rgba(255,255,255,.04);
        }
        .rlg-newsletter-box svg { color:var(--green-400);font-size:2.5rem;margin-bottom:1rem; }
        .rlg-newsletter-box h3 { font-family:'Playfair Display',Georgia,serif;font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:.75rem; }
        .rlg-newsletter-box p { color:rgba(255,255,255,.75);margin-bottom:1.75rem;max-width:480px;margin-left:auto;margin-right:auto; }
        .rlg-newsletter-form { display:flex;gap:.75rem;max-width:440px;margin:0 auto; }
        @media(max-width:560px){ .rlg-newsletter-form{flex-direction:column;} }
        .rlg-newsletter-form input {
          flex:1;padding:.75rem 1.25rem;border-radius:999px;border:none;
          font-size:.95rem;outline:none;background:#fff;color:#111;
        }
        .rlg-newsletter-form input:focus { box-shadow:0 0 0 3px rgba(34,197,94,.3); }
        .rlg-newsletter-note { color:rgba(255,255,255,.55);font-size:.8rem;margin-top:1rem; }
        .rlg-newsletter-note svg { color:var(--green-400); }

        /* ── CTA ── */
        .rlg-cta { background:var(--green-900);padding:5rem 0;text-align:center; }
        .rlg-cta h2 { font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;color:#fff;margin-bottom:1rem; }
        .rlg-cta p { color:rgba(255,255,255,.75);font-size:1rem;max-width:520px;margin:0 auto 2rem; }
        .rlg-cta-btns { display:flex;gap:1rem;justify-content:center;flex-wrap:wrap; }
        .btn-white-rlg {
          display:inline-flex;align-items:center;gap:.5rem;
          background:#fff;color:var(--green-800);
          padding:.75rem 1.75rem;border-radius:999px;font-weight:700;font-size:.95rem;
          border:none;cursor:pointer;transition:var(--transition);
        }
        .btn-white-rlg:hover { background:var(--green-100);transform:translateY(-2px); }

        /* ── Imports ── */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO */}
      <section className="rlg-hero">
        <div className="rlg-container">
          <div className="rlg-hero-grid">
            <div className="fade-up">
             
              <h1>
                Lead and Empower
                <span>For Change</span>
              </h1>
              <p>Empowering the next generation of visionary leaders to create lasting impact in their communities and beyond. Join 100+ young leaders in Rwanda.</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-primary-rlg" onClick={handleApply}>
                  <FontAwesomeIcon icon={faRocket} /> Apply Now
                </button>
                <button className="btn-outline-rlg" onClick={handleWatch}>
                  <FontAwesomeIcon icon={faPlayCircle} /> Watch Video
                </button>
              </div>
              <div className="rlg-trust">
                {["Free to Apply", "Scholarships Available", "Global Recognition"].map(t => (
                  <div key={t} className="rlg-trust-item">
                    <FontAwesomeIcon icon={faCheckCircle} /> <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rlg-hero-img-wrap fade-up-2 float">
              <img src={heroImage} alt="Young Leaders in Rwanda" />
              <div className="rlg-hero-card">
                <div className="rlg-hero-card-dot">
                  <FontAwesomeIcon icon={faUsers} style={{ color: "#fff" }} />
                </div>
                <div>
                  <b>100+ Young Leaders</b>
                  <span>Across Rwanda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="rlg-stats">
        <div className="rlg-container">
          <div className="rlg-stats-grid">
            {[
              { val: members,   label: "Active Members",  sub: "↑ 45% this year",    icon: faUsers,        col: "var(--green-700)" },
              { val: countries, label: "Countries",       sub: "Global reach",        icon: faGlobe,        col: "var(--green-700)" },
              { val: mentors,   label: "Expert Mentors",  sub: "Industry leaders",    icon: faGraduationCap, col: "var(--green-700)" },
              { val: events,    label: "Events Yearly",   sub: "Workshops & summits", icon: faCalendarAlt,  col: "var(--green-700)" },
            ].map(({ val, label, sub, icon }, i) => (
              <div key={i} className="rlg-stat-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-stat-icon">
                  <FontAwesomeIcon icon={icon} style={{ color: "var(--green-700)", fontSize: "1.3rem" }} />
                </div>
                <div className="rlg-stat-num">{val}+</div>
                <div className="rlg-stat-label">{label}</div>
                <div className="rlg-stat-sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="rlg-about">
        <div className="rlg-container">
          <div className="rlg-about-grid">
            <div className="fade-up">
              <div className="rlg-label"><FontAwesomeIcon icon={faEye} /> Our Story</div>
              <h2 className="rlg-section-title">Building Tomorrow's Leaders Today</h2>
              <p>Founded in 2020, Rising Leaders of Generation (RLG) has been at the forefront of youth leadership development in Rwanda. We believe that every young person has the potential to be a leader.</p>
              <p>Our programs combine world-class mentorship, practical projects, and a supportive community to help young leaders thrive and create lasting impact in their communities.</p>
              <div className="rlg-btn-row">
                <button className="btn-green-rlg" onClick={handleLearn}>
                  <FontAwesomeIcon icon={faArrowRight} /> Learn More About Us
                </button>
                <Link to="/about">
                  <button className="btn-ghost-rlg"><FontAwesomeIcon icon={faUserTie} /> Meet Our Team</button>
                </Link>
              </div>
            </div>
            <div className="rlg-about-cards fade-up-2">
              <div className="rlg-mini-card">
                <FontAwesomeIcon icon={faBullhorn} />
                <h3>Our Mission</h3>
                <p>Empower young leaders with skills, networks, and opportunities.</p>
              </div>
              <div className="rlg-mini-card">
                <FontAwesomeIcon icon={faEye} />
                <h3>Our Vision</h3>
                <p>A world where every young person can lead positive change.</p>
              </div>
              <div className="rlg-mini-card">
                <FontAwesomeIcon icon={faHeart} />
                <h3>Our Values</h3>
                <p>Integrity, Innovation, Collaboration, Excellence, and Impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="rlg-programs">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faStar} /> Our Programs</div>
            <h2 className="rlg-section-title">Transform Your Leadership Journey</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Choose from our specialized programs designed to help you grow as a leader</p>
          </div>
          <div className="rlg-prog-grid">
            {programs.map((p, i) => (
              <div key={i} className="rlg-prog-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-prog-icon"><FontAwesomeIcon icon={p.icon} /></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="rlg-prog-meta">
                  <span><FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: ".3rem" }} />{p.duration}</span>
                  <span className="spots">{p.spots}</span>
                </div>
                <button className="btn-green-rlg" style={{ width: "100%", justifyContent: "center" }} onClick={handleApply}>
                  Apply Now <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/programs">
              <button className="btn-ghost-rlg">View All Programs <FontAwesomeIcon icon={faArrowRight} /></button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rlg-features">
        <div className="rlg-container">
          <div style={{ textAlign: "center" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faLightbulb} /> Why Choose Us</div>
            <h2 className="rlg-section-title">What Makes RLG Different</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>We provide everything you need to grow as a leader and make a real impact</p>
          </div>
          <div className="rlg-feat-grid">
            {features.map((f, i) => (
              <div key={i} className="rlg-feat-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="rlg-feat-icon"><FontAwesomeIcon icon={f.icon} /></div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <ul className="rlg-feat-list">
                  {f.points.map((pt, j) => (
                    <li key={j}><FontAwesomeIcon icon={faCheckCircle} />{pt}</li>
                  ))}
                </ul>
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
            <div className="rlg-testi-footer">
              <div className="rlg-testi-author">
                <div className="rlg-testi-avatar">{testimonials[currentTestimonial].initials}</div>
                <div>
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <span>{testimonials[currentTestimonial].role}</span>
                  <div className="rlg-testi-stars">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rlg-testi-dots">
                {testimonials.map((_, idx) => (
                  <button key={idx} className={`rlg-testi-dot${idx === currentTestimonial ? " active" : ""}`} onClick={() => setCurrentTestimonial(idx)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* IMPACT */}
      <section className="rlg-impact">
        <div className="rlg-container">
          <div className="rlg-impact-grid">
            <div className="fade-up">
              <div className="rlg-label"><FontAwesomeIcon icon={faTrophy} /> Our Impact</div>
              <h2 className="rlg-section-title">Making a Difference in Rwanda</h2>
              <p>Since 2020, RLG has been committed to developing the next generation of leaders who are creating positive change in their communities across Rwanda.</p>
              {[
                { label: "Community Projects Completed", val: "150+", width: "85%" },
                { label: "Mentorship Hours Provided", val: "10,000+", width: "90%" },
                { label: "Youth Employed / Placed", val: "2,000+", width: "75%" },
              ].map((item, i) => (
                <div key={i} className="rlg-progress-item">
                  <div className="rlg-progress-label">
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div className="rlg-progress-track">
                    <div className="rlg-progress-fill" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rlg-impact-mini fade-up-2">
              {[
                { icon: faTree, num: "5,000+", label: "Trees Planted" },
                { icon: faBookOpen, num: "50+", label: "Scholarships" },
                { icon: faLaptopCode, num: "30+", label: "Tech Workshops" },
                { icon: faAward, num: "25+", label: "Awards Won" },
              ].map((card, i) => (
                <div key={i} className="rlg-impact-card">
                  <FontAwesomeIcon icon={card.icon} />
                  <div className="num">{card.num}</div>
                  <p>{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {/* NEWSLETTER */}
      <section className="rlg-newsletter">
        <div className="rlg-container">
          <div className="rlg-newsletter-box">
            <FontAwesomeIcon icon={faEnvelope} />
            <h3>Stay Updated with RLG</h3>
            <p>Subscribe to our newsletter for leadership tips, event announcements, and success stories.</p>
            <form className="rlg-newsletter-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit" className="btn-primary-rlg">
                Subscribe <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
            <p className="rlg-newsletter-note"><FontAwesomeIcon icon={faHeart} /> &nbsp;No spam, unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rlg-cta">
        <div className="rlg-container">
          <h2>Ready to Start Your Leadership Journey?</h2>
          <p>Join young leaders who are making a difference in Rwanda and around the world.</p>
          <div className="rlg-cta-btns">
            <button className="btn-white-rlg" onClick={handleApply}>
              <FontAwesomeIcon icon={faRocket} /> Apply for Programs
            </button>
            <Link to="/contact">
              <button className="btn-outline-rlg"><FontAwesomeIcon icon={faComments} /> Talk to an Advisor</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}