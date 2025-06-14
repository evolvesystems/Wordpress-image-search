
import React from "react";

const WhyItMatters = () => (
  <section className="relative container mx-auto px-4 py-20 text-center">
    <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-green-300/50 via-amber-200/40 to-emerald-50/0" />
    <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-7 tracking-tight">💡 Why It Matters</h2>
    <p className="mb-8 text-green-900 text-lg max-w-2xl mx-auto leading-relaxed">
      Your WordPress media library is supposed to boost productivity—but it often slows you down. Old school search is limited, tags go stale, and image chaos grows as your site does.
    </p>
    <p className="text-green-800 text-md max-w-2xl mx-auto mb-6">
      Save countless hours with AI-powered search, effortless image usage tracking, and workflow tools designed for modern creators and teams.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
      <div className="bg-gradient-to-tr from-green-100 via-white to-amber-50 rounded-2xl px-8 py-8 border-2 border-green-100 shadow-md flex-1 min-w-[260px]">
        <h3 className="font-bold text-green-900 text-xl mb-3 tracking-tight">
          Our Solution:
        </h3>
        <ul className="text-left text-green-800 text-base space-y-2">
          <li><span className="mr-1 font-semibold">•</span>AI-first, visual & semantic media search</li>
          <li><span className="mr-1 font-semibold">•</span>Instantly see where every image is used</li>
          <li><span className="mr-1 font-semibold">•</span>Ask questions about your library, get answers in plain English</li>
          <li><span className="mr-1 font-semibold">•</span>No plugins, fast to set up, works with any WordPress site</li>
        </ul>
      </div>
    </div>
  </section>
);

export default WhyItMatters;
