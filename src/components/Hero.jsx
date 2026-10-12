import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero({
  scenarioKey,
  onSelectScenario,
  scenarios,
  onRunInvestigation,
  isInvestigating,
  walkthroughStep,
  onWalkthroughStepChange
}) {
  const current = scenarios[scenarioKey];

  return (
    <section className="relative pt-6 pb-5">
      {/* Synthetic Dataset Disclaimer Banner */}
      <div className="mb-4 inline-flex items-center gap-2.5 px-3 py-1 border border-[#3f3b34] bg-[#1a1917] text-[#9e988a] text-[11px] font-mono">
        <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
        <span className="text-[#ece7de] font-bold">SYNTHETIC INVESTIGATION FIXTURE</span>
        <span className="text-[#4e4a42]">|</span>
        <span>Generated for WeMakeDevs Graph Hacks (FalkorDB Cypher)</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-5 border-b border-[#2c2924]">
        <div className="max-w-3xl">
          {/* Main Value Proposition in Editorial Display Serif */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#faf7f2] leading-[1.15]">
            Follow the money. <br />
            <span className="text-[#c92a2a] italic font-serif">
              Expose the network.
            </span>
          </h1>

          {/* 15-Second Explainer: Why Graph Catches What a Spreadsheet Can't */}
          <p className="mt-4 text-base sm:text-lg text-[#bfb9ad] leading-relaxed max-w-2xl font-serif">
            <strong className="text-[#faf7f2] font-semibold">Why tabular ledgers fail:</strong> Spreadsheets examine transactions in isolated rows. Criminal rings hide between rows &mdash; circular wash transfers, shared burner devices across fake identities, and multi-tiered shell chains. This agent traverses connected graph topology in memory using <span className="font-mono text-xs text-[#c27803] px-1 py-0.5 bg-[#26180a] border border-[#5a3507]">FalkorDB Cypher</span> to reveal syndicates in single-digit milliseconds.
          </p>

          {/* Asymmetric Scenario Selector Tabs */}
          <div className="mt-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#9e988a] mb-2 flex items-center gap-2">
              <span className="w-2 h-0.5 bg-[#c27803]"></span>
              <span>Select Active Dossier:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {Object.keys(scenarios).map((key, idx) => {
                const item = scenarios[key];
                const isSelected = scenarioKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => onSelectScenario(key)}
                    className={`px-3.5 py-2 text-xs font-mono transition cursor-pointer text-left border ${
                      isSelected
                        ? 'border-[#c92a2a] bg-[#251212] text-[#faf7f2] font-bold'
                        : 'border-[#2c2924] bg-[#1a1917] hover:border-[#3f3b34] text-[#9e988a] hover:text-[#ece7de]'
                    }`}
                  >
                    <span className="text-[10px] opacity-60 mr-1.5">§0{idx + 1}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Controls & 3-Step Walkthrough */}
        <div className="flex flex-col items-start lg:items-end gap-3.5 shrink-0">
          {/* Primary Action Button - Archival Stamp Trigger */}
          <button
            onClick={onRunInvestigation}
            disabled={isInvestigating}
            className={`w-full sm:w-auto px-6 py-3.5 border text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 transition cursor-pointer ${
              isInvestigating
                ? 'border-[#5a3507] bg-[#26180a] text-[#c27803] cursor-wait'
                : 'border-[#c92a2a] bg-[#c92a2a] text-[#ffffff] hover:bg-[#b02525] active:translate-y-0.5'
            }`}
          >
            {isInvestigating ? (
              <>
                <span className="inline-block w-2 h-2 bg-[#c27803] animate-ping" />
                <span>Traversing Graph Topology...</span>
              </>
            ) : (
              <>
                <span>▶ Run Sample Investigation</span>
              </>
            )}
          </button>

          {/* 3-Step Guided Walkthrough Tabs */}
          <div className="flex items-center border border-[#2c2924] bg-[#161513] p-1 text-[11px] font-mono">
            <button
              onClick={() => onWalkthroughStepChange(1)}
              className={`px-3 py-1 transition cursor-pointer flex items-center gap-1.5 ${
                walkthroughStep === 1
                  ? 'bg-[#26180a] text-[#c27803] font-bold border border-[#5a3507]'
                  : 'text-[#9e988a] hover:text-[#ece7de]'
              }`}
            >
              <span>1. Alert</span>
            </button>

            <span className="text-[#3f3b34] px-1">&rarr;</span>

            <button
              onClick={() => onWalkthroughStepChange(2)}
              className={`px-3 py-1 transition cursor-pointer flex items-center gap-1.5 ${
                walkthroughStep === 2
                  ? 'bg-[#22201d] text-[#ece7de] font-bold border border-[#3f3b34]'
                  : 'text-[#9e988a] hover:text-[#ece7de]'
              }`}
            >
              <span>2. Traversal</span>
            </button>

            <span className="text-[#3f3b34] px-1">&rarr;</span>

            <button
              onClick={() => onWalkthroughStepChange(3)}
              className={`px-3 py-1 transition cursor-pointer flex items-center gap-1.5 ${
                walkthroughStep === 3
                  ? 'bg-[#251212] text-[#e03131] font-bold border border-[#5c1919]'
                  : 'text-[#9e988a] hover:text-[#ece7de]'
              }`}
            >
              <span>3. SAR Verdict</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

