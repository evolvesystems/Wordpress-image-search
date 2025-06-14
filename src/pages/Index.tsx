
import React from 'react';
import { Button } from "@/components/ui/button";
import ImageSearchHeader from '@/components/ImageSearchHeader';
import ImageAIAssistant from '@/components/ImageAIAssistant';
import { ArrowDown } from "lucide-react";

const features = [
  {
    emoji: "🎯",
    title: "Full Media Library Search",
    text: "Search your images by name, caption, alt text, or just describe what you're looking for. See results instantly."
  },
  {
    emoji: "🧩",
    title: "Post & Page Usage Mapping",
    text: "Know exactly where each image is used—across posts, pages, products, blocks, or galleries."
  },
  {
    emoji: "💬",
    title: "AI Chat Assistant (Optional)",
    text: "Ask questions like “Where’s the hero image on the About page?” or “Find me all images with a blue background used in blog posts.”"
  },
  {
    emoji: "🛠️",
    title: "Seamless WordPress Integration",
    text: "Connect any modern WordPress site—no syncing, no imports. Just log in and go."
  },
  {
    emoji: "🔐",
    title: "Private & Secure",
    text: "Your data stays on your site. AI features only activate with your own API key. You stay in control."
  }
];

const plans = [
  {
    name: "Free Account",
    features: [
      "Full media library search",
      "Usage mapping"
    ],
    price: "Free forever"
  },
  {
    name: "AI Chat (BYO API)",
    features: [
      "Unlock AI assistant",
      "Bring your own OpenAI API key"
    ],
    price: "BYO Key Only"
  }
];

const useCases = [
  "“Where’s that banner image used across the site?”",
  "“Which posts are using our old logo?”",
  "“Show me every image uploaded in the past 6 months not being used.”",
  "“Find all images with a green background used on landing pages.”",
  "“What images are used in my WooCommerce product pages?”"
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-white relative">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-br from-blue-700 to-blue-500 py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow">
            Stop Wasting Time Digging Through Your Media Library
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-6 max-w-2xl mx-auto font-medium">
            Your WordPress site has hundreds—maybe thousands—of images.<br />
            But where are they used? Which ones are duplicates? Which ones are just sitting there? 
          </p>
          <p className="text-xl md:text-2xl text-blue-100 mt-4 mb-6 max-w-2xl mx-auto">
            <span className="font-semibold text-white">WordPress Image Search</span> makes your entire media library searchable and context-aware. Search by keyword, subject, colour—or just describe what you’re looking for.
          </p>
          <div className="mb-6">
            <span className="text-white px-4 py-2 bg-blue-900 bg-opacity-50 rounded-lg inline-flex items-center font-bold text-lg shadow-lg">
              <span className="mr-2">→ NEW:</span>
              <span className="text-green-300">Ask questions in plain English with our AI Chat Assistant.</span>
            </span>
          </div>
          <ul className="flex flex-col md:flex-row gap-5 font-medium text-blue-50 mb-8 text-left mx-auto">
            <li className="flex gap-2 items-center"><span className="text-green-300">✅</span> See where each image appears across pages, posts, and blocks</li>
            <li className="flex gap-2 items-center"><span className="text-green-300">✅</span> Eliminate guesswork and messy media folders</li>
            <li className="flex gap-2 items-center"><span className="text-green-300">✅</span> Find exactly what you need—faster than ever</li>
          </ul>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Button className="px-8 py-3 text-lg bg-blue-400 text-white font-bold hover:bg-blue-500 shadow-lg">
              Start Free
            </Button>
            <a href="#how-it-works">
              <Button variant="outline" className="px-8 py-3 text-lg border-blue-100 text-blue-50 hover:bg-blue-100/10 hover:text-white flex items-center gap-2">
                How It Works <ArrowDown className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
        {/* Gradient divider */}
        <div className="h-24 w-full bg-gradient-to-t from-blue-50/80 to-blue-600"></div>
      </div>

      {/* WHY IT MATTERS */}
      <section className="container mx-auto px-4 py-16 text-center" id="why-it-matters">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">💡 Why It Matters</h2>
        <p className="mb-7 text-blue-800 text-lg max-w-3xl mx-auto font-medium">
          Your WordPress media library wasn’t built for humans.<br />
          It’s clunky. It's chaotic. And it’s growing every time someone uploads another version of <span className="inline-block font-mono text-blue-600 px-2 py-1 bg-blue-100 rounded">logo-final-FINAL2.png</span>.
        </p>
        <p className="text-blue-700 text-base max-w-2xl mx-auto mb-4">
          You shouldn’t need detective work to find an image—or figure out where it’s used.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-100 shadow-sm flex-1 min-w-[260px]">
            <h3 className="font-bold text-blue-800 text-lg mb-2">What You'll Get</h3>
            <ul className="text-left text-blue-700 text-base space-y-2">
              <li>• Instant visual search across your entire media library</li>
              <li>• Usage insights: know exactly where every image appears</li>
              <li>• AI-powered search assistant (just add your API key)</li>
              <li>• Zero syncing. Zero setup headaches.</li>
              <li>• No plugins bloating your site. No imports. Just insight.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full bg-gradient-to-r from-blue-100/60 via-white to-blue-50 py-16 border-y border-blue-200" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10">🔍 Core Features</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {features.map(({emoji, title, text}) => (
              <div key={title} className="bg-white border border-blue-100 rounded-xl shadow p-6 flex flex-col items-start hover:scale-105 transition-transform duration-200">
                <span className="text-3xl mb-2">{emoji}</span>
                <h3 className="font-semibold text-lg text-blue-800 mb-2">{title}</h3>
                <p className="text-blue-700 text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 py-20 text-center" id="how-it-works">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">⚙️ How It Works</h2>
        <ol className="flex flex-col md:flex-row gap-8 justify-center mb-10">
          <li className="flex-1 min-w-[220px] bg-white shadow rounded-xl p-6 border border-blue-100">
            <div className="text-2xl font-extrabold text-blue-800 mb-2">1</div>
            <h3 className="font-semibold mb-2 text-blue-800">Create Your Free Account</h3>
            <p className="text-blue-700">Sign up in seconds. No credit card. No long forms.</p>
          </li>
          <li className="flex-1 min-w-[220px] bg-white shadow rounded-xl p-6 border border-blue-100">
            <div className="text-2xl font-extrabold text-blue-800 mb-2">2</div>
            <h3 className="font-semibold mb-2 text-blue-800">Connect Your WordPress Site</h3>
            <p className="text-blue-700">Secure connection to your media library—no need to upload or sync anything.</p>
          </li>
          <li className="flex-1 min-w-[220px] bg-white shadow rounded-xl p-6 border border-blue-100">
            <div className="text-2xl font-extrabold text-blue-800 mb-2">3</div>
            <h3 className="font-semibold mb-2 text-blue-800">Start Searching (or Asking)</h3>
            <p className="text-blue-700">Search by keyword, concept, or colour. Or ask a natural-language question and let the AI assistant do the work.</p>
          </li>
        </ol>
      </section>

      {/* PRICING */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-t border-b border-blue-200" id="pricing">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">💸 Pricing Overview</h2>
          <table className="w-full max-w-3xl mx-auto table-auto border-collapse bg-white rounded-xl shadow text-left overflow-hidden">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-6 py-3 font-semibold text-blue-900">Plan</th>
                <th className="px-6 py-3 font-semibold text-blue-900">Features</th>
                <th className="px-6 py-3 font-semibold text-blue-900">Cost</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.name} className="border-t border-blue-100 even:bg-blue-50">
                  <td className="px-6 py-4 font-bold">{plan.name}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc ml-6">
                      {plan.features.map(f => (
                        <li key={f} className="text-blue-800">{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-semibold">{plan.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap gap-4 justify-center mt-8 text-center">
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow">✅ No hidden fees</span>
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow">✅ No AI surprises—you control when (and if) AI is used</span>
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow">✅ Designed for speed, clarity, and trust</span>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="container mx-auto px-4 py-16 text-center" id="use-cases">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">🧠 Real Use Cases</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {useCases.map((u) => (
            <div key={u} className="px-6 py-5 bg-blue-50 rounded-xl shadow border border-blue-100 text-blue-800 text-lg font-medium">
              {u}
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative bg-gradient-to-tr from-blue-700 to-blue-500 py-16 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow">
            📦 One Last Thing...
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8 font-medium">
            Stop wasting hours on image hunts.<br />
            WordPress Image Search gives you control, visibility, and confidence—without the overhead.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="px-8 py-3 text-lg bg-blue-400 text-white font-bold hover:bg-blue-500 shadow-lg">
              🎯 Get Instant Access
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 text-lg border-green-500 text-green-500 hover:bg-green-50 hover:text-green-700 flex items-center gap-2">
              <a href="javascript:void(0)">
                💬 Try AI Chat (BYO API)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Always-on AI Assistant (green, as requested) */}
      <ImageAIAssistant />
    </div>
  );
};

export default Index;
