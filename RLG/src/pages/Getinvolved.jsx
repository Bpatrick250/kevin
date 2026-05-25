import { Link } from "react-router-dom";
import Button from "../components/Button";

const Getinvolved = () => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl max-w-3xl mx-auto">
            There are many ways to be part of our movement. Find the opportunity that fits you best.
          </p>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-5xl mb-4">{opportunity.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{opportunity.title}</h3>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                <ul className="space-y-2 mb-6">
                  {opportunity.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="secondary" className="w-full">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Application */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-gray-600 mb-8">
            Join our community of passionate volunteers and help shape the next generation of leaders.
          </p>
          <Button variant="primary" size="lg">Apply as a Volunteer</Button>
        </div>
      </section>
    </div>
  );
};

const opportunities = [
  {
    icon: "👥",
    title: "Become a Mentor",
    description: "Share your experience and guide young leaders on their journey.",
    benefits: ["Shape future leaders", "Expand your network", "Gain fresh perspectives", "Flexible time commitment"]
  },
  {
    icon: "💼",
    title: "Volunteer",
    description: "Support our programs and events with your time and skills.",
    benefits: ["Build your resume", "Meet inspiring people", "Make a difference", "Leadership opportunities"]
  },
  {
    icon: "🤝",
    title: "Partner With Us",
    description: "Collaborate with RLG to amplify impact in communities.",
    benefits: ["CSR opportunities", "Access to young talent", "Brand visibility", "Networking events"]
  },
  {
    icon: "🏢",
    title: "Host an Event",
    description: "Sponsor or host leadership workshops and networking events.",
    benefits: ["Community engagement", "Brand awareness", "Talent recruitment", "Tax benefits"]
  }
];

export default Getinvolved;