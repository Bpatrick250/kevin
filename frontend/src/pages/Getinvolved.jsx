import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers, faChalkboardUser, faHandsHelping, faHandshake,
  faEnvelope, faPhone, faMapMarkerAlt, faCheckCircle,
  faArrowRight, faStar, faClock, faCertificate, faNetworkWired,
  faCalendarAlt, faUserGraduate, faBuilding, faLeaf,
  faMicrophone, faTrophy, faComments, faHeart, faSpinner
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });
const showError = (title, text) =>
  Swal.fire({ icon: "error", title, text, confirmButtonColor: "#166534" });

/* ─── API Service ─────────────────────────────────────────────── */
const API_URL = 'http://localhost:5000/api';

const api = {
  submitGetInvolved: async (data) => {
    const response = await fetch(`${API_URL}/getinvolved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit application');
    return result;
  }
};

/* ─── Component ───────────────────────────────────────────────── */
export default function Getinvolved() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    interest: "",
    district: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.interest) {
      showError("Missing Information", "Please fill in your name, email, and how you'd like to help.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await api.submitGetInvolved(formData);
      showSuccess(
        "Application Submitted! 🎉",
        `Thank you ${formData.fullName}! An RLG coordinator will contact you within 3-5 days.`
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        organization: "",
        interest: "",
        district: "",
        message: ""
      });
    } catch (error) {
      showError("Submission Failed", error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const opportunities = [
    {
      id: 1,
      title: "Start or Join an RLG Club",
      target: "Students in schools",
      icon: faUsers,
      benefits: [
        "Leadership training materials",
        "Mentorship from RLG coordinators",
        "Connection to national tournaments and forums"
      ],
      action: "Register Your Club",
      value: "Start/Join an RLG Club"
    },
    {
      id: 2,
      title: "Become a Mentor or Trainer",
      target: "Professionals, university students, retired teachers",
      icon: faChalkboardUser,
      benefits: [
        "Public speaking and debate coaching",
        "Entrepreneurship guidance",
        "Leadership and governance training",
        "Environmental action leadership"
      ],
      timeCommitment: "2–4 hours per month",
      action: "Apply as Mentor",
      value: "Become a Mentor"
    },
    {
      id: 3,
      title: "Volunteer at Events",
      target: "Anyone passionate about youth development",
      icon: faHandsHelping,
      benefits: [
        "Light the Flame debate tournaments",
        "Leadership summits and forums",
        "RLG Green Life campaigns",
        "School bootcamps"
      ],
      action: "Volunteer Signup",
      value: "Volunteer at Events"
    },
    {
      id: 4,
      title: "Partner Your Organization",
      target: "Schools, universities, NGOs, private sector, government",
      icon: faHandshake,
      benefits: [
        "Hosting events at your venue",
        "Sponsoring program materials",
        "Providing expert speakers",
        "Funding scholarships for students"
      ],
      action: "Become a Partner",
      value: "Partner My Organization"
    }
  ];

  const faqs = [
    {
      q: "Is there a fee to join RLG as a student?",
      a: "No. RLG programs are free for students in partner schools."
    },
    {
      q: "Can I start an RLG Club if my school isn't partnered yet?",
      a: "Yes. Contact us and we will reach out to your school administration."
    },
    {
      q: "Do mentors get paid?",
      a: "Currently, RLG mentors are volunteers, but we provide certificates, recognition, and networking opportunities."
    }
  ];

  return (
    <div className="rlg-getinvolved-page pt-16">
      <style>{`
        .rlg-getinvolved-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
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
        
        .fade-up { animation: fadeUp .7s both; }
        .fade-up-1 { animation: fadeUp .7s .1s both; }
        .fade-up-2 { animation: fadeUp .7s .2s both; }
        .fade-up-3 { animation: fadeUp .7s .3s both; }

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

        /* Opportunities Grid */
        .rlg-opportunities { padding: 5rem 0; background: #fff; }
        .rlg-opp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) { .rlg-opp-grid { grid-template-columns: 1fr; } }
        .rlg-opp-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        .rlg-opp-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          transform: scaleX(0);
          transform-origin: left;
          transition: var(--transition);
        }
        .rlg-opp-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .rlg-opp-card:hover::before { transform: scaleX(1); }
        .rlg-opp-icon {
          width: 4rem; height: 4rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .rlg-opp-icon svg { color: #fff; font-size: 1.5rem; }
        .rlg-opp-card h3 { font-size: 1.3rem; font-weight: 800; color: #14532d; margin-bottom: 0.3rem; }
        .rlg-opp-target { color: #22c55e; font-size: 0.8rem; font-weight: 600; margin-bottom: 1rem; }
        .rlg-opp-benefits { list-style: none; padding: 0; margin: 1rem 0; }
        .rlg-opp-benefits li { display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; color: #6b7280; font-size: 0.85rem; }
        .rlg-opp-benefits li svg { color: #22c55e; font-size: 0.8rem; }
        .rlg-time-badge { display: inline-block; background: var(--green-100); padding: 0.3rem 0.8rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; color: #14532d; margin: 0.5rem 0; }
        .rlg-opp-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; padding: 0.7rem 1.5rem; border-radius: 999px;
          font-weight: 600; font-size: 0.85rem; border: none; cursor: pointer;
          transition: var(--transition); width: 100%; margin-top: 1rem;
        }
        .rlg-opp-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(34,197,94,0.3); }

        /* Form Section */
        .rlg-form-section { background: var(--green-50); padding: 5rem 0; }
        .rlg-form-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-md);
          max-width: 800px;
          margin: 0 auto;
        }
        .rlg-form-group { margin-bottom: 1.2rem; }
        .rlg-form-group label { display: block; font-weight: 600; color: #14532d; margin-bottom: 0.5rem; }
        .rlg-form-group input, .rlg-form-group select, .rlg-form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition);
        }
        .rlg-form-group input:focus, .rlg-form-group select:focus, .rlg-form-group textarea:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }
        .rlg-radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .rlg-radio-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: normal;
          cursor: pointer;
        }
        .rlg-radio-group input { width: auto; }
        .rlg-submit-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; padding: 1rem; border-radius: 999px;
          font-weight: 700; font-size: 1rem; border: none; cursor: pointer;
          transition: var(--transition); width: 100%;
        }
        .rlg-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }

        /* Steps Section */
        .rlg-steps { padding: 5rem 0; background: #fff; }
        .rlg-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) { .rlg-steps-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rlg-steps-grid { grid-template-columns: 1fr; } }
        .rlg-step-card {
          text-align: center;
          padding: 1.5rem;
          background: var(--green-50);
          border-radius: var(--radius);
          transition: var(--transition);
        }
        .rlg-step-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-sm); }
        .rlg-step-number {
          width: 3rem; height: 3rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem; color: #fff; font-weight: 800; font-size: 1.2rem;
        }
        .rlg-step-card h3 { font-weight: 700; color: #14532d; margin-bottom: 0.5rem; }
        .rlg-step-card p { color: #6b7280; font-size: 0.85rem; }

        /* FAQ Section */
        .rlg-faq { background: var(--green-50); padding: 5rem 0; }
        .rlg-faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (max-width: 768px) { .rlg-faq-grid { grid-template-columns: 1fr; } }
        .rlg-faq-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          transition: var(--transition);
        }
        .rlg-faq-card:hover { box-shadow: var(--shadow-sm); border-color: #22c55e; }
        .rlg-faq-card h3 { font-weight: 800; color: #14532d; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .rlg-faq-card p { color: #6b7280; line-height: 1.6; }

        /* CTA Section */
        .rlg-cta-section { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 4rem 0; text-align: center; }
        .rlg-cta-section h2 { color: #fff; font-size: 1.8rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; }
        .rlg-cta-section p { color: rgba(255,255,255,.8); max-width: 600px; margin: 0 auto; }

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
              <h1>Join the Movement</h1>
              <p>Get Involved with RLG – Be part of the next generation of leaders shaping Rwanda's future</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO TEXT */}
      <div className="rlg-container" style={{ marginTop: "2rem" }}>
        <div className="rlg-mission-quote" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", padding: "2rem", borderRadius: "var(--radius)", textAlign: "center" }}>
          <p style={{ fontSize: "1.1rem", color: "#14532d" }}>
            By the next 7 years, RLG aims to expand across Rwanda and build a network of young leaders influencing governance, business, and social change. 
            <strong> Be part of that journey.</strong>
          </p>
        </div>
      </div>

      {/* FOUR WAYS TO PARTICIPATE */}
      <section className="rlg-opportunities">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faStar} /> Four Ways to Participate</div>
            <h2 className="rlg-section-title">Choose Your Path</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Find the opportunity that fits your skills and passion</p>
          </div>
          <div className="rlg-opp-grid">
            {opportunities.map((opp, index) => (
              <div key={opp.id} className="rlg-opp-card fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="rlg-opp-icon">
                  <FontAwesomeIcon icon={opp.icon} />
                </div>
                <h3>{opp.title}</h3>
                <div className="rlg-opp-target">
                  <FontAwesomeIcon icon={faUserGraduate} style={{ marginRight: ".3rem", fontSize: ".7rem" }} />
                  {opp.target}
                </div>
                <ul className="rlg-opp-benefits">
                  {opp.benefits.map((benefit, i) => (
                    <li key={i}><FontAwesomeIcon icon={faCheckCircle} /> {benefit}</li>
                  ))}
                </ul>
                {opp.timeCommitment && (
                  <div className="rlg-time-badge">
                    <FontAwesomeIcon icon={faClock} /> {opp.timeCommitment}
                  </div>
                )}
                <button 
                  className="rlg-opp-btn"
                  onClick={() => {
                    setFormData({ ...formData, interest: opp.value });
                    document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {opp.action} <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="interest-form" className="rlg-form-section">
        <div className="rlg-container">
          <div className="fade-up-2">
            <div className="rlg-label"><FontAwesomeIcon icon={faEnvelope} /> Registration Form</div>
            <h2 className="rlg-section-title">Express Your Interest</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Fill out the form below. An RLG coordinator will contact you within 3–5 days.</p>
          </div>
          
          <div className="rlg-form-card fade-up-3">
            <form onSubmit={handleSubmit}>
              <div className="rlg-form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              
              <div className="rlg-form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              <div className="rlg-form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              
              <div className="rlg-form-group">
                <label>Organization/School (if applicable)</label>
                <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
              </div>
              
              <div className="rlg-form-group">
                <label>How would you like to help? *</label>
                <div className="rlg-radio-group">
                  {opportunities.map((opp) => (
                    <label key={opp.id}>
                      <input type="radio" name="interest" value={opp.value} checked={formData.interest === opp.value} onChange={handleChange} />
                      {opp.title}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="rlg-form-group">
                <label>Your City/District</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="e.g., Kigali, Rubavu, Huye..." />
              </div>
              
              <div className="rlg-form-group">
                <label>Message (optional)</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Tell us more about how you'd like to contribute..."></textarea>
              </div>
              
              <button type="submit" className="rlg-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin /> Submitting...</> : "Submit Interest"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="rlg-steps">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faCalendarAlt} /> What Happens Next?</div>
            <h2 className="rlg-section-title">Your Journey With RLG</h2>
          </div>
          <div className="rlg-steps-grid">
            <div className="rlg-step-card fade-up-2">
              <div className="rlg-step-number">1</div>
              <h3>We receive your form</h3>
              <p>Your information is safely stored and reviewed by our team</p>
            </div>
            <div className="rlg-step-card fade-up-2">
              <div className="rlg-step-number">2</div>
              <h3>A Community Coordinator contacts you</h3>
              <p>Within 3-5 days, we'll reach out via phone or email</p>
            </div>
            <div className="rlg-step-card fade-up-3">
              <div className="rlg-step-number">3</div>
              <h3>We match you with the right opportunity</h3>
              <p>Based on your skills and interests</p>
            </div>
            <div className="rlg-step-card fade-up-3">
              <div className="rlg-step-number">4</div>
              <h3>You start making impact</h3>
              <p>Begin your leadership journey with RLG</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="rlg-faq">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faComments} /> Frequently Asked Questions</div>
            <h2 className="rlg-section-title">Got Questions?</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Find answers to common questions about getting involved</p>
          </div>
          <div className="rlg-faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="rlg-faq-card fade-up-2" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3><FontAwesomeIcon icon={faHeart} style={{ color: "#22c55e" }} /> {faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALREADY INVOLVED CTA */}
      <section className="rlg-cta-section">
        <div className="rlg-container">
          <h2>Already Involved?</h2>
          <p>Share your RLG story and inspire others to join the movement!</p>
          <Link to="/contact">
            <button className="btn-outline-rlg">
              <FontAwesomeIcon icon={faHeart} /> Send us a Testimonial
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}