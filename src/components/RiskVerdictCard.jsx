import React, { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

export default function RiskVerdictCard({ scenario }) {
  const [showSarModal, setShowSarModal] = useState(false);
  const [analystApproved, setAnalystApproved] = useState(false);
  const [copiedSar, setCopiedSar] = useState(false);

  const handleAnalystSignoff = () => {
    setAnalystApproved(!analystApproved);
  };

  const handleCopySar = () => {
    const sar = scenario.sarReport;
    const text = `UNITED STATES DEPARTMENT OF THE TREASURY
FINANCIAL CRIMES ENFORCEMENT NETWORK (FinCEN)
SUSPICIOUS ACTIVITY REPORT (SAR) DRAFT EXHIBIT

FILING ID: ${sar.filingId}
PRIORITY: ${sar.priority}
SUSPECT ENTITIES: ${sar.suspectEntities.join(', ')}
TOTAL VOLUME: ${sar.totalAmountUSD}
TIMEFRAME: ${sar.timeframe}

INVESTIGATIVE SUMMARY & TOPOLOGY EVIDENCE:
${sar.narrative}

---
DISCLOSURE: Generated via Financial Crime Agent (WeMakeDevs Graph Hacks 2026).
ANALYST VERIFICATION STATUS: ${analystApproved ? 'APPROVED & SIGNED FOR SUBMISSION' : 'PENDING COMPLIANCE OFFICER SIGN-OFF'}
`;
    navigator.clipboard.writeText(text);
    setCopiedSar(true);
    setTimeout(() => setCopiedSar(false), 2000);
  };

  return (
    <div className="bg-[#161513] border border-[#2c2924] p-4 flex flex-col justify-between">
      <div>
        {/* Header & Risk Score Badge */}
        <div className="flex items-start justify-between gap-4 border-b border-[#2c2924] pb-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c92a2a]"></span>
              <h2 className="text-xs font-bold text-[#faf7f2] uppercase tracking-wider font-mono">
                RISK VERDICT &amp; ASSESSMENT
              </h2>
            </div>
            <p className="text-[11px] text-[#9e988a] mt-0.5 font-serif">
              Graph topology inference &amp; statutory compliance evaluation
            </p>
          </div>

          {/* Stamped Risk Score Indicator */}
          <div className="border border-[#5c1919] bg-[#251212] px-3 py-1.5 text-right font-mono">
            <div className="text-[9px] uppercase text-[#e03131] font-bold tracking-wider">
              RISK INDEX
            </div>
            <div className="text-xl font-bold text-[#faf7f2] leading-none mt-0.5">
              {scenario.riskScore}<span className="text-xs text-[#9e988a] font-normal"> / 100</span>
            </div>
          </div>
        </div>

        {/* Stamped Verdict & Plain-English Summary */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#251212] border border-[#5c1919] text-[#e03131] text-[11px] font-mono font-bold mb-2">
            <span>[VERDICT: {scenario.verdict}]</span>
          </div>

          <p className="text-xs text-[#dcd6ca] leading-relaxed bg-[#1a1917] p-3 border border-[#2c2924] font-serif">
            {scenario.verdictSummary}
          </p>
        </div>

        {/* Contributing Risk Signals Breakdown */}
        <div className="space-y-2 mb-4 font-mono">
          <div className="text-[10px] font-bold text-[#9e988a] uppercase tracking-wider">
            Contributing Graph Signals:
          </div>
          {scenario.signals.map((sig, idx) => (
            <div key={idx} className="bg-[#1a1917] p-2.5 border border-[#2c2924]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#faf7f2] text-[11px]">{sig.name}</span>
                <span className="text-[#e03131] font-bold text-[11px]">
                  +{sig.score} <span className="text-[#656157] text-[10px]">/ {sig.max}</span>
                </span>
              </div>
              <p className="text-[10px] text-[#9e988a] font-serif leading-normal">{sig.desc}</p>
              <div className="mt-1.5 w-full bg-[#121110] h-1 border border-[#2c2924] overflow-hidden">
                <div
                  className="bg-[#c92a2a] h-full"
                  style={{ width: `${(sig.score / sig.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human-in-the-Loop Analyst Verification & SAR Action Strip */}
      <div className="pt-3 border-t border-[#2c2924] space-y-2.5">
        {/* Human Analyst Final Decision Stamp */}
        <div className="p-2.5 border border-[#2c2924] bg-[#1a1917] flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-mono text-[11px] font-bold text-[#faf7f2]">
              Human Analyst Sign-Off
            </div>
            <div className="text-[10px] text-[#9e988a] font-serif">
              Agent surfaces topological evidence &mdash; filing requires human authorization
            </div>
          </div>

          <button
            onClick={handleAnalystSignoff}
            className={`px-3 py-1.5 text-xs font-mono font-bold transition cursor-pointer border ${
              analystApproved
                ? 'bg-[#1b2619] text-[#2b8a3e] border-[#2b8a3e]'
                : 'bg-[#22201d] hover:bg-[#2c2924] text-[#ece7de] border-[#3f3b34]'
            }`}
          >
            {analystApproved ? '✓ VERIFIED & SIGNED' : 'AUTHORIZE DRAFT'}
          </button>
        </div>

        {/* View / Download SAR Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSarModal(true)}
            className="flex-1 px-3 py-2 border border-[#3f3b34] bg-[#22201d] hover:bg-[#2c2924] text-[#ece7de] text-xs font-mono font-medium flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open FinCEN Draft SAR Report</span>
          </button>

          <button
            onClick={handleCopySar}
            className="px-3 py-2 border border-[#3f3b34] bg-[#1a1917] hover:bg-[#22201d] text-[#9e988a] hover:text-[#ece7de] text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
            title="Copy SAR Text"
          >
            {copiedSar ? <Check className="w-3.5 h-3.5 text-[#2b8a3e]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSar ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Modal / Flyout for Full Draft SAR */}
      {showSarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="bg-[#161513] border border-[#3f3b34] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#2c2924] flex items-center justify-between bg-[#1a1917]">
              <div>
                <h3 className="text-sm font-bold text-[#faf7f2] font-mono">
                  FinCEN Form 111 &mdash; Suspicious Activity Report (Draft Docket)
                </h3>
                <p className="text-[11px] text-[#9e988a] font-serif">
                  Auto-assembled from FalkorDB graph topology evidence trail
                </p>
              </div>

              <button
                onClick={() => setShowSarModal(false)}
                className="text-[#9e988a] hover:text-[#ece7de] px-2 py-1 border border-[#2c2924] font-mono text-xs transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono text-[#dcd6ca]">
              <div className="grid grid-cols-2 gap-3 bg-[#121110] p-3 border border-[#2c2924]">
                <div>
                  <span className="text-[#656157]">FILING DOCKET:</span>
                  <div className="text-[#faf7f2] font-bold">{scenario.sarReport.filingId}</div>
                </div>
                <div>
                  <span className="text-[#656157]">PRIORITY LEVEL:</span>
                  <div className="text-[#e03131] font-bold">{scenario.sarReport.priority}</div>
                </div>
                <div>
                  <span className="text-[#656157]">TOTAL VOLUME:</span>
                  <div className="text-[#c27803] font-bold">{scenario.sarReport.totalAmountUSD}</div>
                </div>
                <div>
                  <span className="text-[#656157]">OBSERVATION WINDOW:</span>
                  <div className="text-[#ece7de]">{scenario.sarReport.timeframe}</div>
                </div>
              </div>

              <div>
                <span className="text-[#9e988a] font-bold uppercase text-[10px]">Primary Suspect Entities:</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {scenario.sarReport.suspectEntities.map((ent, i) => (
                    <span key={i} className="px-2 py-0.5 border border-[#2c2924] bg-[#1a1917] text-[#faf7f2] text-[10px]">
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#9e988a] font-bold uppercase text-[10px]">Shared Telemetry &amp; Non-Relational Keys:</span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {scenario.sarReport.sharedIdentifiers.map((id, i) => (
                    <span key={i} className="px-2 py-0.5 border border-[#5a3507] bg-[#26180a] text-[#c27803] text-[10px]">
                      {id}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#9e988a] font-bold uppercase text-[10px]">Investigative Narrative:</span>
                <div className="mt-1.5 p-3.5 bg-[#121110] border border-[#2c2924] leading-relaxed text-[#ece7de] font-serif text-xs">
                  {scenario.sarReport.narrative}
                </div>
              </div>

              <div className="p-3 border border-[#3f3b34] bg-[#1a1917] text-[#9e988a] text-[11px] font-serif">
                <strong className="text-[#ece7de]">Statutory Notice:</strong> This exhibit draft has been cross-referenced against OFAC Specially Designated Nationals lists and currency transaction reporting thresholds (31 U.S.C. 5318(g)). Formal regulatory transmission requires designated human compliance officer sign-off.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#2c2924] bg-[#1a1917] flex items-center justify-between">
              <div className="text-[11px] text-[#9e988a] font-mono">
                Status: {analystApproved ? '✓ Signed by Compliance Officer' : 'Pending Formal Sign-off'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySar}
                  className="px-3 py-1.5 border border-[#2c2924] bg-[#161513] hover:bg-[#22201d] text-[#ece7de] text-xs font-mono transition cursor-pointer"
                >
                  {copiedSar ? 'Copied ✓' : 'Copy Text'}
                </button>
                <button
                  onClick={() => setShowSarModal(false)}
                  className="px-4 py-1.5 border border-[#c92a2a] bg-[#c92a2a] text-[#ffffff] text-xs font-mono font-bold transition cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

