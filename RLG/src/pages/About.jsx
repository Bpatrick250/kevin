const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About RLG</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to identify, nurture, and empower the next generation of leaders.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, Rising Leaders of Generation (RLG) emerged from a simple belief: 
                every young person has the potential to be a leader. What started as a small mentorship 
                program in New York has grown into a global movement spanning over 50 countries.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Today, we're proud to have empowered thousands of young leaders who are making a difference 
                in their communities, industries, and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our alumni have gone on to start non-profits, lead social enterprises, and drive change 
                in government and business sectors worldwide.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Community Projects</span>
                    <span className="font-semibold">150+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Mentorship Hours</span>
                    <span className="font-semibold">10,000+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Youth Employed</span>
                    <span className="font-semibold">2,000+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-blue-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const values = [
  {
    icon: "💡",
    title: "Innovation",
    description: "We embrace creative thinking and new ideas to solve complex challenges."
  },
  {
    icon: "🤝",
    title: "Collaboration",
    description: "We believe the best solutions come from working together."
  },
  {
    icon: "🌱",
    title: "Growth",
    description: "We're committed to continuous learning and personal development."
  }
];

const team = [
  { name: "Sarah Chen", role: "Executive Director", initials: "SC" },
  { name: "Michael Rodriguez", role: "Programs Director", initials: "MR" },
  { name: "Dr. Amina Khan", role: "Research Lead", initials: "AK" },
  { name: "James Wilson", role: "Community Manager", initials: "JW" }
];

export default About;