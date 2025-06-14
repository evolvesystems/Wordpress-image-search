import React from "react";

const stats = [
  { value: "5,000+", label: "WordPress Sites" },
  { value: "1M+", label: "Images Indexed" },
  { value: "99.9%", label: "Uptime" },
];

const HeroSection = () => (
  <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-600 via-emerald-100 to-amber-50 text-green-900 py-20 overflow-hidden">
    <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse md:items-center gap-12 z-10 relative">
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight font-serif text-green-800 drop-shadow">
          Modern WordPress Image Search
          <br /> <span className="text-green-400">+ AI Simplicity</span>
        </h1>
        <p className="text-lg md:text-xl text-green-700 mb-8 max-w-xl font-medium">
          Effortlessly find every image on your site. <span className="font-semibold text-green-900">Powered by earth-friendly, instant AI search.</span>
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/auth">
            <button className="px-8 py-3 text-lg bg-green-600 text-white font-bold hover:bg-green-700 rounded-xl shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-800">
              🔎 Try Instantly Free
            </button>
          </a>
          <a href="/auth">
            <button className="px-8 py-3 text-lg border border-green-300 text-green-700 hover:bg-green-100 hover:text-green-900 rounded-xl flex items-center gap-2 transition hover:scale-105">
              💬 Experience AI Chat
            </button>
          </a>
        </div>
      </div>
      <div className="flex-1 relative flex justify-center items-center">
        <div className="relative z-10 animate-fade-in">
          <div className="bg-white/30 backdrop-blur-sm border border-green-200/50 rounded-2xl p-6 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=520&q=80"
              alt="Agriculture illustration"
              className="rounded-2xl w-full max-w-xs aspect-square object-cover border border-emerald-200 shadow-md"
              draggable="false"
            />
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-300 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-60"></div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/10 to-transparent h-32"></div>
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-12 gap-y-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-green-800">{stat.value}</div>
              <div className="text-green-700 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] bg-green-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] bg-amber-100 rounded-full blur-3xl opacity-15"></div>
    </div>
  </section>
);

export default HeroSection;
