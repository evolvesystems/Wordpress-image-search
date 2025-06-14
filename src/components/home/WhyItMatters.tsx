
import React from "react";

const WhyItMatters = () => (
  <section className="relative container mx-auto px-4 py-16 text-center">
    <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-400/40 via-blue-200/30 to-blue-50/0" />
    <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 tracking-tight">💡 Why It Matters</h2>
    <p className="mb-6 text-blue-800 text-lg max-w-3xl mx-auto">
      Your WordPress media library wasn’t built for humans.<br />
      It’s clunky. It's chaotic. And it’s growing every time someone uploads another version of <span className="inline font-mono text-blue-600 px-2 py-1 bg-blue-100 rounded">logo-final-FINAL2.png</span>.
    </p>
    <p className="text-blue-700 text-base max-w-2xl mx-auto mb-3">
      You shouldn’t need detective work to find an image—or figure out where it’s used.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-8 mt-10">
      <div className="bg-white rounded-2xl px-8 py-7 border-2 border-blue-100 shadow-sm flex-1 min-w-[260px]">
        <h3 className="font-bold text-blue-800 text-xl mb-3 tracking-tight">
          WordPress Image Search gives you:
        </h3>
        <ul className="text-left text-blue-700 text-base space-y-1 md:space-y-0">
          <li><span className="mr-1 font-medium">•</span>Instant visual search across your entire media library</li>
          <li><span className="mr-1 font-medium">•</span>Usage insights: know exactly where every image appears</li>
          <li><span className="mr-1 font-medium">•</span>AI-powered search assistant (just add your API key)</li>
          <li><span className="mr-1 font-medium">•</span>Zero syncing. Zero setup headaches.</li>
          <li><span className="mr-1 font-medium">•</span>No plugins bloating your site. No imports. Just insight.</li>
        </ul>
      </div>
    </div>
  </section>
);

export default WhyItMatters;
