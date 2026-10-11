import React from 'react';
import { Play, RotateCcw, AlertTriangle, Layers, Shuffle, Sparkles, ArrowRight, ShieldCheck, Database } from 'lucide-react';

export default function Hero({
  scenarioKey,
  onSelectScenario,
  scenarios,
  onRunInvestigation,
  isInvestigating,
  walkthroughStep, // 1: Alert, 2: Investigating, 3: Verdict
  onWalkthroughStepChange
}) {
  const current = scenarios[scenarioKey];

  return (
    <section className="relative pt-6 pb-4">
      {/* Synthetic Dataset Disclaimer Banner */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        <span>SYNTHETIC DEMO DATASET</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Generated for WeMakeDevs Graph Hacks Hackathon</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-slate-800/80">
        <div className="max-w-3xl">
          {/* Main Value Proposition */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Follow the money. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Expose the network.
            </span>
          </h1>

          {/* 15-Second Explainer: Why Graph Catches What a Spreadsheet Can't */}
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            <span className="font-semibold text-white">Why a spreadsheet fails:</span> Relational tables view transactions in isolated rows. Criminal rings hide in multi-hop loops, shared devices, and nested shell companies. Our AI agent reasons over connected graph topology with <span className="text-cyan-300 font-mono">FalkorDB Cypher</span> to uncover illicit syndicates in milliseconds.
          </p>

          {/* Scenario Selector Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Select Investigation Scenario:
            </span>
            {Object.keys(scenarios).map((key) => {
              const item = scenarios[key];
              const isSelected = scenarioKey === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectScenario(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {key === 'fraud_ring' && <Shuffle className="w-3.5 h-3.5 text-blue-400" />}
                  {key === 'shell_company' && <Layers className="w-3.5 h-3.5 text-purple-400" />}
                  {key === 'structuring' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Controls & 3-Step Walkthrough */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
          {/* Primary Action Button */}
          <button
            onClick={onRunInvestigation}
            disabled={isInvestigating}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition shadow-xl cursor-pointer ${
              isInvestigating
                ? 'bg-cyan-700/50 text-cyan-200 border border-cyan-500/40 cursor-wait'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 hover:shadow-cyan-500/25 border border-cyan-300/40'
            }`}
          >
            {isInvestigating ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Agent Investigating Graph...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Run Sample Investigation</span>
              </>
            )}
          </button>

          {/* 3-Step Guided Walkthrough Pills */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg text-[11px]">
            <button
              onClick={() => onWalkthroughStepChange(1)}
              className={`px-2.5 py-1 rounded font-medium transition cursor-pointer flex items-center gap-1 ${
                walkthroughStep === 1
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold">1</span>
              <span>Trigger Alert</span>
            </button>

            <ArrowRight className="w-3 h-3 text-slate-600" />

            <button
              onClick={() => onWalkthroughStepChange(2)}
              className={`px-2.5 py-1 rounded font-medium transition cursor-pointer flex items-center gap-1 ${
                walkthroughStep === 2
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold">2</span>
              <span>Agent Traversal</span>
            </button>

            <ArrowRight className="w-3 h-3 text-slate-600" />

            <button
              onClick={() => onWalkthroughStepChange(3)}
              className={`px-2.5 py-1 rounded font-medium transition cursor-pointer flex items-center gap-1 ${
                walkthroughStep === 3
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold">3</span>
              <span>Verdict & SAR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
