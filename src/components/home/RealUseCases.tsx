import React from "react";

const useCases = [
  "“Show me every image not being used anywhere.”",
  "“Where are all the images with our old logo?”",
  "“Find all the hero banners used in my blog posts.”",
  "“What images are on product and sales pages?”",
  "“Find all images with a blue background uploaded last year.”"
];

const RealUseCases = () => (
  <section className="container mx-auto px-4 py-20 text-center" id="use-cases">
    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8 tracking-tight">🧠 Real Use Cases</h2>
    <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
      {useCases.map((u) => (
        <div key={u} className="px-6 py-5 bg-gradient-to-r from-green-100 via-white to-amber-50 rounded-xl shadow border border-green-100 text-green-900 text-lg font-medium">
          {u}
        </div>
      ))}
    </div>
  </section>
);

export default RealUseCases;
