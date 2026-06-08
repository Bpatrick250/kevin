import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage, faVideo, faCalendarAlt, faCamera, faUsers,
  faMicrophone, faLeaf, faAward, faComments, faTrophy,
  faTree, faLightbulb, faPlayCircle, faPauseCircle,
  faChevronLeft, faChevronRight, faTimes, faSpinner,
  faShare, faDownload, faHeart, faEye, faTag, faClock,
  faMapMarkerAlt, faUser, faThumbsUp, faComment,
  faEnvelope, faEmptySet
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { heroBg } from "../assets";

/* ─── SweetAlert2 helpers ─────────────────────────────────────── */
const showInfo = (title, text) =>
  Swal.fire({ icon: "info", title, text, confirmButtonColor: "#166534" });
const showSuccess = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#166534", timer: 3500, timerProgressBar: true });
const showError = (title, text) =>
  Swal.fire({ icon: "error", title, text, confirmButtonColor: "#166534" });

/* ─── API Service ─────────────────────────────────────────────── */
const API_URL = 'http://localhost:5000/api';

const api = {
  getGallery: async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching gallery:", error);
      return [];
    }
  },
  getVideoGallery: async () => {
    try {
      const response = await fetch(`${API_URL}/gallery/videos`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  }
};

/* ─── Component ───────────────────────────────────────────────── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      const [galleryData, videoData] = await Promise.all([
        api.getGallery(),
        api.getVideoGallery()
      ]);
      
      setImages(galleryData);
      setVideos(videoData);
      
      // Extract unique categories from images
      const uniqueCategories = ["All", ...new Set(galleryData.map(img => img.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
      showError("Error", "Failed to load gallery. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  // Filter images based on selected category
  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const handleImageClick = (image) => {
    // In a real implementation, this would open a lightbox with the actual image
    showInfo(image.title, "Click to view full image");
  };

  const handleVideoClick = (video) => {
    showInfo(video.title, "Video will play once admin uploads the actual file.");
  };

  const handleSharePhoto = () => {
    showSuccess("Share Your Photo", "Thank you for sharing! Our team will review and add your photo to the gallery.");
  };

  // Empty state component when no images
  const EmptyGallery = () => (
    <div className="rlg-empty-gallery">
      <FontAwesomeIcon icon={faImage} size="4x" style={{ color: "#9ca3af", marginBottom: "1rem" }} />
      <h3 style={{ color: "#14532d", marginBottom: "0.5rem" }}>No Photos Yet</h3>
      <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Gallery images will appear here once uploaded by the admin.</p>
      <button className="btn-primary-rlg" onClick={handleSharePhoto}>
        <FontAwesomeIcon icon={faCamera} /> Share Your Photos
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="rlg-gallery-page pt-16">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#22c55e" />
        </div>
      </div>
    );
  }

  return (
    <div className="rlg-gallery-page pt-16">
      <style>{`
        .rlg-gallery-page { font-family: 'Lato', 'Segoe UI', sans-serif; color: #1a1a1a; }
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

        /* Category Filters */
        .rlg-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin: 2rem 0;
        }
        .rlg-cat-btn {
          background: var(--green-50);
          border: 1px solid #e5e7eb;
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          color: #14532d;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .rlg-cat-btn:hover, .rlg-cat-btn.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          border-color: transparent;
        }

        /* Gallery Grid */
        .rlg-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        @media (max-width: 1024px) { .rlg-gallery-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .rlg-gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .rlg-gallery-grid { grid-template-columns: 1fr; } }
        .rlg-gallery-item {
          background: #fff;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid #e5e7eb;
          cursor: pointer;
          position: relative;
        }
        .rlg-gallery-item:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: #22c55e; }
        .rlg-gallery-preview {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .rlg-gallery-preview svg { font-size: 3rem; color: #fff; opacity: 0.8; }
        .rlg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        .rlg-gallery-item:hover .rlg-overlay { opacity: 1; }
        .rlg-overlay svg { font-size: 2rem; color: #fff; }
        .rlg-gallery-info {
          padding: 1rem;
        }
        .rlg-gallery-info h3 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #14532d;
          margin-bottom: 0.3rem;
        }
        .rlg-gallery-meta {
          display: flex;
          gap: 0.8rem;
          font-size: 0.7rem;
          color: #6b7280;
        }
        .rlg-gallery-meta span { display: flex; align-items: center; gap: 0.2rem; }

        /* Empty Gallery State */
        .rlg-empty-gallery {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--green-50);
          border-radius: var(--radius);
          margin: 2rem 0;
        }

        /* Video Gallery */
        .rlg-video-section { margin: 3rem 0; }
        .rlg-video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 768px) { .rlg-video-grid { grid-template-columns: 1fr; } }
        .rlg-video-card {
          background: #fff;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid #e5e7eb;
          cursor: pointer;
        }
        .rlg-video-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: #22c55e; }
        .rlg-video-preview {
          background: linear-gradient(135deg, #14532d, #0a2a1a);
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .rlg-play-btn {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          transition: var(--transition);
        }
        .rlg-video-card:hover .rlg-play-btn { transform: scale(1.1); background: rgba(34,197,94,0.8); }
        .rlg-play-btn svg { font-size: 1.5rem; color: #fff; }
        .rlg-video-info { padding: 1rem; }
        .rlg-video-info h3 { font-size: 1rem; font-weight: 700; color: #14532d; margin-bottom: 0.3rem; }
        .rlg-video-info p { color: #6b7280; font-size: 0.8rem; }

        /* Share Section */
        .rlg-share-section {
          background: var(--green-50);
          padding: 2rem;
          border-radius: var(--radius);
          text-align: center;
          margin: 3rem 0;
        }
        .rlg-share-section h3 { font-size: 1.3rem; font-weight: 800; color: #14532d; margin-bottom: 0.5rem; }
        .rlg-share-section p { color: #6b7280; margin-bottom: 1rem; }

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
          background: transparent; color: #14532d; padding: .8rem 1.8rem;
          border-radius: 999px; font-weight: 700; border: 2px solid #22c55e;
          cursor: pointer; transition: var(--transition); text-decoration: none;
        }
        .btn-outline-rlg:hover { background: #22c55e; color: #fff; transform: translateY(-2px); }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* HERO SECTION */}
      <section className="rlg-hero">
        <div className="rlg-hero-content">
          <div className="rlg-container">
            <div className="fade-up">
              <h1>Gallery</h1>
              <p>Moments of Leadership in Action – Capturing the journey of young leaders across Rwanda</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <div className="rlg-container">
        <div className="rlg-coming-soon fade-up">
          <p>
            <FontAwesomeIcon icon={faSpinner} style={{ marginRight: ".5rem", animation: "pulse 2s infinite" }} />
            <strong>Admin Preview Mode:</strong> Photos and videos will appear here once published from the backend.
          </p>
          <small>📸 Waiting for admin to upload media</small>
        </div>
      </div>

      {/* GALLERY CONTENT */}
      <div className="rlg-container">
        <div className="fade-up-1">
          <div className="rlg-label"><FontAwesomeIcon icon={faCamera} /> Photo Gallery</div>
          <h2 className="rlg-section-title">Leadership in Action</h2>
        </div>

        {/* Category Filters - Only show if there are images */}
        {categories.length > 1 && (
          <div className="rlg-categories fade-up-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rlg-cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                <FontAwesomeIcon icon={faImage} />
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Image Gallery Grid or Empty State */}
        {filteredImages.length > 0 ? (
          <div className="rlg-gallery-grid">
            {filteredImages.map((image, index) => (
              <div 
                key={image._id || index} 
                className="rlg-gallery-item fade-up-3"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleImageClick(image)}
              >
                <div className="rlg-gallery-preview">
                  <FontAwesomeIcon icon={faImage} />
                  <div className="rlg-overlay">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                </div>
                <div className="rlg-gallery-info">
                  <h3>{image.title}</h3>
                  <div className="rlg-gallery-meta">
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(image.createdAt).toLocaleDateString()}</span>
                    <span><FontAwesomeIcon icon={faHeart} /> {image.likes || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyGallery />
        )}

        {/* Video Gallery Section - Only show if there are videos */}
        {videos.length > 0 && (
          <div className="rlg-video-section fade-up-1">
            <div className="rlg-label"><FontAwesomeIcon icon={faVideo} /> Video Gallery</div>
            <h2 className="rlg-section-title">Watch Leadership in Motion</h2>
            
            <div className="rlg-video-grid">
              {videos.map((video, index) => (
                <div 
                  key={video._id || index} 
                  className="rlg-video-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="rlg-video-preview">
                    <div className="rlg-play-btn">
                      <FontAwesomeIcon icon={faPlayCircle} />
                    </div>
                  </div>
                  <div className="rlg-video-info">
                    <h3>{video.title}</h3>
                    <p><FontAwesomeIcon icon={faClock} /> {video.duration || 'Coming soon'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Your Photos Section */}
        <div className="rlg-share-section fade-up-2">
          <h3><FontAwesomeIcon icon={faShare} /> Share Your RLG Moments</h3>
          <p>Have photos from RLG events? Share them with our community!</p>
          <button className="btn-primary-rlg" onClick={handleSharePhoto}>
            <FontAwesomeIcon icon={faCamera} /> Share Your Photos
          </button>
          <Link to="/contact">
            <button className="btn-outline-rlg" style={{ marginLeft: "1rem" }}>
              <FontAwesomeIcon icon={faEnvelope} /> Contact Media Team
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}