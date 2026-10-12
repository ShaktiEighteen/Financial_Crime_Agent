import React from 'react';

export default function ImpactStrip({ metrics, scenario }) {
  if (!metrics) return null;

  return (
    <div className="my-4 border border-[#2c2924] bg-[#161513]">
      {/* Ledger Header Line */}
      <div className="px-4 py-1.5 border-b border-[#2c2924] bg-[#1a1917] flex items-center justify-between text-[11px] font-mono text-[#9e988a]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
          <span className="font-bold text-[#ece7de]">CASE AUDIT LEDGER</span>
          <span className="text-[#3f3b34]">|</span>
          <span>COMPUTED IN-MEMORY METRICS</span>
        </div>
        <span className="text-[10px] text-[#656157]">FAL-MEM-VERIFIED // SINGLE SCENARIO</span>
      </div>

      {/* Asymmetric Ruled Ledger Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#2c2924]">
        {/* Metric 1 */}
        <div className="p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#9e988a] block tracking-wider">
            Entities in Subgraph
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#faf7f2]">
              {metrics.accountsAnalyzed}
            </span>
            <span className="text-xs font-mono text-[#9e988a]">nodes</span>
          </div>
          <span className="text-[10px] font-serif text-[#656157] mt-1">
            Accounts, devices &amp; entities loaded
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#9e988a] block tracking-wider">
            Hidden Network Links
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#c27803]">
              {metrics.hiddenLinksFound}
            </span>
            <span className="text-xs font-mono text-[#9e988a]">edges</span>
          </div>
          <span className="text-[10px] font-serif text-[#656157] mt-1">
            Hardware collisions &amp; wash loops
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-[#9e988a] block tracking-wider">
            Agent Query Latency
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#faf7f2]">
              {metrics.agentTimeSeconds}s
            </span>
            <span className="text-xs font-mono text-[#9e988a]">runtime</span>
          </div>
          <span className="text-[10px] font-serif text-[#656157] mt-1">
            vs {metrics.manualTimeHours}h manual spreadsheet triage
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-3.5 flex flex-col justify-between bg-[#191515]">
          <span className="text-[10px] font-mono uppercase text-[#e03131] block tracking-wider font-semibold">
            Flagged Conspirators
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#e03131]">
              {scenario?.sarReport?.suspectEntities?.length || 5}
            </span>
            <span className="text-xs font-mono text-[#e03131]">suspects</span>
          </div>
          <span className="text-[10px] font-serif text-[#9e988a] mt-1">
            Cross-linked by device &amp; fund trails
          </span>
        </div>
      </div>
    </div>
  );
}

