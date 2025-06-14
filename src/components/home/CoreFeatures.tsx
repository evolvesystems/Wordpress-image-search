
import React from "react";

const features = [
  {
    emoji: "🎯",
    title: "Full Media Library Search",
    text: "Search your images by name, caption, alt text, or just describe what you're looking for. See results instantly."
  },
  {
    emoji: "🧩",
    title: "Post & Page Usage Mapping",
    text: "Know exactly where each image is used—across posts, pages, products, blocks, or galleries."
  },
  {
    emoji: "💬",
    title: "AI Chat Assistant (Optional)",
    text: "Ask questions like “Where’s the hero image on the About page?” or “Find me all images with a blue background used in blog posts.”"
  },
  {
    emoji: "🛠️",
    title: "Seamless WordPress Integration",
    text: "Connect any modern WordPress site—no syncing, no imports. Just log in and go."
  },
  {
    emoji: "🔐",
    title: "Private & Secure",
    text: "Your data stays on your site. AI features only activate with your own API key. You stay in control."
  }
];

const CoreFeatures = () => (
  <section className="w-full bg-gradient-to-r from-blue-100/60 via-white to-blue-50 py-16 border-y border-blue-200" id="features">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-tight">🔍 Core Features</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {features.map(({emoji, title, text}) => (
          <div
            key={title}
            className="bg-white border border-blue-100 rounded-xl shadow-md p-6 flex flex-col items-start hover:scale-105 transition-transform duration-150 hover:shadow-xl"
            style={{ minHeight: 210 }}
          >
            <span className="text-4xl mb-2">{emoji}</span>
            <h3 className="font-semibold text-xl text-blue-800 mb-2">{title}</h3>
            <p className="text-blue-700 text-base">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CoreFeatures;
