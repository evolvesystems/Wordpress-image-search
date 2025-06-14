
import React from "react";

const ClosingCTA = () => (
  <section className="relative bg-gradient-to-tr from-green-600/90 to-green-400/80 py-20 text-center overflow-hidden">
    <div className="container mx-auto px-4 flex flex-col items-center z-10 relative">
      <h2 className="text-4xl font-extrabold mb-6 text-white tracking-tight">
        🚀 Ready to Search Your Images?
      </h2>
      <p className="text-xl md:text-2xl text-green-50 max-w-2xl mx-auto mb-8 font-medium">
        Cut through the chaos—get instant, earth-friendly answers about all your images. No setup headaches, just clean results.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/auth">
          <button className="px-8 py-3 text-lg bg-green-700 text-white font-bold hover:bg-green-800 rounded-xl shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-800">
            🔎 Try Instantly Free
          </button>
        </a>
        <a href="/auth">
          <button className="px-8 py-3 text-lg border border-green-200 text-green-50 hover:bg-white hover:text-green-700 flex items-center gap-2 rounded-xl transition hover:scale-105">
            💬 Experience AI Chat
          </button>
        </a>
      </div>
    </div>
  </section>
);

export default ClosingCTA;
