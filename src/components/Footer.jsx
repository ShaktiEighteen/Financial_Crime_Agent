import React, { useState } from 'react';
import { Github, ExternalLink, Shield, Terminal, Award, BookOpen, Video, Heart } from 'lucide-react';

export default function Footer({ onOpenDemoScript }) {
  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-[#090d16] text-slate-400 py-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Hackathon Credits */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-bold text-white font-mono">FINANCIAL_CRIME_AGENT</span>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-slate-400">
              Built for <strong className="text-cyan-300 font-medium">Graph Hacks 2026</strong> by <span className="text-white">WeMakeDevs</span> &amp; <span className="text-white font-medium">FalkorDB</span>
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <a
              href="https://willowy-scone-a14bd5.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </a>

            <button
              onClick={onOpenDemoScript}
              className="hover:text-cyan-400 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>2-Minute Pitch Script</span>
            </button>

            <a
              href="https://github.com/12jahsjahdnhjajs/financial_crime_agent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1.5 transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>

            <a
              href="https://wemakedevs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1.5 transition"
            >
              <Award className="w-3.5 h-3.5" />
              <span>WeMakeDevs</span>
            </a>

            <a
              href="https://falkordb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>FalkorDB Docs</span>
            </a>
          </div>
        </div>

        {/* Bottom Compliance & Disclaimer Strip */}
        <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <p>
            Disclaimer: All entities, accounts, device serials, and transactions in this application are synthetic simulations designed strictly for hackathon demonstration.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Graph Intelligence for Financial Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
