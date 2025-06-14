
import React from "react";

const useCases = [
  "“Where’s that banner image used across the site?”",
  "“Which posts are using our old logo?”",
  "“Show me every image uploaded in the past 6 months not being used.”",
  "“Find all images with a green background used on landing pages.”",
  "“What images are used in my WooCommerce product pages?”"
];

const RealUseCases = () => (
  <section className="container mx-auto px-4 py-16 text-center" id="use-cases">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 tracking-tight">🧠 Real Use Cases</h2>
    <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
      {useCases.map((u) => (
        <div key={u} className="px-6 py-5 bg-blue-50 rounded-xl shadow border border-blue-100 text-blue-800 text-lg font-medium">
          {u}
        </div>
      ))}
    </div>
  </section>
);

export default RealUseCases;
