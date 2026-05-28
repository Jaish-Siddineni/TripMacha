import React from 'react';
import ChatSidebar from '../components/Chat/ChatSidebar';
import LiveComparisonDashboard from '../components/Dashboard/LiveComparisonDashboard';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function HybridPlanner() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden font-sans select-none">
      
      {/* 1. Customer Context Header */}
      {/* This gives non-tech users an immediate understanding of the step-by-step workflow */}
      <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900 tracking-tight text-sm">TripMacha Workspace</span>
        </div>

        {/* Simplified User Guide Path */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50/70 px-2.5 py-1 rounded-md">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">1</span>
            <span>Tell AI Your Plan</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-300" />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-[10px]">2</span>
            <span>Watch Live Scrapers Search</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-300" />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-[10px]">3</span>
            <span>Book Directly & Save</span>
          </div>
        </div>

        {/* Security / Quality Trust Badge */}
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <Sparkles className="w-3 h-3 text-emerald-500" /> Live Matrix Active
        </div>
      </header>

      {/* 2. Main Workspace Split-Pane */}
      <div className="flex flex-1 w-full overflow-hidden relative">
        
        {/* Left Pane: Chat Co-Pilot (Fixed boundaries to ensure it never cramps the screen) */}
        <aside className="w-1/3 min-w-[360px] max-w-[440px] bg-white flex flex-col relative z-10 border-r border-gray-100 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
          <ChatSidebar />
        </aside>

        {/* Right Pane: Dynamic GUI Dashboard (Slight subtle background contrast makes data cards stand out) */}
        <main className="flex-1 h-full overflow-y-auto bg-[#f8fafc] p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <LiveComparisonDashboard />
          </div>
        </main>

      </div>

    </div>
  );
}