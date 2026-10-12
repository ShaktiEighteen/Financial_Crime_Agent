import React from 'react';
import { X, Clock, Copy, Check } from 'lucide-react';

export default function DemoScriptModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const scriptSections = [
    {
      time: '0:00 - 0:15',
      heading: 'The Hook: The Tabular Blindspot',
      dialogue: `"Judges, traditional compliance systems inspect transactions row by row in relational tables. To an isolated ledger, a $48,000 transfer between checking accounts looks completely ordinary. But financial crime syndicates don't hide in rows—they hide in graph topology. That is why we built Financial Crime Agent using FalkorDB."`,
      action: 'Show the Hero value proposition and click "Run Sample Investigation" on Case #01 (Mule Fraud Ring).'
    },
    {
      time: '0:15 - 0:45',
      heading: 'The Centerpiece: Graph Topology & Hardware Collisions',
      dialogue: `"Look at our interactive graph centerpiece. An alert flagged Account ACC-101. When our agent walks the graph, it discovers five separate accounts—Alex, Jordan, Taylor, Sam, and Morgan—all authenticating through the exact same physical iPhone hardware ID (DEV-9842). In isolated database rows, this collision is completely invisible."`,
      action: 'Hover over DEV-9842 and click ACC-101 to open the entity dossier drawer.'
    },
    {
      time: '0:45 - 1:15',
      heading: 'Observability: FalkorDB Cypher vs 7-Table Relational SQL',
      dialogue: `"Why FalkorDB? In our Observability panel, look at the difference. With FalkorDB Cypher, this 5-hop circular wash detection requires one 5-line openCypher query executing in 8.4 milliseconds. In relational SQL, that exact same question requires six recursive self-joins, multiple Common Table Expressions, table locks, and 1,420 milliseconds of latency."`,
      action: 'Toggle between FalkorDB Cypher and Relational SQL in the Observability Panel.'
    },
    {
      time: '1:15 - 1:45',
      heading: 'Traceable Deductions: The Reasoning Log',
      dialogue: `"Judges often ask: how can a compliance officer trust an agent? Notice our live Reasoning Log. Every deduction links directly to verifiable graph nodes. Clicking step 3 immediately zooms into the device collision; clicking step 4 reveals the closed loop returning $240,000 to the source while skimming a fee to an offshore gateway."`,
      action: 'Step through the Reasoning Log; show active evidence highlighted on the graph while background noise dims.'
    },
    {
      time: '1:45 - 2:00',
      heading: 'The Verdict & SAR: Regulatory Compliance Ready',
      dialogue: `"Finally, the agent calculates a risk score of 95/100 and drafts a FinCEN Suspicious Activity Report with precise evidence references. Crucially, we enforce Human-in-the-Loop compliance—the compliance officer inspects the evidence and signs off before transmission. This shrinks investigation triage from 4.8 hours to 1.2 seconds."`,
      action: 'Open the FinCEN Draft SAR Report and click Authorize Draft.'
    }
  ];

  const handleCopyFullScript = () => {
    const fullText = scriptSections.map(s => `[${s.time}] ${s.heading}\nWHAT TO SAY:\n${s.dialogue}\nWHAT TO DO ON SCREEN:\n${s.action}\n`).join('\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
      <div className="bg-[#161513] border border-[#3f3b34] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="p-4 border-b border-[#2c2924] bg-[#1a1917] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#faf7f2]">
              2-Minute Presentation Script (WeMakeDevs Hackathon Judges)
            </h3>
            <p className="text-[11px] text-[#9e988a] font-serif">
              Structured walkthrough designed to convey core value under 120 seconds
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#9e988a] hover:text-[#ece7de] px-2 py-1 border border-[#2c2924] text-xs transition cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Script Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs">
          {scriptSections.map((sec, i) => (
            <div key={i} className="bg-[#121110] p-4 border border-[#2c2924] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#faf7f2] flex items-center gap-2">
                  <span className="w-4 h-4 bg-[#26180a] text-[#c27803] border border-[#5a3507] flex items-center justify-center text-[10px]">
                    §{i + 1}
                  </span>
                  {sec.heading}
                </span>
                <span className="px-2 py-0.5 border border-[#2c2924] bg-[#1a1917] text-[10px] text-[#c27803] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {sec.time}
                </span>
              </div>

              <div className="p-3 bg-[#1a1917] border border-[#2c2924] text-[#dcd6ca] leading-relaxed font-serif text-[11px]">
                {sec.dialogue}
              </div>

              <div className="text-[10px] text-[#9e988a] flex items-center gap-1.5 pl-1 font-mono">
                <span className="text-[#c27803] font-bold">ON SCREEN:</span>
                <span>{sec.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2c2924] bg-[#1a1917] flex items-center justify-between">
          <span className="text-[11px] text-[#656157]">
            Pacing: 1m 50s Presentation + 10s Q&amp;A
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFullScript}
              className="px-3 py-1.5 border border-[#2c2924] bg-[#161513] hover:bg-[#22201d] text-[#ece7de] text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2b8a3e]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied ✓' : 'Copy Script'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-[#c92a2a] bg-[#c92a2a] text-[#ffffff] text-xs font-bold transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

