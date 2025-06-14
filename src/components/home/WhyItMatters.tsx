import React from "react";

const WhyItMatters = () => (
  <section className="relative container mx-auto px-4 py-20 text-center">
    <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-green-300/50 via-amber-200/40 to-emerald-50/0" />
    <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-7 tracking-tight">💡 Why It Matters</h2>
    <p className="mb-8 text-green-900 text-lg max-w-2xl mx-auto leading-relaxed">
      Your WordPress media library is probably a maze. It's built for machines, <span className="font-semibold text-green-700">not humans</span>—and it only gets messier over time.
      <br />
      Every upload, version, and folder adds more confusion and lost minutes.
    </p>
    <p className="text-green-800 text-md max-w-2xl mx-auto mb-6">
      Stop wasting hours scrolling, guessing, and hunting for the right image or trying to remember where it's used.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
      <div className="bg-gradient-to-tr from-green-100 via-white to-amber-50 rounded-2xl px-8 py-8 border-2 border-green-100 shadow-md flex-1 min-w-[260px]">
        <h3 className="font-bold text-green-900 text-xl mb-3 tracking-tight">
          Our Solution:
        </h3>
        <ul className="text-left text-green-800 text-base space-y-2">
          <li><span className="mr-1 font-semibold">•</span>Visual search & lightning-fast filtering</li>
          <li><span className="mr-1 font-semibold">•</span>See usage instantly for <span className="font-semibold">any</span> image</li>
          <li><span className="mr-1 font-semibold">•</span>Ask questions in plain English—AI included</li>
          <li><span className="mr-1 font-semibold">•</span>No plugins or bloat. No syncing. Just connect & go</li>
        </ul>
      </div>
    </div>
  </section>
);

export default WhyItMatters;
