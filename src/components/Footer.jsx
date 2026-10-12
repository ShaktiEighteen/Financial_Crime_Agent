import React from 'react';
import { Github, ExternalLink, Terminal } from 'lucide-react';

export default function Footer({ onOpenDemoScript }) {
  return (
    <footer className="mt-12 border-t border-[#2c2924] bg-[#161513] text-[#9e988a] py-8 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Hackathon Credits */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c27803]" />
              <span className="font-bold text-[#faf7f2]">FINANCIAL CRIME GRAPH AGENT</span>
            </div>
            <span className="hidden sm:inline text-[#3f3b34]">|</span>
            <span className="text-[#9e988a] font-serif text-[11px]">
              Crafted for <strong className="text-[#ece7de] font-mono">Graph Hacks 2026</strong> &bull; WeMakeDevs &amp; FalkorDB
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="https://willowy-scone-a14bd5.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c27803] hover:text-[#e09119] flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Deployment</span>
            </a>

            <button
              onClick={onOpenDemoScript}
              className="text-[#ece7de] hover:text-[#faf7f2] flex items-center gap-1.5 transition cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Judge Demo Script</span>
            </button>

            <a
              href="https://github.com/12jahsjahdnhjajs/financial_crime_agent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#faf7f2] flex items-center gap-1.5 transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://falkordb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#faf7f2] flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>FalkorDB</span>
            </a>
          </div>
        </div>

        {/* Bottom Compliance & Disclaimer Strip */}
        <div className="mt-6 pt-5 border-t border-[#23211d] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#656157] text-center sm:text-left font-serif">
          <p>
            Disclaimer: All entities, account identifiers, device fingerprints, and wire sums are synthetic demonstration fixtures. Not for live financial production without compliance certification.
          </p>
          <div className="font-mono text-[10px] text-[#4e4a42]">
            DOCKET // AML-2026-FAL-09
          </div>
        </div>
      </div>
    </footer>
  );
}

