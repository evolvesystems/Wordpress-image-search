
import React from "react";
import { Button } from "@/components/ui/button";

const ClosingCTA = () => (
  <section className="relative bg-gradient-to-tr from-blue-700 to-blue-500 py-16 text-center overflow-hidden">
    <div className="container mx-auto px-4 flex flex-col items-center z-10 relative">
      <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow tracking-tight">
        📦 One Last Thing...
      </h2>
      <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8 font-medium">
        Stop wasting hours on image hunts.<br />
        WordPress Image Search gives you control, visibility, and confidence—without the overhead.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="px-8 py-3 text-lg bg-blue-400 text-white font-bold hover:bg-blue-500 rounded-xl shadow-lg animate-[pulse_1.5s_ease-in-out_infinite]">
          🎯 Get Instant Access
        </Button>
        <Button asChild variant="outline" className="px-8 py-3 text-lg border-green-500 text-green-500 hover:bg-green-50 hover:text-green-700 flex items-center gap-2 rounded-xl">
          <a href="javascript:void(0)">
            💬 Try AI Chat (BYO API)
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default ClosingCTA;
