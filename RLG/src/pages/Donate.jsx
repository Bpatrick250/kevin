import { useState } from "react";
import Button from "../components/Button";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isMonthly, setIsMonthly] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  const handleDonate = () => {
    alert(`Thank you for your ${isMonthly ? "monthly" : "one-time"} donation of $${amount}!`);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Support Young Leaders</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your donation helps us provide mentorship, resources, and opportunities to the next generation of changemakers.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Make a Donation</h2>
            
            {/* Donation Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-full inline-flex">
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`px-6 py-2 rounded-full transition ${!isMonthly ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  One-time
                </button>
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`px-6 py-2 rounded-full transition ${isMonthly ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 text-center">Select Amount</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAmountSelect(preset)}
                    className={`py-3 rounded-lg border-2 transition ${
                      selectedAmount === preset
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Other amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Impact Message */}
            <div className="bg-blue-50 rounded-lg p-4 mb-8 text-center">
              <p className="text-blue-800">
                {amount && !isNaN(parseFloat(amount)) ? (
                  `Your ${isMonthly ? "monthly" : "one-time"} donation of $${amount} will help ${Math.floor(amount / 10)} young leaders access mentorship programs.`
                ) : (
                  "Your support makes a difference in the lives of young leaders."
                )}
              </p>
            </div>

            {/* Donate Button */}
            <Button onClick={handleDonate} variant="primary" size="lg" className="w-full">
              Donate Now
            </Button>

            {/* Tax Info */}
            <p className="text-center text-sm text-gray-500 mt-6">
              RLG is a 501(c)(3) non-profit organization. All donations are tax-deductible.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600">$50</div>
              <p className="text-gray-600 text-sm mt-2">Provides 1 month of mentorship for a student</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600">$200</div>
              <p className="text-gray-600 text-sm mt-2">Funds a leadership workshop for 20 youth</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600">$1,000</div>
              <p className="text-gray-600 text-sm mt-2">Sponsors a full scholarship for our Accelerator program</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
