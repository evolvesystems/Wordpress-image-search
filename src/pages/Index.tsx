
import React from 'react';
import { Button } from "@/components/ui/button";
import ImageAIAssistant from '@/components/ImageAIAssistant';
import { ArrowDown } from "lucide-react";

// HERO IMAGE: Unsplash with blue tone overlay
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1600&q=80";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 via-blue-50 to-white relative font-sans">
      {/* HERO SECTION */}
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

      {/* WHY IT MATTERS */}
      <section className="relative container mx-auto px-4 py-16 text-center">
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-400/40 via-blue-200/30 to-blue-50/0" />
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 tracking-tight">💡 Why It Matters</h2>
        <p className="mb-6 text-blue-800 text-lg max-w-3xl mx-auto">
          Your WordPress media library wasn’t built for humans.<br />
          It’s clunky. It's chaotic. And it’s growing every time someone uploads another version of <span className="inline font-mono text-blue-600 px-2 py-1 bg-blue-100 rounded">logo-final-FINAL2.png</span>.
        </p>
        <p className="text-blue-700 text-base max-w-2xl mx-auto mb-3">
          You shouldn’t need detective work to find an image—or figure out where it’s used.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-10">
          <div className="bg-white rounded-2xl px-8 py-7 border-2 border-blue-100 shadow-sm flex-1 min-w-[260px]">
            <h3 className="font-bold text-blue-800 text-xl mb-3 tracking-tight">
              WordPress Image Search gives you:
            </h3>
            <ul className="text-left text-blue-700 text-base space-y-1 md:space-y-0">
              <li><span className="mr-1 font-medium">•</span>Instant visual search across your entire media library</li>
              <li><span className="mr-1 font-medium">•</span>Usage insights: know exactly where every image appears</li>
              <li><span className="mr-1 font-medium">•</span>AI-powered search assistant (just add your API key)</li>
              <li><span className="mr-1 font-medium">•</span>Zero syncing. Zero setup headaches.</li>
              <li><span className="mr-1 font-medium">•</span>No plugins bloating your site. No imports. Just insight.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full bg-gradient-to-r from-blue-100/60 via-white to-blue-50 py-16 border-y border-blue-200" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-tight">🔍 Core Features</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {features.map(({emoji, title, text}) => (
              <div
                key={title}
                className="bg-white border border-blue-100 rounded-xl shadow-md p-6 flex flex-col items-start hover:scale-105 transition-transform duration-150 hover:shadow-xl"
                style={{ minHeight: 210 }}
              >
                <span className="text-4xl mb-2">{emoji}</span>
                <h3 className="font-semibold text-xl text-blue-800 mb-2">{title}</h3>
                <p className="text-blue-700 text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 py-20 text-center" id="how-it-works">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 tracking-tight">⚙️ How It Works</h2>
        <ol className="flex flex-col md:flex-row gap-8 justify-center mb-10">
          {[
            {
              num: 1,
              title: "Create Your Free Account",
              desc: "Sign up in seconds. No credit card. No long forms."
            },
            {
              num: 2,
              title: "Connect Your WordPress Site",
              desc: "Secure connection to your media library—no need to upload or sync anything."
            },
            {
              num: 3,
              title: "Start Searching (or Asking)",
              desc: "Search by keyword, concept, or colour. Or ask a natural-language question and let the AI assistant do the work."
            }
          ].map(step => (
            <li key={step.title} className="flex-1 min-w-[220px] bg-white shadow rounded-xl p-6 border border-blue-100">
              <div className="text-3xl font-extrabold text-blue-800 mb-3">{step.num}</div>
              <h3 className="font-semibold mb-2 text-blue-800 text-lg">{step.title}</h3>
              <p className="text-blue-700 text-base">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PRICING */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-t border-b border-blue-200" id="pricing">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 tracking-tight">💸 Pricing Overview</h2>
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
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 tracking-tight">🧠 Real Use Cases</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {useCases.map((u) => (
            <div key={u} className="px-6 py-5 bg-blue-50 rounded-xl shadow border border-blue-100 text-blue-800 text-lg font-medium">
              {u}
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
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

      {/* Floating AI Chat Assistant Button (already green and stylized) */}
      <ImageAIAssistant />
    </div>
  );
};

export default Index;

