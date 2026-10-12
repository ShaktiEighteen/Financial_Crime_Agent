import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function Header({ onOpenDemoScript }) {
  return (
    <header className="border-b border-[#2c2924] bg-[#161513] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Dossier Reference */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-9 h-9 border border-[#3f3b34] bg-[#1e1c19] text-[#ece7de] font-mono text-xs font-bold shadow-sm">
            §84
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-normal text-[#faf7f2]">
                Financial Crime Graph Dossier
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-[#5c1919] bg-[#251212] text-[#e03131] font-semibold">
                Case #AML-2026-FAL
              </span>
            </div>
            <p className="text-[11px] text-[#9e988a] font-serif flex items-center gap-1.5">
              <span>WeMakeDevs &bull; Graph Hacks 2026</span>
              <span className="text-[#4e4a42]">&bull;</span>
              <span className="font-mono text-[10px] text-[#c27803]">FalkorDB Cypher Engine</span>
            </p>
          </div>
        </div>

        {/* Status & Links */}
        <div className="flex items-center gap-3">
          {/* Engine Status Tag */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 border border-[#2c2924] bg-[#1a1917] text-[11px] font-mono text-[#9e988a]">
            <span className="w-1.5 h-1.5 bg-[#2b8a3e]" />
            <span>FalkorDB:</span>
            <span className="text-[#ece7de] font-bold">In-Memory Active</span>
          </div>

          {/* GitHub Repo */}
          <a
            href="https://github.com/12jahsjahdnhjajs/financial_crime_agent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3f3b34] hover:border-[#ece7de] bg-[#1a1917] hover:bg-[#22201d] text-[#ece7de] text-xs font-mono transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Source Code</span>
          </a>
        </div>
      </div>
    </header>
  );
}

