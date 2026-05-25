import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["All", "Events", "Workshops", "Community", "Graduations"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Moments from our programs, events, and community gatherings around the world.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group cursor-pointer relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-6xl">
                  {image.icon}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition">🔍 View</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <p className="text-white text-sm">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="max-w-2xl w-full bg-white rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-8xl">
              {selectedImage.icon}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
              <button onClick={() => setSelectedImage(null)} className="mt-4 text-blue-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const galleryImages = [
  { icon: "🎓", title: "Graduation Ceremony 2024", description: "Celebrating our Rising Stars cohort", category: "Graduations" },
  { icon: "💡", title: "Leadership Workshop", description: "Students learning design thinking", category: "Workshops" },
  { icon: "🌍", title: "Global Summit 2024", description: "Annual gathering in New York", category: "Events" },
  { icon: "🤝", title: "Community Service Day", description: "Volunteers cleaning local park", category: "Community" },
  { icon: "🎤", title: "Guest Speaker Session", description: "Industry leaders share insights", category: "Events" },
  { icon: "🏆", title: "Awards Night", description: "Recognizing outstanding leaders", category: "Events" },
  { icon: "📚", title: "Study Group", description: "Peer learning session", category: "Workshops" },
  { icon: "🌱", title: "Mentorship Meetup", description: "Mentors and mentees connect", category: "Community" }
];

export default Gallery;