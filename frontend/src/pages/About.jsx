import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBullhorn, faHeart, faFlag, faHandshake, faBuilding, faUsers, faQuoteLeft, faCheckCircle, faTrophy, faBookOpen, faGraduationCap, faGlobe, faCalendarAlt, faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";
import api from "../services/api";

const About = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalBlogs: 0, totalDonations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getDashboardStats();
      setStats(response.data || { totalUsers: 0, totalBlogs: 0, totalDonations: 0 });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><FontAwesomeIcon icon={faSpinner} spin size="3x" color="#22c55e" /></div>;
  }

  return (
    <div className="rlg-about-page pt-16">
      <style>{`
        .rlg-about-page { font-family: 'Lato', 'Segoe UI', sans-serif; }
        .rlg-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }
        .hero { position: relative; min-height: 40vh; display: flex; align-items: center; background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%); overflow: hidden; }
        .hero::before { content:''; position:absolute; inset:0; background: url(${heroBg}) center/cover no-repeat; opacity:.12; }
        .hero-content { position: relative; z-index: 2; padding: 4rem 0; text-align: center; }
        .hero h1 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2.5rem,5vw,4rem); font-weight:800; color:#fff; margin-bottom:1rem; }
        .section-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800; color:#111; margin-bottom:.75rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 3rem 0; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } }
        .stat-card { background: #f0fdf4; border-radius: 1rem; padding: 2rem; text-align: center; }
        .mission-card { background: #fff; border-radius: 1rem; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-top: 4px solid #22c55e; }
        .values-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; margin-top: 2rem; }
        @media (max-width: 1024px) { .values-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .values-grid { grid-template-columns: 1fr; } }
        .value-card { background: #fff; border-radius: 1rem; padding: 1.5rem; text-align: center; border: 1px solid #e5e7eb; transition: all 0.3s ease; }
        .value-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      `}</style>

      <section className="hero"><div className="hero-content"><div className="rlg-container"><h1>About RLG</h1><p>Raising Leaders of Generation (RLG) is a youth-centered advocacy dedicated to nurture and empower the leading spirit in young people through social impact.</p></div></div></section>

      <div className="rlg-container" style={{ padding: "4rem 0" }}>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-number">{stats.totalUsers}+</div><p>Youth Impacted</p></div>
          <div className="stat-card"><div className="stat-number">{stats.totalBlogs}+</div><p>Success Stories</p></div>
          <div className="stat-card"><div className="stat-number">${stats.totalDonations?.toLocaleString() || 0}</div><p>Donations Raised</p></div>
        </div>

        <div className="mission-card"><FontAwesomeIcon icon={faEye} size="3x" style={{ color: "#22c55e", marginBottom: "1rem" }} /><h3>Our Mission</h3><p>Empowering leading spirit in young generation.</p></div>

        <div style={{ marginTop: "4rem" }}><h2 className="section-title" style={{ textAlign: "center" }}>Our Core Values</h2><div className="values-grid">{["Discipline", "Commitment", "Loyalty", "Passion", "Sociable", "Team Work", "Excellence", "Respect", "Dignity", "Empathy"].map((value, i) => (<div key={i} className="value-card"><h3>{value}</h3></div>))}</div></div>
      </div>
    </div>
  );
};

export default About;