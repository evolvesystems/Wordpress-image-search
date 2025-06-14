import React from "react";

const plans = [
  {
    name: "Free Account",
    features: [
      "Full visual and keyword search",
      "Usage mapping included"
    ],
    price: "Free Forever"
  },
  {
    name: "AI Chat (With Your Key)",
    features: [
      "AI Chat Assistant unlocked",
      "Use your own OpenAI API key"
    ],
    price: "No Extra Cost"
  }
];
const highlights = [
  "No license fees or surprises",
  "You control all AI features",
  "Instant setup—no plugins needed"
];

const PricingOverview = () => (
  <section className="w-full py-20 bg-gradient-to-r from-green-50 via-amber-50 to-emerald-100 border-t border-b border-green-200" id="pricing">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-9 tracking-tight">💸 Simple Pricing</h2>
      <table className="w-full max-w-3xl mx-auto table-auto border-collapse bg-white rounded-xl shadow text-left overflow-hidden">
        <thead>
          <tr className="bg-green-100/50">
            <th className="px-6 py-3 font-semibold text-green-900">Plan</th>
            <th className="px-6 py-3 font-semibold text-green-900">Features</th>
            <th className="px-6 py-3 font-semibold text-green-900">Cost</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.name} className="border-t border-green-100 even:bg-green-50/60">
              <td className="px-6 py-4 font-bold">{plan.name}</td>
              <td className="px-6 py-4">
                <ul className="list-disc ml-6">
                  {plan.features.map(f => (
                    <li key={f} className="text-green-800">{f}</li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 font-semibold">{plan.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-4 justify-center mt-8 text-center">
        {highlights.map(h => (
          <span key={h} className="inline-block bg-green-700 text-white px-4 py-2 rounded-md font-semibold shadow">✅ {h}</span>
        ))}
      </div>
    </div>
  </section>
);

export default PricingOverview;
