
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1600&q=80";

const HeroSection = () => (
  <section className="relative min-h-[700px] flex flex-col justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 pb-12 overflow-hidden">
    <div
      className="absolute inset-0 w-full h-full z-0"
      style={{
        background: `linear-gradient(115deg,rgba(17,40,94,0.97),rgba(26,67,141,0.84)),url(${HERO_IMAGE}) center/cover no-repeat`
      }}
    />
    <div className="container mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center relative z-10">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 drop-shadow-lg text-white leading-tight tracking-tight">
        Instantly Reveal & Search Your <span className="text-blue-200">WordPress Images</span>
      </h1>
      <p className="text-white text-xl md:text-2xl font-medium mb-7 max-w-2xl mx-auto leading-snug opacity-95">
        Find any image—fast. See exactly where each one is used across your site, spot duplicates, and unlock AI-powered chat search—all from one stunning dashboard.
      </p>
      <div className="flex flex-col md:flex-row gap-3 mb-9 justify-center">
        <Button className="px-10 py-3 text-lg bg-blue-500 text-white font-bold rounded-xl shadow-xl hover:bg-blue-600 transition-all duration-150 animate-pulse">
          Start Free
        </Button>
        <a href="#how-it-works" className="flex justify-center">
          <Button
            variant="outline"
            className="px-9 py-3 text-lg border-blue-200 text-blue-100 bg-white/5 hover:bg-blue-100/5 hover:text-white flex items-center gap-2 rounded-xl"
          >
            How It Works
            <ArrowDown className="w-5 h-5" />
          </Button>
        </a>
      </div>
      <div className="mb-5">
        <span className="text-white px-5 py-2 bg-blue-900/80 rounded-xl inline-flex items-center font-bold text-lg shadow-lg animate-pulse">
          <span className="mr-2">→ Try the new</span>
          <span className="text-green-300">AI Chat Assistant</span>
        </span>
      </div>
      <ul className="flex flex-col md:flex-row gap-4 font-medium text-blue-50 mb-10 text-left mx-auto text-[1.1rem]">
        <li className="flex gap-2 items-center">
          <span className="text-blue-200 text-2xl">●</span>See where each image appears sitewide—in posts, pages, blocks & products
        </li>
        <li className="flex gap-2 items-center">
          <span className="text-blue-200 text-2xl">●</span>Search by keyword, subject, or just describe what you see
        </li>
        <li className="flex gap-2 items-center">
          <span className="text-blue-200 text-2xl">●</span>No more folders or chaos—just clarity and instant results
        </li>
      </ul>
    </div>
    {/* Section divider */}
    <div className="w-full h-10 bg-gradient-to-t from-blue-50/60 to-blue-700/0"></div>
  </section>
);

export default HeroSection;
