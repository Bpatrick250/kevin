import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faEnvelope, faArrowRight, faCalendarAlt,
  faUser, faTag, faEye, faHeart, faShare, faComment,
  faNewspaper, faSpinner, faClock, faBell, faRss,
  faBookOpen, faLightbulb, faUsers, faCalendarWeek,
  faChartLine, faLeaf, faTrophy, faCrown, faHandshake
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });

/* ─── Categories Data ─────────────────────────────────────────── */
const categories = [
  { name: "Events", icon: faCalendarWeek, color: "#22c55e" },
  { name: "Leadership Tips", icon: faLightbulb, color: "#16a34a" },
  { name: "Student Stories", icon: faUsers, color: "#15803d" },
  { name: "Partnerships", icon: faHandshake, color: "#14532d" },
  { name: "Announcements", icon: faBell, color: "#22c55e" },
  { name: "Programs", icon: faBookOpen, color: "#16a34a" }
];

/* ─── Sample Posts (will be replaced by backend data) ─────────── */
const samplePosts = [
  {
    id: 1,
    title: "Why Mental Transformation is the First Step to Leadership",
    excerpt: "Understanding leadership starts from within. RLG believes that before a young person can lead others, they must first transform their own mind.",
    date: "May 15, 2025",
    category: "Leadership Tips",
    author: "Joshua Chris. K",
    readTime: "5 min read",
    views: 234,
    image: null
  },
  {
    id: 2,
    title: "Recap: Light the Flame Debate Competition 2025",
    excerpt: "Students from 5 schools gathered for an intense day of public speaking and debate. The motion: 'Social media creates more harm than good for young leaders.'",
    date: "April 28, 2025",
    category: "Events",
    author: "RLG Team",
    readTime: "4 min read",
    views: 456,
    image: null
  },
  {
    id: 3,
    title: "Meet Our New President – One Year of Service",
    excerpt: "Every year, RLG selects a new President from and by the Board and Corporate Members. This year's President is a passionate advocate for youth governance.",
    date: "April 10, 2025",
    category: "Announcements",
    author: "Board of Directors",
    readTime: "3 min read",
    views: 189,
    image: null
  },
  {
    id: 4,
    title: "RLG Green Life – Planting Trees, Growing Leaders",
    excerpt: "At local schools, RLG Green Life planted trees. But more importantly, students learned project management, teamwork, and environmental responsibility.",
    date: "March 22, 2025",
    category: "Programs",
    author: "RLG Green Life Team",
    readTime: "4 min read",
    views: 312,
    image: null
  },
  {
    id: 5,
    title: "5 Lessons from the My Role Governance Forum",
    excerpt: "Young people gathered to discuss integrity, responsibility, and what leadership means in Rwanda today.",
    date: "March 5, 2025",
    category: "Leadership Tips",
    author: "Forum Attendee",
    readTime: "6 min read",
    views: 278,
    image: null
  }
];

/* ─── Component ───────────────────────────────────────────────── */
export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter posts based on search and category
  const filteredPosts = samplePosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      showInfo("Email Required", "Please enter your email address to subscribe.");
      return;
    }
    showSuccess("Subscribed! 🎉", `Thank you for subscribing with ${email}. You'll receive updates about new blog posts!`);
    setEmail("");
  };

  const handleReadPost = (postTitle) => {
    showInfo("Coming Soon", `"${postTitle}" will be available once the admin publishes it from the backend. Stay tuned!`);
  };

  const handleSearch = () => {
    if (searchTerm) {
      showInfo("Search Results", `Showing posts matching "${searchTerm}"`);
    }
  };

  return (
    <div className="rlg-blog-page pt-16">
      <style>{`
        .rlg-blog-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
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

        /* Coming Soon Banner */
        .rlg-coming-soon {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border-left: 4px solid #f59e0b;
          padding: 1rem 1.5rem;
          margin: 2rem auto;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .rlg-coming-soon p { margin: 0; color: #92400e; font-weight: 500; }
        .rlg-coming-soon small { color: #b45309; font-size: .8rem; }

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

        /* Search & Filter Bar */
        .rlg-search-bar {
          background: #fff;
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          margin-bottom: 2rem;
          border: 1px solid #e5e7eb;
        }
        .rlg-search-input {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .rlg-search-input input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition);
        }
        .rlg-search-input input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }
        .rlg-search-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 999px;
          cursor: pointer;
          transition: var(--transition);
        }
        .rlg-search-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(34,197,94,0.3); }
        .rlg-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .rlg-cat-btn {
          background: var(--green-50);
          border: 1px solid #e5e7eb;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          color: #14532d;
        }
        .rlg-cat-btn:hover, .rlg-cat-btn.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          border-color: transparent;
        }

        /* Blog Grid */
        .rlg-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin: 2rem 0;
        }
        @media (max-width: 1024px) { .rlg-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .rlg-blog-grid { grid-template-columns: 1fr; } }
        .rlg-blog-card {
          background: #fff;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid #e5e7eb;
          cursor: pointer;
        }
        .rlg-blog-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: #22c55e; }
        .rlg-blog-content { padding: 1.5rem; }
        .rlg-blog-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.75rem;
          color: #6b7280;
        }
        .rlg-blog-meta span { display: flex; align-items: center; gap: 0.3rem; }
        .rlg-blog-category {
          display: inline-block;
          background: var(--green-100);
          color: #14532d;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .rlg-blog-card h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #14532d;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .rlg-blog-card p {
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .rlg-read-more {
          color: #22c55e;
          font-weight: 600;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: var(--transition);
        }
        .rlg-read-more:hover { gap: 0.6rem; color: #16a34a; }

        /* Sidebar */
        .rlg-blog-sidebar {
          margin-top: 3rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        @media (max-width: 900px) { .rlg-blog-sidebar { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rlg-blog-sidebar { grid-template-columns: 1fr; } }
        .rlg-sidebar-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          box-shadow: var(--shadow-sm);
        }
        .rlg-sidebar-card h3 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #14532d;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #22c55e;
          display: inline-block;
        }
        .rlg-category-list { list-style: none; padding: 0; margin: 0; }
        .rlg-category-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .rlg-category-list li a {
          color: #6b7280;
          text-decoration: none;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .rlg-category-list li a:hover { color: #22c55e; transform: translateX(5px); }
        .rlg-newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .rlg-newsletter-form input {
          padding: 0.8rem;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          outline: none;
        }
        .rlg-newsletter-form input:focus { border-color: #22c55e; }

        /* Empty State */
        .rlg-empty-state {
          text-align: center;
          padding: 4rem;
          background: var(--green-50);
          border-radius: var(--radius);
          margin: 2rem 0;
        }
        .rlg-empty-state svg { font-size: 4rem; color: #9ca3af; margin-bottom: 1rem; }
        .rlg-empty-state h3 { color: #14532d; margin-bottom: 0.5rem; }
        .rlg-empty-state p { color: #6b7280; }

        /* CTA Section */
        .rlg-cta-section { background: linear-gradient(135deg, #0a2a1a, #14532d); padding: 4rem 0; text-align: center; margin-top: 3rem; }
        .rlg-cta-section h2 { color: #fff; font-size: 1.8rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; }
        .rlg-cta-section p { color: rgba(255,255,255,.8); max-width: 600px; margin: 0 auto; }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-hero-content">
          <div className="rlg-container">
            <div className="fade-up">
              <h1>RLG Blog</h1>
              <p>Stories & Insights from the Next Generation of Leaders</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <div className="rlg-container">
        <div className="rlg-coming-soon fade-up">
          <p>
            <FontAwesomeIcon icon={faSpinner} style={{ marginRight: ".5rem", animation: "pulse 2s infinite" }} />
            <strong>Admin Preview Mode:</strong> Blog posts will appear here once published from the backend. This is a preview of upcoming content.
          </p>
          <small>📝 Waiting for admin approval</small>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="rlg-container">
        <div className="fade-up-1">
          <div className="rlg-label"><FontAwesomeIcon icon={faNewspaper} /> Latest Posts</div>
          <h2 className="rlg-section-title">Recent Articles</h2>
        </div>

        {/* Search & Filter Bar */}
        <div className="rlg-search-bar fade-up-2">
          <div className="rlg-search-input">
            <input 
              type="text" 
              placeholder="Search blog posts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="rlg-search-btn" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </div>
          <div className="rlg-categories">
            <button 
              className={`rlg-cat-btn ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All Posts
            </button>
            {categories.map((cat, i) => (
              <button 
                key={i} 
                className={`rlg-cat-btn ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <FontAwesomeIcon icon={cat.icon} style={{ marginRight: ".3rem" }} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="rlg-blog-grid">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="rlg-blog-card fade-up-3"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleReadPost(post.title)}
              >
                <div className="rlg-blog-content">
                  <div className="rlg-blog-meta">
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> {post.date}</span>
                    <span><FontAwesomeIcon icon={faClock} /> {post.readTime}</span>
                    <span><FontAwesomeIcon icon={faEye} /> {post.views} views</span>
                  </div>
                  <span className="rlg-blog-category">
                    <FontAwesomeIcon icon={faTag} style={{ marginRight: ".3rem" }} />
                    {post.category}
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="rlg-read-more">
                    Read full post → <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rlg-empty-state">
            <FontAwesomeIcon icon={faSearch} />
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              className="rlg-search-btn" 
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              style={{ marginTop: "1rem" }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Sidebar Sections */}
        <div className="rlg-blog-sidebar">
          {/* Categories Widget */}
          <div className="rlg-sidebar-card fade-up-1">
            <h3><FontAwesomeIcon icon={faTag} /> Browse by Category</h3>
            <ul className="rlg-category-list">
              {categories.map((cat, i) => (
                <li key={i}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory(cat.name); }}>
                    <FontAwesomeIcon icon={cat.icon} /> {cat.name}
                  </a>
                  <span style={{ color: "#9ca3af", fontSize: ".75rem" }}>coming soon</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Widget */}
          <div className="rlg-sidebar-card fade-up-2">
            <h3><FontAwesomeIcon icon={faEnvelope} /> Subscribe</h3>
            <p style={{ color: "#6b7280", fontSize: ".85rem", marginBottom: "1rem" }}>
              Get new blog posts and RLG updates straight to your inbox.
            </p>
            <form className="rlg-newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="rlg-search-btn">
                <FontAwesomeIcon icon={faArrowRight} /> Subscribe
              </button>
            </form>
          </div>

          {/* RSS Feed Widget */}
          <div className="rlg-sidebar-card fade-up-3">
            <h3><FontAwesomeIcon icon={faRss} /> Stay Updated</h3>
            <p style={{ color: "#6b7280", fontSize: ".85rem", marginBottom: "1rem" }}>
              Follow RLG for the latest news and leadership insights.
            </p>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <button className="rlg-cat-btn" onClick={() => showInfo("Coming Soon", "RSS feed will be available soon!")}>
                <FontAwesomeIcon icon={faRss} /> RSS Feed
              </button>
              <button className="rlg-cat-btn" onClick={() => showInfo("Coming Soon", "Email notifications will be available soon!")}>
                <FontAwesomeIcon icon={faBell} /> Notifications
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <section className="rlg-cta-section">
        <div className="rlg-container">
          <h2>Want to Contribute to Our Blog?</h2>
          <p>Are you a young leader with a story to share? We'd love to hear from you!</p>
          <Link to="/contact">
            <button className="rlg-search-btn" style={{ marginTop: "1rem" }}>
              <FontAwesomeIcon icon={faEnvelope} /> Contact Our Editorial Team
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}