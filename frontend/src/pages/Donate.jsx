import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart, faHandHoldingHeart, faSeedling, faUsers, faTree,
  faBookOpen, faLaptop, faBuilding, faCalendarAlt, faTrophy,
  faCheckCircle, faArrowRight, faSpinner, faQuoteLeft,
  faChartLine, faFlag, faGlobe, faStar, faShieldAlt,
  faMobileAlt, faUniversity, faCreditCard, faGift
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showError = (title, text) =>
  Swal.fire({ icon: "error", title, text, confirmButtonColor: "#166534" });
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });

/* ─── API Service ─────────────────────────────────────────────── */
const API_URL = 'http://localhost:5000/api';

const api = {
  submitDonation: async (data) => {
    const response = await fetch(`${API_URL}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to process donation');
    return result;
  }
};

/* ─── Component ───────────────────────────────────────────────── */
export default function Donate() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    customAmount: "",
    paymentMethod: "",
    mobileMoneyNumber: "",
    isMonthly: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, amount: amount, customAmount: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const donationAmount = formData.amount === "custom" ? formData.customAmount : formData.amount;
    const amountNumeric = parseFloat(donationAmount?.replace('$', '')) || 0;
    
    if (!formData.fullName || !formData.email) {
      showError("Missing Information", "Please fill in your name and email address.");
      return;
    }
    
    if (!donationAmount) {
      showError("Missing Information", "Please select or enter a donation amount.");
      return;
    }
    
    if (!formData.paymentMethod) {
      showError("Missing Information", "Please select a payment method.");
      return;
    }
    
    if (formData.paymentMethod === "mobile" && !formData.mobileMoneyNumber) {
      showError("Missing Information", "Please enter your mobile money number.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await api.submitDonation({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        amount: amountNumeric,
        currency: donationAmount.includes('RWF') ? 'RWF' : 'USD',
        paymentMethod: formData.paymentMethod,
        mobileMoneyNumber: formData.mobileMoneyNumber,
        isMonthly: formData.isMonthly
      });
      
      showSuccess(
        "Thank You for Your Donation! 🎉",
        `Thank you ${formData.fullName}! Your ${formData.isMonthly ? "monthly " : ""}donation will help empower young leaders across Rwanda.`
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        amount: "",
        customAmount: "",
        paymentMethod: "",
        mobileMoneyNumber: "",
        isMonthly: false
      });
    } catch (error) {
      showError("Error", error.message || "Failed to process donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const donationTiers = [
    { usd: 10, rwf: 5000, label: "Training materials for 1 student", icon: faBookOpen },
    { usd: 25, rwf: 12500, label: "Sponsors 1 student to attend a leadership forum", icon: faUsers },
    { usd: 50, rwf: 25000, label: "Supports a full debate competition (Light the Flame)", icon: faTrophy },
    { usd: 100, rwf: 50000, label: "Helps start a new RLG Club in one school", icon: faFlag },
    { usd: 500, rwf: 250000, label: "Funds one school's entire bootcamp (50 students)", icon: faSeedling }
  ];

  const paymentMethods = [
    { value: "mobile", label: "Mobile Money (MTN/Airtel)", icon: faMobileAlt },
    { value: "bank", label: "Bank Transfer", icon: faUniversity },
    { value: "card", label: "Credit Card", icon: faCreditCard }
  ];

  const testimonials = [
    {
      quote: "RLG changed how I see leadership. I now lead my school's student council with confidence.",
      author: "Student, RLG Alumni"
    },
    {
      quote: "We partner with RLG because they produce real results. Their students are prepared, disciplined, and ready to lead.",
      author: "Partner Organization Representative"
    }
  ];

  return (
    <div className="rlg-donate-page pt-16">
      <style>{`
        .rlg-donate-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
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
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        
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

        /* Funding Table */
        .rlg-funding { padding: 5rem 0; background: #fff; }
        .rlg-table-container { overflow-x: auto; margin-top: 2rem; }
        .rlg-funding-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .rlg-funding-table th, .rlg-funding-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .rlg-funding-table th {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          font-weight: 600;
        }
        .rlg-funding-table tr:hover { background: var(--green-50); }
        .rlg-funding-table td:first-child, .rlg-funding-table th:first-child { font-weight: 700; color: #14532d; }

        /* Donation Tiers */
        .rlg-tiers { padding: 3rem 0; background: var(--green-50); }
        .rlg-tiers-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        @media (max-width: 1024px) { .rlg-tiers-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .rlg-tiers-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .rlg-tiers-grid { grid-template-columns: 1fr; } }
        .rlg-tier-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: var(--transition);
          border: 2px solid transparent;
        }
        .rlg-tier-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .rlg-tier-card.selected { border-color: #22c55e; background: var(--green-50); }
        .rlg-tier-amount { font-size: 1.5rem; font-weight: 800; color: #14532d; }
        .rlg-tier-rwf { font-size: 0.8rem; color: #6b7280; }
        .rlg-tier-icon { font-size: 2rem; margin: 0.5rem 0; }
        .rlg-tier-label { font-size: 0.75rem; color: #6b7280; }

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
        .rlg-form-group input, .rlg-form-group select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition);
          background: #fff;
        }
        .rlg-form-group input:focus, .rlg-form-group select:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }
        .rlg-radio-group, .rlg-checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .rlg-radio-group label, .rlg-checkbox-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: normal;
          cursor: pointer;
        }
        .rlg-radio-group input, .rlg-checkbox-group input { width: auto; }
        .rlg-submit-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; padding: 1rem; border-radius: 999px;
          font-weight: 700; font-size: 1rem; border: none; cursor: pointer;
          transition: var(--transition); width: 100%;
        }
        .rlg-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }

        /* Other Ways Section */
        .rlg-other-ways { padding: 5rem 0; background: var(--green-50); }
        .rlg-ways-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) { .rlg-ways-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rlg-ways-grid { grid-template-columns: 1fr; } }
        .rlg-way-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
          transition: var(--transition);
          border: 1px solid #e5e7eb;
        }
        .rlg-way-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #22c55e; }
        .rlg-way-icon {
          width: 4rem; height: 4rem; background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
        .rlg-way-icon svg { color: #fff; font-size: 1.5rem; }
        .rlg-way-card h3 { font-size: 1.2rem; font-weight: 800; color: #14532d; margin-bottom: 0.5rem; }
        .rlg-way-card p { color: #6b7280; font-size: 0.85rem; line-height: 1.5; }

        /* Testimonials */
        .rlg-testimonials { padding: 5rem 0; background: #fff; }
        .rlg-testi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 768px) { .rlg-testi-grid { grid-template-columns: 1fr; } }
        .rlg-testi-card {
          background: var(--green-50);
          border-radius: var(--radius);
          padding: 2rem;
          position: relative;
        }
        .rlg-testi-quote { color: #22c55e; font-size: 2rem; opacity: 0.3; margin-bottom: 1rem; }
        .rlg-testi-card p { color: #4b5563; font-style: italic; margin-bottom: 1rem; line-height: 1.6; }
        .rlg-testi-card h4 { color: #14532d; font-weight: 700; }

        /* 7-Year Goal */
        .rlg-goal { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 5rem 0; text-align: center; color: #fff; }
        .rlg-goal h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); margin-bottom: 1rem; }
        .rlg-goal p { max-width: 700px; margin: 0 auto 2rem; color: rgba(255,255,255,.8); }
        .rlg-goal-stats { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
        .rlg-goal-stat { text-align: center; }
        .rlg-goal-stat .number { font-size: 2.5rem; font-weight: 800; font-family: 'Playfair Display', serif; display: block; background: linear-gradient(135deg, #4ade80, #22c55e); -webkit-background-clip: text; background-clip: text; color: transparent; }

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
              <h1>Support the Next Generation of Leaders</h1>
              <p>Your donation helps us train more students, organize debates, plant trees through RLG Green Life, and host leadership summits across Rwanda.</p>
              <p style={{ fontSize: "1rem", marginTop: "1rem" }}><strong>Every gift creates a future leader.</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING NEEDS TABLE */}
      <section className="rlg-funding">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faHeart} /> Our Funding Needs</div>
            <h2 className="rlg-section-title">Where Your Money Goes</h2>
          </div>
          <div className="rlg-table-container">
            <table className="rlg-funding-table">
              <thead>
                <tr><th>Amount (USD)</th><th>Amount (RWF)</th><th>What it supports</th></tr>
              </thead>
              <tbody>
                {donationTiers.map((tier, index) => (
                  <tr key={index}>
                    <td>${tier.usd}</td>
                    <td>{tier.rwf.toLocaleString()} RWF</td>
                    <td>{tier.label}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">Custom</td>
                  <td>Any amount helps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DONATION TIERS QUICK SELECT */}
      <section className="rlg-tiers">
        <div className="rlg-container">
          <div className="fade-up-2">
            <div className="rlg-label"><FontAwesomeIcon icon={faStar} /> Quick Select</div>
            <h2 className="rlg-section-title">Choose a Donation Amount</h2>
          </div>
          <div className="rlg-tiers-grid">
            {donationTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`rlg-tier-card fade-up-3 ${formData.amount === `$${tier.usd}` ? "selected" : ""}`}
                onClick={() => handleAmountSelect(`$${tier.usd}`)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="rlg-tier-amount">${tier.usd}</div>
                <div className="rlg-tier-rwf">{tier.rwf.toLocaleString()} RWF</div>
                <div className="rlg-tier-icon"><FontAwesomeIcon icon={tier.icon} /></div>
                <div className="rlg-tier-label">{tier.label.split(" ").slice(0, 4).join(" ")}...</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION FORM */}
      <section className="rlg-form-section">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faHandHoldingHeart} /> Donate Now</div>
            <h2 className="rlg-section-title">Make a Difference Today</h2>
          </div>
          
          <div className="rlg-form-card fade-up-2">
            <form onSubmit={handleSubmit}>
              <div className="rlg-form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
              </div>
              
              <div className="rlg-form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              
              <div className="rlg-form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+250..." />
              </div>
              
              <div className="rlg-form-group">
                <label>Donation Amount *</label>
                <div className="rlg-radio-group">
                  {donationTiers.map((tier, index) => (
                    <label key={index}>
                      <input type="radio" name="amount" value={`$${tier.usd}`} checked={formData.amount === `$${tier.usd}`} onChange={handleChange} />
                      ${tier.usd} ({tier.rwf.toLocaleString()} RWF)
                    </label>
                  ))}
                  <label>
                    <input type="radio" name="amount" value="custom" checked={formData.amount === "custom"} onChange={handleChange} />
                    Custom amount
                  </label>
                </div>
                {formData.amount === "custom" && (
                  <input type="text" name="customAmount" value={formData.customAmount} onChange={handleChange} placeholder="Enter amount (USD or RWF)" style={{ marginTop: "0.5rem" }} />
                )}
              </div>
              
              <div className="rlg-form-group">
                <label>Payment Method *</label>
                <div className="rlg-radio-group">
                  {paymentMethods.map((method) => (
                    <label key={method.value}>
                      <input type="radio" name="paymentMethod" value={method.value} checked={formData.paymentMethod === method.value} onChange={handleChange} />
                      <FontAwesomeIcon icon={method.icon} /> {method.label}
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.paymentMethod === "mobile" && (
                <div className="rlg-form-group">
                  <label>Mobile Money Number *</label>
                  <input type="tel" name="mobileMoneyNumber" value={formData.mobileMoneyNumber} onChange={handleChange} placeholder="+250XXXXXXXXX" />
                </div>
              )}
              
              <div className="rlg-checkbox-group">
                <label>
                  <input type="checkbox" name="isMonthly" checked={formData.isMonthly} onChange={handleChange} />
                  Make this a monthly donation
                </label>
              </div>
              
              <button type="submit" className="rlg-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} spin /> Processing...</> : <><FontAwesomeIcon icon={faHeart} /> Donate Now</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* OTHER WAYS TO GIVE */}
      <section className="rlg-other-ways">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faGift} /> Other Ways to Give</div>
            <h2 className="rlg-section-title">Alternative Donation Methods</h2>
          </div>
          <div className="rlg-ways-grid">
            <div className="rlg-way-card fade-up-2">
              <div className="rlg-way-icon"><FontAwesomeIcon icon={faMobileAlt} /></div>
              <h3>Mobile Money (Direct)</h3>
              <p>Send to: <strong>+250784769382</strong> (MTN or Airtel)</p>
              <p>Reference: <strong>RLG DONATION</strong></p>
            </div>
            <div className="rlg-way-card fade-up-2">
              <div className="rlg-way-icon"><FontAwesomeIcon icon={faUniversity} /></div>
              <h3>Bank Transfer</h3>
              <p>Contact us for bank details:</p>
              <p><a href="mailto:raisingleaderofgeneration@gmail.com" style={{ color: "#22c55e" }}>raisingleaderofgeneration@gmail.com</a></p>
            </div>
            <div className="rlg-way-card fade-up-3">
              <div className="rlg-way-icon"><FontAwesomeIcon icon={faLaptop} /></div>
              <h3>In-Kind Donations</h3>
              <p>Books, laptops, venue space, or meals for bootcamp participants</p>
              <p>Email us to arrange pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="rlg-testimonials">
        <div className="rlg-container">
          <div className="fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faQuoteLeft} /> Why Donate to RLG?</div>
            <h2 className="rlg-section-title">Real Impact, Real Stories</h2>
          </div>
          <div className="rlg-testi-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rlg-testi-card fade-up-2" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="rlg-testi-quote"><FontAwesomeIcon icon={faQuoteLeft} /></div>
                <p>"{testimonial.quote}"</p>
                <h4>— {testimonial.author}</h4>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              <FontAwesomeIcon icon={faShieldAlt} /> We provide receipts for all donations and publish annual impact reports. Ask us for our financial summary.
            </p>
          </div>
        </div>
      </section>

      {/* 7-YEAR GOAL */}
      <section className="rlg-goal">
        <div className="rlg-container">
          <h2>Our 7-Year Goal</h2>
          <p>Your donation today helps RLG achieve by 2030: Expansion to more schools across Rwanda, an annual national youth leadership summit, and a network of young leaders in governance, business, and social change.</p>
          <div className="rlg-goal-stats">
            <div className="rlg-goal-stat"><span className="number">30+</span> <span>Schools</span></div>
            <div className="rlg-goal-stat"><span className="number">10k+</span> <span>Youth Impacted</span></div>
            <div className="rlg-goal-stat"><span className="number">1</span> <span>Annual Summit</span></div>
          </div>
          <Link to="/">
            <button className="btn-outline-rlg" style={{ marginTop: "2rem" }}>
              <FontAwesomeIcon icon={faArrowRight} /> Back to Home
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}