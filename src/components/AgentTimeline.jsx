import React from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, CheckCircle2, Search, ArrowRight, Eye, Sparkles } from 'lucide-react';

export default function AgentTimeline({
  steps,
  currentStepIndex,
  onSelectStep,
  isPlaying,
  onTogglePlay,
  onNextStep,
  onPrevStep
}) {
  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-4 shadow-xl flex flex-col h-full">
      {/* Header & Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Agent Reasoning Timeline
          </h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={onPrevStep}
            disabled={currentStepIndex <= 0}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-medium flex items-center gap-1 transition"
            title={isPlaying ? 'Pause Investigation' : 'Auto-Play Investigation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="text-[11px]">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-cyan-300" />
                <span className="text-[11px]">Auto</span>
              </>
            )}
          </button>

          <button
            onClick={onNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Every agent conclusion links directly to verified graph topology nodes:
      </p>

      {/* Step List */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep(idx)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : isPassed
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/40'
                      : isPassed
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <h3 className={`text-xs font-semibold ${isActive ? 'text-cyan-200' : 'text-slate-200'}`}>
                    {step.title}
                  </h3>
                </div>

                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                  {step.timeMs}ms
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed pl-7">
                {step.detail}
              </p>

              {/* Linked Graph Nodes Badges */}
              <div className="mt-2.5 pl-7 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-medium">Nodes Traversed:</span>
                {step.highlightNodes.map(nodeId => (
                  <span
                    key={nodeId}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {nodeId}
                  </span>
                ))}

                {isActive && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-cyan-400 font-semibold animate-pulse">
                    <Eye className="w-3 h-3" />
                    <span>Highlighted on Canvas</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
