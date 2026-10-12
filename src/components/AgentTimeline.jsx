import React from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, Check, Eye } from 'lucide-react';

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
    <div className="bg-[#161513] border border-[#2c2924] p-4 flex flex-col h-full">
      {/* Header & Controls */}
      <div className="flex items-center justify-between border-b border-[#2c2924] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
          <h2 className="text-xs font-bold text-[#faf7f2] uppercase tracking-wider font-mono">
            AGENT REASONING LOG
          </h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 bg-[#1a1917] border border-[#2c2924] p-0.5 font-mono text-xs">
          <button
            onClick={onPrevStep}
            disabled={currentStepIndex <= 0}
            className="p-1 text-[#9e988a] hover:text-[#ece7de] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            title="Previous Step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-2 py-0.5 border border-[#3f3b34] bg-[#22201d] text-[#ece7de] hover:bg-[#2c2924] text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            title={isPlaying ? 'Pause Investigation' : 'Auto-Play Investigation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#c27803]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#ece7de]" />
                <span>Auto</span>
              </>
            )}
          </button>

          <button
            onClick={onNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className="p-1 text-[#9e988a] hover:text-[#ece7de] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            title="Next Step"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-[11px] text-[#9e988a] mb-3 font-serif">
        Every deductive step is traceable to specific graph nodes and relationships:
      </p>

      {/* Step List */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep(idx)}
              className={`p-3 border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#221717] border-[#c92a2a]'
                  : isPassed
                  ? 'bg-[#1a1917] border-[#2c2924] text-[#ece7de] hover:border-[#3f3b34]'
                  : 'bg-[#141312] border-[#201e1b] text-[#656157] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 flex items-center justify-center text-[9px] font-mono font-bold ${
                    isActive
                      ? 'bg-[#c92a2a] text-[#ffffff]'
                      : isPassed
                      ? 'bg-[#22201d] text-[#c27803] border border-[#3f3b34]'
                      : 'bg-[#1a1917] text-[#656157]'
                  }`}>
                    {isPassed ? <Check className="w-3 h-3 text-[#c27803]" /> : idx + 1}
                  </div>
                  <h3 className={`text-xs font-mono font-bold ${isActive ? 'text-[#faf7f2]' : 'text-[#ece7de]'}`}>
                    {step.title}
                  </h3>
                </div>

                <span className="text-[10px] font-mono text-[#656157] shrink-0">
                  {step.timeMs}ms
                </span>
              </div>

              <p className="mt-1.5 text-xs text-[#a8a294] leading-relaxed pl-6 font-serif">
                {step.detail}
              </p>

              {/* Linked Graph Nodes Badges */}
              <div className="mt-2 pl-6 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-[#656157] font-mono">Traversed:</span>
                {step.highlightNodes.map(nodeId => (
                  <span
                    key={nodeId}
                    className={`px-1.5 py-0.5 text-[10px] font-mono border ${
                      isActive
                        ? 'bg-[#2a1313] text-[#e03131] border-[#5c1919] font-bold'
                        : 'bg-[#141312] text-[#9e988a] border-[#2c2924]'
                    }`}
                  >
                    {nodeId}
                  </span>
                ))}

                {isActive && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-mono uppercase text-[#e03131] font-bold">
                    <Eye className="w-3 h-3" />
                    <span>PINNED ON CANVAS</span>
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

