import React from 'react';
import { Compass, Sparkles, Zap, Shield } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 text-white flex flex-col justify-between p-6">
      
      {/* Brand Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            TripMacha
          </span>
        </div>
        <span className="text-xs text-indigo-300 bg-indigo-950/50 border border-indigo-800/60 px-3 py-1.5 rounded-full font-medium">
          v1.0 (India Launch)
        </span>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto w-full text-center my-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
          The Ultimate Scraper Engine <br />
          <span className="text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
            for Indian Travel Deals
          </span>
        </h1>
        
        <p className="text-gray-400 mt-6 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
          Talk to our AI agent to extract real-time itineraries, flight matrix paths, and packaged tours straight out of the web. 
        </p>

        <button 
          onClick={onStart}
          className="mt-10 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          Initialize Workspace <Sparkles className="w-5 h-5" />
        </button>

        {/* Feature Trinites */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-20 border-t border-white/5 pt-10">
          <div className="flex flex-col items-center p-4">
            <Zap className="w-5 h-5 text-indigo-400 mb-2" />
            <h3 className="font-semibold text-sm">Playwright Scraper Array</h3>
            <p className="text-xs text-gray-500 mt-1 text-center">Bypasses unstructured site locks locally</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Sparkles className="w-5 h-5 text-fuchsia-400 mb-2" />
            <h3 className="font-semibold text-sm">Gemini Data Parsing</h3>
            <p className="text-xs text-gray-500 mt-1 text-center">Transforms chaotic raw HTML source files into clean JSON</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Shield className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="font-semibold text-sm">Affiliate Routing Hub</h3>
            <p className="text-xs text-gray-500 mt-1 text-center">Direct sandbox linking with no transaction costs</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-white/5 max-w-7xl mx-auto w-full text-xs text-gray-600">
        Built by the Squad. Free Open-Source Archetype setup.
      </footer>

    </div>
  );
}