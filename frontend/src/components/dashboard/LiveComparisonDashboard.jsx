import React from 'react';
import { RefreshCw, CheckCircle2, Navigation } from 'lucide-react';

export default function LiveComparisonTable() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Dashboard</h1>
          <p className="text-gray-500 mt-1">Live results will appear here based on your chat.</p>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
          <span className="flex h-2.5 w-2.5 relative mr-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Scrapers Active
        </div>
      </div>

      {/* Loading State / Active Scrapers (Grid Layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        
        {/* DIY Flight & Hotel Scraper Status */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[250px] text-center">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Scraping DIY Options</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Checking IndiGo, Air India, and local hotel aggregators for the lowest base fares...
          </p>
        </div>

        {/* Tour Package Scraper Status */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[250px] text-center">
          <div className="w-14 h-14 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Compiling Tour Packages</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Scanning SOTC, Thrillophilia, and local operators for bundled deals...
          </p>
        </div>

      </div>

      {/* Mock Data View: How a fetched result will look */}
      <div className="mt-4 border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          AI Top Pick (Demo Data)
        </h3>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-700 bg-fuchsia-50 px-2.5 py-1 rounded-md border border-fuchsia-100">
                Packaged Tour
              </span>
              <h4 className="text-xl font-bold text-gray-900 mt-3 group-hover:text-indigo-600 transition-colors">
                6 Days in Manali
              </h4>
              <p className="text-sm text-gray-600 mt-1.5 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-gray-400" />
                Includes Flights, 3-Star Hotel & Local Cab
              </p>
            </div>
            
            <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-2 sm:mt-0">
              <div className="text-left sm:text-right">
                <span className="text-3xl font-black text-gray-900">₹14,500</span>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-0.5">per person</p>
              </div>
              <button className="mt-0 sm:mt-3 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors">
                View Details
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}