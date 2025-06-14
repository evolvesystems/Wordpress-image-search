
import React from "react";

const plans = [
  {
    name: "Free Account",
    features: [
      "Full media library search",
      "Usage mapping"
    ],
    price: "Free forever"
  },
  {
    name: "AI Chat (BYO API)",
    features: [
      "Unlock AI assistant",
      "Bring your own OpenAI API key"
    ],
    price: "BYO Key Only"
  }
];
const highlights = [
  "No hidden fees",
  "No AI surprises—you control when (and if) AI is used",
  "Designed for speed, clarity, and trust"
];

const PricingOverview = () => (
  <section className="w-full py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-t border-b border-blue-200" id="pricing">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 tracking-tight">💸 Pricing Overview</h2>
      <table className="w-full max-w-3xl mx-auto table-auto border-collapse bg-white rounded-xl shadow text-left overflow-hidden">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-6 py-3 font-semibold text-blue-900">Plan</th>
            <th className="px-6 py-3 font-semibold text-blue-900">Features</th>
            <th className="px-6 py-3 font-semibold text-blue-900">Cost</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.name} className="border-t border-blue-100 even:bg-blue-50">
              <td className="px-6 py-4 font-bold">{plan.name}</td>
              <td className="px-6 py-4">
                <ul className="list-disc ml-6">
                  {plan.features.map(f => (
                    <li key={f} className="text-blue-800">{f}</li>
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
          <span key={h} className="inline-block bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow">✅ {h}</span>
        ))}
      </div>
    </div>
  </section>
);

export default PricingOverview;
