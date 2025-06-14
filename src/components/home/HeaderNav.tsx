
import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const HeaderNav = () => (
  <header className="w-full bg-green-700/95 text-white shadow-md z-30 relative">
    <div className="container mx-auto px-4 flex items-center justify-between h-16">
      <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight hover:opacity-80">
        <Leaf className="w-7 h-7 text-green-200" />
        Wordpress + <span className="ml-1 text-green-100">AI</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          to="/auth"
          className="px-4 py-2 rounded-lg text-green-900 bg-green-100 font-semibold hover:bg-green-200 hover:text-green-800 transition shadow-sm"
        >
          Login
        </Link>
        <Link
          to="/auth"
          className="px-4 py-2 rounded-lg font-semibold border border-green-200 text-green-100 hover:bg-white hover:text-green-700 transition shadow-sm"
        >
          Sign Up
        </Link>
      </nav>
    </div>
  </header>
);

export default HeaderNav;
