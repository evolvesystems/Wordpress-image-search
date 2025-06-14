import React from "react";
import { Button } from "@/components/ui/button";

const ClosingCTA = () => (
  <section className="relative bg-gradient-to-tr from-blue-700 to-blue-500 py-20 text-center overflow-hidden">
    <div className="container mx-auto px-4 flex flex-col items-center z-10 relative">
      <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow tracking-tight">
        🚀 Ready to Search Your Images?
      </h2>
      <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8 font-medium">
        Cut through the chaos. Get clarity and instant answers about all your images—with zero setup headaches.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="px-8 py-3 text-lg bg-white text-blue-800 font-bold hover:bg-blue-100 rounded-xl shadow-lg transition">
          🔎 Try Instantly Free
        </button>
        <a href="#ai-chat">
          <button className="px-8 py-3 text-lg border border-blue-200 text-blue-200 hover:bg-blue-100 hover:text-blue-700 flex items-center gap-2 rounded-xl transition">
            💬 Experience AI Chat
          </button>
        </a>
      </div>
    </div>
  </section>
);

export default ClosingCTA;
