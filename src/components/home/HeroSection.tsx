
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1600&q=80";

const HeroSection = () => (
  <div className="relative min-h-[660px] flex flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400 pb-12">
    <div
      className="absolute inset-0 w-full h-full z-0"
      style={{
        background: `linear-gradient(120deg,rgba(16,38,97,0.85),rgba(30,58,138,0.82)),url(${HERO_IMAGE}) center/cover no-repeat`
      }}
    />
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center relative z-10">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-7 drop-shadow-lg text-white leading-tight tracking-tight">
        Stop Wasting Time Digging Through Your Media Library
      </h1>
      <p className="text-white text-lg md:text-2xl font-regular mb-5 opacity-90 max-w-2xl mx-auto">
        Your WordPress site has hundreds—maybe thousands—of images. <br />
        But where are they used? Which ones are duplicates? Which ones are just sitting there?
      </p>
      <p className="text-xl md:text-2xl text-blue-100 mt-1 mb-6 max-w-2xl mx-auto">
        <span className="font-semibold text-white">WordPress Image Search</span> makes your entire media library searchable and context-aware.<br/>Search by keyword, subject, colour—or just describe what you’re looking for.
      </p>
      <div className="mb-6">
        <span className="text-white px-5 py-2 bg-blue-900/70 rounded-xl inline-flex items-center font-bold text-lg shadow-lg animate-pulse">
          <span className="mr-2">→ NEW:</span>
          <span className="text-green-300">Ask questions in plain English with our AI Chat Assistant.</span>
        </span>
      </div>
      <ul className="flex flex-col md:flex-row gap-4 font-medium text-blue-50 mb-8 text-left mx-auto text-[1.1rem]">
        <li className="flex gap-2 items-center">
          <span className="text-green-400 text-2xl">✅</span>See where each image appears across pages, posts, and blocks
        </li>
        <li className="flex gap-2 items-center">
          <span className="text-green-400 text-2xl">✅</span>Eliminate guesswork and messy media folders
        </li>
        <li className="flex gap-2 items-center">
          <span className="text-green-400 text-2xl">✅</span>Find exactly what you need—faster than ever
        </li>
      </ul>
      <div className="flex flex-wrap gap-4 justify-center mb-2">
        <Button className="px-9 py-3 text-lg bg-blue-400 text-white font-bold rounded-xl shadow-lg hover:bg-blue-500 transition-all duration-150">
          Start Free
        </Button>
        <a href="#how-it-works">
          <Button
            variant="outline"
            className="px-9 py-3 text-lg border-blue-100 text-blue-50 bg-white/10 hover:bg-blue-100/10 hover:text-white flex items-center gap-2 rounded-xl"
          >
            How It Works
            <ArrowDown className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
    {/* Section divider */}
    <div className="w-full h-12 bg-gradient-to-t from-blue-50/40 to-blue-600/0"></div>
  </div>
);

export default HeroSection;
