import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane, 
  faClock, faQuestionCircle, faHandshake, faHeart, 
  faStar, faUserGraduate, faGlobe, faShieldHeart,
  faSpinner, faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showError = (title, text) =>
  Swal.fire({ icon: "error", title, text, confirmButtonColor: "#166534" });

/* ─── Component ───────────────────────────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showError("Missing Information", "Please fill in your name, email, subject, and message.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showSuccess(
        "Message Sent! 🎉",
        `Thank you ${formData.name}! We've received your message and will respond within 2-3 business days.`
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: faPhone,
      title: "Phone",
      details: ["+250784769382", "+250792588272"],
      color: "#22c55e"
    },
    {
      icon: faEnvelope,
      title: "Email",
      details: ["raisingleaderofgeneration@gmail.com", "kwikirizachrisjoshua435@gmail.com"],
      color: "#16a34a"
    },
    {
      icon: faMapMarkerAlt,
      title: "Location",
      details: ["Rwanda (Countrywide)"],
      subtext: "For specific office address, please call or email us.",
      color: "#15803d"
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: faFacebook, handle: "@RLG RWANDA", url: "https://facebook.com", color: "#1877f2" },
    { name: "Twitter", icon: faTwitter, handle: "@RLG RWANDA", url: "https://twitter.com", color: "#1da1f2" },
    { name: "Instagram", icon: faInstagram, handle: "@RLG RWANDA", url: "https://instagram.com", color: "#e4405f" }
  ];

  const subjects = [
    { value: "Programs inquiry", label: "Programs inquiry", icon: faUserGraduate },
    { value: "Partnership request", label: "Partnership request", icon: faHandshake },
    { value: "Volunteering", label: "Volunteering", icon: faHeart },
    { value: "Donation", label: "Donation", icon: faStar },
    { value: "General question", label: "General question", icon: faQuestionCircle }
  ];

  const faqs = [
    {
      q: "How can my school start an RLG Club?",
      a: "Email us or call, and we will send a Community Coordinator to meet your principal or headteacher."
    },
    {
      q: "Are your events free?",
      a: "Most events are free for students. Some conferences may require registration for materials. We never turn away a student for lack of funds."
    },
    {
      q: "Can I donate online?",
      a: "Yes. Visit our Donate page to give via mobile money or bank transfer."
    },
    {
      q: "How do I become a partner?",
      a: "Fill out the form on this page or the Get Involved page, and we will send you a partnership proposal."
    },
    {
      q: "Does RLG work outside Rwanda?",
      a: "Currently, RLG focuses on Rwanda. But we are open to conversations with organizations across Africa."
    }
  ];

  return (
    <div className="rlg-contact-page pt-16">
      <style>{`
        .rlg-contact-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
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
          position: relative; min-height: 40vh; display: flex; align-items: center;
          background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%);
          overflow: hidden;
        }
        .rlg-hero::before {
          content:''; position:absolute; inset:0;
          background: url(${heroBg}) center/cover no-repeat;
          opacity:.12;
        }
        .rlg-hero-content { position: relative; z-index: 2; padding: 4rem 0; text-align: center; }
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

        /* Contact Info Grid */
        .rlg-contact-info { padding: 5rem 0; background: #fff; }
        .rlg-contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) { .rlg-contact-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rlg-contact-grid { grid-template-columns: 1fr; } }
        .rlg-contact-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 2rem;
          text-align: center;
          border: 1px solid #e5e7eb;
          transition: var(--transition);
        }
        .rlg-contact-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #22c55e; }
        .rlg-contact-icon {
          width: 4rem; height: 4rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .rlg-contact-icon svg { color: #fff; font-size: 1.5rem; }
        .rlg-contact-card h3 { font-size: 1.2rem; font-weight: 800; color: #14532d; margin-bottom: 1rem; }
        .rlg-contact-card p { color: #6b7280; margin: 0.3rem 0; }
        .rlg-contact-card small { color: #9ca3af; font-size: 0.75rem; }

        /* Social Section */
        .rlg-social-section { background: var(--green-50); padding: 3rem 0; }
        .rlg-social-grid {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .rlg-social-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem 2rem;
          text-align: center;
          transition: var(--transition);
          border: 1px solid #e5e7eb;
          min-width: 180px;
          text-decoration: none;
          display: block;
        }
        .rlg-social-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .rlg-social-icon {
          width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 0.8rem;
        }
        .rlg-social-card h4 { font-weight: 700; color: #14532d; margin-bottom: 0.3rem; }
        .rlg-social-card p { color: #6b7280; font-size: 0.8rem; }

        /* Form Section */
        .rlg-form-section { padding: 5rem 0; background: #fff; }
        .rlg-form-card {
          background: var(--green-50);
          border-radius: var(--radius);
          padding: 2.5rem;
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
          background: #fff;
        }
        .rlg-form-group input:focus, .rlg-form-group select:focus, .rlg-form-group textarea:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }
        .rlg-subject-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 0.5rem;
        }
        .rlg-subject-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          cursor: pointer;
          transition: var(--transition);
        }
        .rlg-subject-option:hover { border-color: #22c55e; background: var(--green-50); }
        .rlg-subject-option.selected { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border-color: transparent; }
        .rlg-subject-option.selected svg { color: #fff; }
        .rlg-submit-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; padding: 1rem; border-radius: 999px;
          font-weight: 700; font-size: 1rem; border: none; cursor: pointer;
          transition: var(--transition); width: 100%;
        }
        .rlg-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }

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

        /* Promise Section */
        .rlg-promise { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 4rem 0; text-align: center; }
        .rlg-promise h2 { color: #fff; font-size: 1.8rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; }
        .rlg-promise p { color: rgba(255,255,255,.8); max-width: 600px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-hero-content">
          <div className="rlg-container">
            <div className="fade-up">
              <h1>Contact Us</h1>
              <p>We would love to hear from you. Whether you want to partner, volunteer, ask a question, or invite us to your school — reach out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="rlg-contact-info">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faPhone} /> Get in Touch</div>
            <h2 className="rlg-section-title">Contact Information</h2>
          </div>
          <div className="rlg-contact-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="rlg-contact-card fade-up-2" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="rlg-contact-icon">
                  <FontAwesomeIcon icon={info.icon} />
                </div>
                <h3>{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
                {info.subtext && <small>{info.subtext}</small>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="rlg-social-section">
        <div className="rlg-container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="rlg-label"><FontAwesomeIcon icon={faGlobe} /> Follow Us</div>
            <h2 className="rlg-section-title">Connect on Social Media</h2>
          </div>
          <div className="rlg-social-grid">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rlg-social-card"
                style={{ textDecoration: "none" }}
              >
                <div className="rlg-social-icon" style={{ background: social.color }}>
                  <FontAwesomeIcon icon={social.icon} style={{ color: "#fff", fontSize: "1.3rem" }} />
                </div>
                <h4>{social.name}</h4>
                <p>{social.handle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="rlg-form-section">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faPaperPlane} /> Send Us a Message</div>
            <h2 className="rlg-section-title">We'd Love to Hear From You</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Fill out the form below and we'll get back to you within 2-3 business days</p>
          </div>
          
          <div className="rlg-form-card fade-up-2">
            <form onSubmit={handleSubmit}>
              <div className="rlg-form-group">
                <label>Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              
              <div className="rlg-form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              
              <div className="rlg-form-group">
                <label>Phone (optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+250..." />
              </div>
              
              <div className="rlg-form-group">
                <label>Subject *</label>
                <div className="rlg-subject-group">
                  {subjects.map((subject) => (
                    <div
                      key={subject.value}
                      className={`rlg-subject-option ${formData.subject === subject.value ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, subject: subject.value })}
                    >
                      <FontAwesomeIcon icon={subject.icon} />
                      {subject.label}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rlg-form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="rlg-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin /> Sending...</> : <><FontAwesomeIcon icon={faPaperPlane} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="rlg-faq">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faQuestionCircle} /> FAQs</div>
            <h2 className="rlg-section-title">Frequently Asked Questions</h2>
            <p className="rlg-section-sub" style={{ margin: "0 auto" }}>Find quick answers to common questions</p>
          </div>
          <div className="rlg-faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="rlg-faq-card fade-up-2" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3><FontAwesomeIcon icon={faQuestionCircle} style={{ color: "#22c55e" }} /> {faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK RESPONSE PROMISE */}
      <section className="rlg-promise">
        <div className="rlg-container">
          <h2><FontAwesomeIcon icon={faShieldHeart} /> Quick Response Promise</h2>
          <p><FontAwesomeIcon icon={faClock} /> We reply to all messages within 2–3 business days.</p>
        </div>
      </section>
    </div>
  );
}