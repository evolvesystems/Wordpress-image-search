
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
        <Button className="px-8 py-3 text-lg bg-blue-500 text-white font-bold hover:bg-blue-700 rounded-xl shadow-lg animate-[pulse_1.7s_ease-in-out_infinite]">
          🔎 Try Instantly Free
        </Button>
        <Button asChild variant="outline" className="px-8 py-3 text-lg border-blue-300 text-blue-200 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 rounded-xl">
          <a href="javascript:void(0)">
            💬 Experience AI Chat
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default ClosingCTA;
