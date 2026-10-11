import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle2, FileText, Download, UserCheck, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RiskVerdictCard({ scenario }) {
  const [showSarModal, setShowSarModal] = useState(false);
  const [analystApproved, setAnalystApproved] = useState(false);
  const [copiedSar, setCopiedSar] = useState(false);

  const handleAnalystSignoff = () => {
    const nextState = !analystApproved;
    setAnalystApproved(nextState);
    if (nextState) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#10b981', '#3b82f6']
      });
    }
  };

  const handleCopySar = () => {
    const sar = scenario.sarReport;
    const text = `SUSPICIOUS ACTIVITY REPORT (SAR) DRAFT
FILING ID: ${sar.filingId}
PRIORITY: ${sar.priority}
SUSPECT ENTITIES: ${sar.suspectEntities.join(', ')}
TOTAL AMOUNT: ${sar.totalAmountUSD}
TIMEFRAME: ${sar.timeframe}

NARRATIVE SUMMARY:
${sar.narrative}

---
FILED VIA: Financial Crime Agent (Graph Hacks 2026)
ANALYST SIGNOFF STATUS: ${analystApproved ? 'APPROVED & SIGNED' : 'PENDING HUMAN REVIEW'}
`;
    navigator.clipboard.writeText(text);
    setCopiedSar(true);
    setTimeout(() => setCopiedSar(false), 2000);
  };

  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
      <div>
        {/* Header & Risk Score Badge */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                Risk Verdict & Assessment
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated graph synthesis & regulatory compliance triage
            </p>
          </div>

          {/* Big Risk Score Gauge */}
          <div className="flex items-center gap-3 bg-red-950/40 border border-red-500/40 px-3.5 py-2 rounded-xl shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-red-300 font-semibold tracking-wider">
                Risk Index
              </div>
              <div className="text-2xl font-black font-mono text-red-400 leading-none mt-0.5">
                {scenario.riskScore}<span className="text-xs text-red-500 font-normal">/100</span>
              </div>
            </div>
            <div className="w-3 h-8 bg-gradient-to-t from-red-600 to-amber-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Verdict Badge & Plain-English Summary */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono font-bold mb-2">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>VERDICT: {scenario.verdict}</span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            {scenario.verdictSummary}
          </p>
        </div>

        {/* Contributing Risk Signals Breakdown */}
        <div className="space-y-2.5 mb-5">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Contributing Graph Signals:
          </div>
          {scenario.signals.map((sig, idx) => (
            <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-slate-200">{sig.name}</span>
                <span className="font-mono text-red-400 font-bold">
                  +{sig.score} <span className="text-slate-600 text-[10px]">/ {sig.max}</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{sig.desc}</p>
              <div className="mt-1.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full"
                  style={{ width: `${(sig.score / sig.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human-in-the-Loop Analyst Verification & SAR Action Strip */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        {/* Human Analyst Final Decision Banner */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <UserCheck className={`w-4 h-4 ${analystApproved ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div>
              <div className="font-semibold text-slate-200">
                Human Analyst Sign-off
              </div>
              <div className="text-[10px] text-slate-400">
                AI flags signals &mdash; final SAR filing requires human review
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalystSignoff}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition cursor-pointer ${
              analystApproved
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            {analystApproved ? 'Approved ✓' : 'Click to Sign'}
          </button>
        </div>

        {/* View / Download SAR Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSarModal(true)}
            className="flex-1 px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Open FinCEN Draft SAR Report</span>
          </button>

          <button
            onClick={handleCopySar}
            className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Copy SAR Text"
          >
            {copiedSar ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedSar ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Modal / Flyout for Full Draft SAR */}
      {showSarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#090e1a] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">
                    FinCEN Form 111 &mdash; Suspicious Activity Report (SAR)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Auto-generated from FalkorDB graph evidence &amp; multi-hop trail
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSarModal(false)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded text-sm transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono text-slate-300">
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500">FILING ID:</span>
                  <div className="text-cyan-300 font-bold">{scenario.sarReport.filingId}</div>
                </div>
                <div>
                  <span className="text-slate-500">PRIORITY LEVEL:</span>
                  <div className="text-red-400 font-bold">{scenario.sarReport.priority}</div>
                </div>
                <div>
                  <span className="text-slate-500">TOTAL VOLUME:</span>
                  <div className="text-emerald-400 font-bold">{scenario.sarReport.totalAmountUSD}</div>
                </div>
                <div>
                  <span className="text-slate-500">TIMEFRAME:</span>
                  <div className="text-slate-200">{scenario.sarReport.timeframe}</div>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase text-[11px]">Primary Suspect Entities:</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {scenario.sarReport.suspectEntities.map((ent, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-[11px]">
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase text-[11px]">Shared Telemetry &amp; Nodes:</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {scenario.sarReport.sharedIdentifiers.map((id, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px]">
                      {id}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase text-[11px]">Investigative Narrative:</span>
                <div className="mt-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800 leading-relaxed text-slate-200 font-sans text-xs">
                  {scenario.sarReport.narrative}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 text-[11px] font-sans">
                <strong>Compliance Note:</strong> This report draft has been cross-referenced against OFAC lists, PEP databases, and CTR thresholds. Final regulatory transmission requires human analyst authorization.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-mono">
                Status: {analystApproved ? 'Signed by Analyst' : 'Pending Sign-off'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySar}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
                >
                  {copiedSar ? 'Copied ✓' : 'Copy Text'}
                </button>
                <button
                  onClick={() => setShowSarModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
