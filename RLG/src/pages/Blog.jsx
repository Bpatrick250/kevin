  import { Link } from "react-router-dom";

  const Blog = () => {
    return (
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Insights, stories, and advice from young leaders around the world.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-4xl">
                    {post.cover}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.authorInitials}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const posts = [
    {
      title: "5 Leadership Lessons I Learned as a Young Entrepreneur",
      excerpt: "Discover the key insights that transformed my approach to leadership and teamwork...",
      date: "May 15, 2025",
      readTime: "5 min read",
      cover: "📝",
      slug: "leadership-lessons",
      author: "Maria Garcia",
      authorRole: "RLG Alumni",
      authorInitials: "MG"
    },
    {
      title: "How to Build a Global Network as a Student",
      excerpt: "Practical tips for connecting with mentors and peers from around the world...",
      date: "May 10, 2025",
      readTime: "4 min read",
      cover: "🌐",
      slug: "build-global-network",
      author: "David Kim",
      authorRole: "Program Mentor",
      authorInitials: "DK"
    },
    {
      title: "The Future of Youth Leadership",
      excerpt: "Exploring trends and opportunities for the next generation of changemakers...",
      date: "May 5, 2025",
      readTime: "6 min read",
      cover: "🔮",
      slug: "future-youth-leadership",
      author: "Dr. Sarah Chen",
      authorRole: "Executive Director",
      authorInitials: "SC"
    }
  ];

  export default Blog;