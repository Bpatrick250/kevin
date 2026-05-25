import { Link } from "react-router-dom";
import Button from "../components/Button";

const Programs = () => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover leadership development programs designed for every stage of your journey.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-7xl">{program.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <p className="text-blue-600 text-sm mb-3">{program.duration}</p>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-500 flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/getinvolved">
                    <Button variant="secondary" className="w-full">Apply Now →</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Cohort */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Next Cohort Starts Soon!</h2>
          <p className="text-gray-600 mb-6">Application deadline: June 30, 2025</p>
          <Button variant="primary" size="lg">Apply Today</Button>
        </div>
      </section>
    </div>
  );
};

const programs = [
  {
    icon: "🌟",
    title: "Rising Stars",
    duration: "12 Weeks",
    description: "For young leaders aged 16-20 starting their leadership journey.",
    features: ["Weekly mentorship sessions", "Leadership workshops", "Community project", "Certificate of completion"]
  },
  {
    icon: "🚀",
    title: "Leadership Accelerator",
    duration: "6 Months",
    description: "Intensive program for emerging leaders ready to scale their impact.",
    features: ["Executive coaching", "Strategic planning", "Network access", "Funding opportunities"]
  },
  {
    icon: "🌍",
    title: "Global Fellows",
    duration: "1 Year",
    description: "Year-long fellowship for experienced young leaders.",
    features: ["International exchange", "Research projects", "Policy advocacy", "Alumni network"]
  }
];

export default Programs;