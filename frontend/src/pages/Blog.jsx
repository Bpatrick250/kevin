import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faEnvelope, faArrowRight, faCalendarAlt,
  faUser, faTag, faEye, faHeart, faClock,
  faNewspaper, faSpinner, faBell, faRss,
  faBookOpen, faLightbulb, faUsers, faCalendarWeek,
  faHandshake, faQuoteLeft, faBlog
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";
import api from "../services/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const categories = [
    { name: "All", icon: faBookOpen },
    { name: "Leadership Tips", icon: faLightbulb },
    { name: "Events", icon: faCalendarWeek },
    { name: "Student Stories", icon: faUsers },
    { name: "Partnerships", icon: faHandshake },
    { name: "Announcements", icon: faBell },
    { name: "Programs", icon: faBookOpen }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.getBlogs();
      // Filter only published posts
      const publishedPosts = (response.data?.blogs || []).filter(post => post.status === 'published');
      setPosts(publishedPosts);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load blog posts. Please refresh the page.',
        confirmButtonColor: '#22c55e'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address.',
        confirmButtonColor: '#22c55e'
      });
      return;
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Subscribed! 🎉',
      text: `Thank you for subscribing with ${email}. You'll receive updates about new blog posts!`,
      confirmButtonColor: '#22c55e',
      timer: 3000
    });
    setEmail("");
  };

  const handleReadPost = (post) => {
    window.location.href = `/blog/${post.slug}`;
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Empty State Component
  const EmptyBlogState = () => (
    <div className="rlg-empty-blog">
      <FontAwesomeIcon icon={faBlog} size="4x" style={{ color: "#9ca3af", marginBottom: "1rem" }} />
      <h3 style={{ color: "#14532d", marginBottom: "0.5rem" }}>No Blog Posts Yet</h3>
      <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Blog posts will appear here once published by the admin.</p>
      <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Check back soon for leadership insights and success stories!</p>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="rlg-blog-page pt-16">
      <style>{`
        .rlg-blog-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
        .loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; gap: 20px; color: #22c55e; }
        .rlg-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }
        .rlg-hero { position: relative; min-height: 40vh; display: flex; align-items: center; background: linear-gradient(135deg, #0a2a1a 0%, #14532d 100%); overflow: hidden; }
        .rlg-hero::before { content:''; position:absolute; inset:0; background: url(${heroBg}) center/cover no-repeat; opacity:.12; }
        .rlg-hero-content { position: relative; z-index: 2; padding: 4rem 0; text-align: center; }
        .rlg-hero h1 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2.5rem,5vw,4rem); font-weight:800; color:#fff; margin-bottom:1rem; }
        .rlg-hero p { color:rgba(255,255,255,.85); font-size:1.1rem; max-width:700px; margin:0 auto; line-height:1.7; }
        .rlg-label { display:inline-flex;align-items:center;gap:.5rem; background:linear-gradient(135deg, #dcfce7, #f0fdf4); color:#14532d; padding:.5rem 1.25rem; border-radius:999px; font-size:.8rem; font-weight:700; margin-bottom:1rem; }
        .rlg-section-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800; color:#111; margin-bottom:.75rem; }
        .rlg-search-bar { background: #fff; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .rlg-search-input { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .rlg-search-input input { flex: 1; padding: 0.8rem 1rem; border: 1px solid #e5e7eb; border-radius: 999px; outline: none; }
        .rlg-search-btn { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border: none; padding: 0.8rem 1.5rem; border-radius: 999px; cursor: pointer; transition: all 0.3s ease; }
        .rlg-search-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(34,197,94,0.3); }
        .rlg-categories { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
        .rlg-cat-btn { background: #f0fdf4; border: 1px solid #e5e7eb; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .rlg-cat-btn:hover, .rlg-cat-btn.active { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border-color: transparent; }
        .rlg-blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 2rem 0; }
        @media (max-width: 1024px) { .rlg-blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .rlg-blog-grid { grid-template-columns: 1fr; } }
        .rlg-blog-card { background: #fff; border-radius: 1rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer; }
        .rlg-blog-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
        .rlg-blog-content { padding: 1.5rem; }
        .rlg-blog-meta { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; font-size: 0.75rem; color: #6b7280; }
        .rlg-blog-category { display: inline-block; background: #dcfce7; color: #14532d; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
        .rlg-blog-card h3 { font-size: 1.2rem; font-weight: 800; color: #14532d; margin-bottom: 0.75rem; line-height: 1.4; }
        .rlg-blog-card p { color: #6b7280; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .rlg-read-more { color: #22c55e; font-weight: 600; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.3rem; transition: all 0.3s ease; }
        .rlg-read-more:hover { gap: 0.6rem; }
        .rlg-sidebar-card { background: #fff; border-radius: 1rem; padding: 1.5rem; border: 1px solid #e5e7eb; margin-bottom: 1.5rem; }
        .rlg-sidebar-card h3 { font-size: 1.1rem; font-weight: 800; color: #14532d; margin-bottom: 1rem; border-bottom: 2px solid #22c55e; display: inline-block; }
        .rlg-empty-blog { text-align: center; padding: 4rem 2rem; background: #f0fdf4; border-radius: 1rem; margin: 2rem 0; }
        @media (max-width: 768px) { .rlg-blog-sidebar { margin-top: 2rem; } }
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-hero-content">
          <div className="rlg-container">
            <h1>RLG Blog</h1>
            <p>Stories & Insights from the Next Generation of Leaders</p>
          </div>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <div className="rlg-container">
        <div className="rlg-coming-soon" style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)", borderLeft: "4px solid #f59e0b", padding: "1rem 1.5rem", margin: "2rem auto", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ margin: 0, color: "#92400e", fontWeight: 500 }}>
            <FontAwesomeIcon icon={faSpinner} style={{ marginRight: ".5rem", animation: "pulse 2s infinite" }} />
            <strong>Admin Preview Mode:</strong> Blog posts will appear here once published from the backend.
          </p>
          <small style={{ color: "#b45309", fontSize: ".8rem" }}>📝 Waiting for admin approval</small>
        </div>
      </div>

      <div className="rlg-container">
        <div className="rlg-search-bar">
          <div className="rlg-search-input">
            <input 
              type="text" 
              placeholder="Search blog posts..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="rlg-search-btn"><FontAwesomeIcon icon={faSearch} /> Search</button>
          </div>
          <div className="rlg-categories">
            {categories.map((cat) => (
              <button 
                key={cat.name} 
                className={`rlg-cat-btn ${selectedCategory === cat.name ? 'active' : ''}`} 
                onClick={() => setSelectedCategory(cat.name)}
              >
                <FontAwesomeIcon icon={cat.icon} /> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid or Empty State */}
        {filteredPosts.length > 0 ? (
          <div className="rlg-blog-grid">
            {filteredPosts.map((post) => (
              <div key={post._id} className="rlg-blog-card" onClick={() => handleReadPost(post)}>
                <div className="rlg-blog-content">
                  <div className="rlg-blog-meta">
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                    <span><FontAwesomeIcon icon={faClock} /> {post.readTime || 5} min read</span>
                    <span><FontAwesomeIcon icon={faEye} /> {post.views || 0} views</span>
                  </div>
                  <span className="rlg-blog-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="rlg-read-more">Read full post →</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyBlogState />
        )}

        <div className="rlg-blog-sidebar">
          <div className="rlg-sidebar-card">
            <h3><FontAwesomeIcon icon={faEnvelope} /> Subscribe</h3>
            <p>Get new blog posts and RLG updates straight to your inbox.</p>
            <form onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} 
                required
              />
              <button type="submit" className="rlg-search-btn" style={{ width: '100%' }}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;