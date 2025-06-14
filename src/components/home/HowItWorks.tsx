
import React from "react";

const steps = [
  {
    num: 1,
    title: "Sign Up",
    desc: "Create your account in seconds – no credit card, no hassle."
  },
  {
    num: 2,
    title: "Connect WordPress",
    desc: "Securely link your site and instantly scan your media library. No plugin installs."
  },
  {
    num: 3,
    title: "Supercharge Search",
    desc: "Type, describe, or ask your way to the images you need — all powered by modern AI."
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
