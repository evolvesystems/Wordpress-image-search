import React from "react";

const steps = [
  {
    num: 1,
    title: "Sign Up Fast",
    desc: "Create your free account with just an email. No billing. No long forms."
  },
  {
    num: 2,
    title: "Connect WordPress",
    desc: "Securely link your WordPress site and instantly scan your media library. No uploads or syncing required."
  },
  {
    num: 3,
    title: "Start Searching (or Chatting)",
    desc: "Type what you need—or just ask. Search by concept, color, or see where images appear, lightning fast."
  }
];

const HowItWorks = () => (
  <section className="container mx-auto px-4 py-24 text-center" id="how-it-works">
    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-11 tracking-tight">⚙️ How It Works</h2>
    <ol className="flex flex-col md:flex-row gap-8 justify-center mb-8">
      {steps.map(step => (
        <li key={step.title} className="flex-1 min-w-[220px] bg-green-50 shadow rounded-xl p-8 border border-green-200">
          <div className="text-3xl font-extrabold text-green-700 mb-3">{step.num}</div>
          <h3 className="font-semibold mb-2 text-green-800 text-lg">{step.title}</h3>
          <p className="text-green-900 text-base">{step.desc}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
