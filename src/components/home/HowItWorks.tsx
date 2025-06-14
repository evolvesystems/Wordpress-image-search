
import React from "react";

const steps = [
  {
    num: 1,
    title: "Create Your Free Account",
    desc: "Sign up in seconds. No credit card. No long forms."
  },
  {
    num: 2,
    title: "Connect Your WordPress Site",
    desc: "Secure connection to your media library—no need to upload or sync anything."
  },
  {
    num: 3,
    title: "Start Searching (or Asking)",
    desc: "Search by keyword, concept, or colour. Or ask a natural-language question and let the AI assistant do the work."
  }
];

const HowItWorks = () => (
  <section className="container mx-auto px-4 py-20 text-center" id="how-it-works">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-tight">⚙️ How It Works</h2>
    <ol className="flex flex-col md:flex-row gap-8 justify-center mb-10">
      {steps.map(step => (
        <li key={step.title} className="flex-1 min-w-[220px] bg-white shadow rounded-xl p-6 border border-blue-100">
          <div className="text-3xl font-extrabold text-blue-800 mb-3">{step.num}</div>
          <h3 className="font-semibold mb-2 text-blue-800 text-lg">{step.title}</h3>
          <p className="text-blue-700 text-base">{step.desc}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
