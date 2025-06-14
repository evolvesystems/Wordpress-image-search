
import React from "react";

const features = [
  {
    emoji: "🔍",
    title: "Universal Image Search",
    text: "Search images instantly by filename, alt text, or by describing the content – even if you don't remember the details."
  },
  {
    emoji: "🧠",
    title: "AI-Powered Insights",
    text: "Let AI organize, tag, and even answer questions about your WordPress media library — no manual effort required."
  },
  {
    emoji: "💬",
    title: "Chat with Your Media",
    text: "Describe what you want or ask about media usage. Get instant results via natural, AI-driven search."
  },
  {
    emoji: "🔗",
    title: "Easy WordPress Integration",
    text: "Connect your WordPress site in seconds. No plugins, no bloat — just a clean API connection."
  },
  {
    emoji: "💡",
    title: "Boost Productivity",
    text: "Stop wasting time hunting down images. Focus on creating content and let automation handle media search."
  }
];

const CoreFeatures = () => (
  <section className="w-full bg-gradient-to-r from-green-100 via-amber-50 to-emerald-50 py-20 border-y border-green-200" id="features">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-11 tracking-tight">✨ Core Features</h2>
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
