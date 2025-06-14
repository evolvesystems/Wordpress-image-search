
import React from "react";

const stats = [
  { value: "5,000+", label: "WordPress Sites" },
  { value: "1M+", label: "Images Indexed" },
  { value: "99.9%", label: "Uptime" },
];

const HeroSection = () => (
  <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white py-20 overflow-hidden">
    <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse md:items-center gap-12 z-10 relative">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow tracking-tight leading-tight">
          Instant WordPress Image Search,<br /> <span className="text-blue-200">Powered by AI</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl font-medium">
          Search <span className="font-semibold text-white">every image</span> on your site — see where it's used, what it's about, and keep track easily. No upload or syncing: it's instant, secure, and simple.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#pricing">
            <button className="px-8 py-3 text-lg bg-white text-blue-800 font-bold hover:bg-blue-100 rounded-xl shadow-lg transition">
              🔎 Try Instantly Free
            </button>
          </a>
          <a href="#ai-chat">
            <button className="px-8 py-3 text-lg border border-blue-200 text-blue-200 hover:bg-blue-100 hover:text-blue-700 rounded-xl flex items-center gap-2 transition">
              💬 Experience AI Chat
            </button>
          </a>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="relative z-10 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="bg-blue-900/80 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-blue-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-xs text-blue-300">WordPress Image Search</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 bg-blue-800/50 rounded-lg p-2 mb-4">
                  <div className="text-blue-300 text-sm">🔎</div>
                  <div className="text-blue-100 text-sm">Find product images with green background</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-blue-700/50 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-60"></div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/20 to-transparent h-32"></div>
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-12 gap-y-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] bg-blue-400 rounded-full blur-3xl opacity-30"></div>
    </div>
  </section>
);

export default HeroSection;
