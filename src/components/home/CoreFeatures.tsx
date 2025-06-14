import React from "react";

const features = [
  {
    emoji: "🔍",
    title: "Total Image Search",
    text: "Find images instantly by name, description, or just write what you see. No technical skills required—just results."
  },
  {
    emoji: "📍",
    title: "Usage Mapping",
    text: "See everywhere an image appears—pages, posts, products, galleries—never miss a reuse or a duplicate again."
  },
  {
    emoji: "💬",
    title: "Ask with AI",
    text: "Describe, ask, or instruct. Our AI answers questions like 'Where are all our summer banners used?'"
  },
  {
    emoji: "🔗",
    title: "Connects Instantly",
    text: "Hook up your WordPress site in a few clicks. No uploads, no waiting, no plugin headaches."
  },
  {
    emoji: "🔒",
    title: "Always Secure",
    text: "Your images never leave your site. AI features only run with your own key for total privacy."
  }
];

const CoreFeatures = () => (
  <section className="w-full bg-gradient-to-r from-green-100 via-amber-50 to-emerald-50 py-20 border-y border-green-200" id="features">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-11 tracking-tight">🔍 Core Features</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {features.map(({emoji, title, text}) => (
          <div
            key={title}
            className="bg-white border border-green-100 rounded-xl shadow-md p-6 flex flex-col items-start hover:scale-105 transition-transform duration-150 hover:shadow-xl"
            style={{ minHeight: 210 }}
          >
            <span className="text-4xl mb-2">{emoji}</span>
            <h3 className="font-semibold text-xl text-green-700 mb-2">{title}</h3>
            <p className="text-green-800 text-base">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CoreFeatures;
