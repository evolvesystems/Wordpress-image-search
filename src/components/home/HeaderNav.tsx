
import React from "react";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";

const HeaderNav = () => (
  <header className="w-full bg-gradient-to-b from-blue-900 to-blue-700/80 text-white shadow-sm z-30 relative">
    <div className="container mx-auto px-4 flex items-center justify-between h-16">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80">
        <Image className="w-7 h-7 text-blue-200" />
        AgriVision
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          to="/auth"
          className="px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Login
        </Link>
        <Link
          to="/auth"
          className="px-4 py-2 rounded-lg font-semibold border border-white/60 hover:bg-white hover:text-blue-700 transition"
        >
          Sign Up
        </Link>
      </nav>
    </div>
  </header>
);

export default HeaderNav;
