import React from 'react';
import { X, Clock, Terminal, CheckCircle2, Copy, Check } from 'lucide-react';

export default function DemoScriptModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const scriptSections = [
    {
      time: '0:00 - 0:15',
      heading: 'The Hook: The Spreadsheet Blindspot',
      dialogue: `"Judges, traditional anti-money laundering tools look at spreadsheets. In a spreadsheet, an account transferring $48,000 looks like an ordinary, isolated transaction. But criminal syndicates don't operate in rows—they operate in graphs. Today, we built Financial Crime Agent powered by FalkorDB."`,
      action: 'Show the Hero value prop banner and click "Run Sample Investigation" on the Mule Fraud Ring scenario.'
    },
    {
      time: '0:15 - 0:45',
      heading: 'The Centerpiece: Graph Topology & Device Collision',
      dialogue: `"Notice our interactive graph canvas. Traditional rules flagged Account ACC-101. But look what happens when the agent traverses the graph: all 5 accounts (Alex, Jordan, Taylor, Sam, Morgan) authenticate from the identical physical iPhone 15 Pro hardware ID (DEV-9842). In isolated database rows, you would never see this collision."`,
      action: 'Hover over DEV-9842 and click ACC-101 to display the entity dossier drawer.'
    },
    {
      time: '0:45 - 1:15',
      heading: 'Observability: Cypher vs 7-Table Relational SQL',
      dialogue: `"Why FalkorDB? In our Observability panel, look at the difference. With FalkorDB Cypher, this 5-hop circular wash detection requires just ONE 4-line query executing in 8.4 milliseconds. In a traditional relational SQL database, this requires 6 recursive self-joins, multiple CTEs, table locks, and 1,420 milliseconds of latency."`,
      action: 'Click the "Graph vs SQL" toggle in the Observability Panel to show the Cypher vs SQL code comparison.'
    },
    {
      time: '1:15 - 1:45',
      heading: 'Explainable AI Agent: Traceable Reasoning Timeline',
      dialogue: `"Judges always ask: how do we trust the AI? Notice our live Reasoning Timeline. The agent doesn't just guess—every single step is tethered to verifiable graph nodes. When I click step 3, the graph zooms and pulses the exact device collision; when I click step 4, it highlights the closed circular flow of $240,000 returning to the source."`,
      action: 'Click Step 3 then Step 4 in the Agent Reasoning Timeline; observe the canvas dimming background nodes and pulsing the crime ring.'
    },
    {
      time: '1:45 - 2:00',
      heading: 'The Verdict & SAR: Regulatory Compliance Ready',
      dialogue: `"Finally, the agent synthesizes a Risk Verdict score of 95/100 and drafts an automatic, FinCEN-compliant Suspicious Activity Report (SAR) with evidence references. Most importantly: we maintain Human-in-the-Loop compliance—the analyst inspects the graph and provides the final digital signature. This transforms financial crime triage from 4.8 hours into 1.2 seconds."`,
      action: 'Open the Draft SAR Report modal, click "Human Analyst Sign-off", and celebrate the confetti.'
    }
  ];

  const handleCopyFullScript = () => {
    const fullText = scriptSections.map(s => `[${s.time}] ${s.heading}\nWHAT TO SAY:\n${s.dialogue}\nWHAT TO DO ON SCREEN:\n${s.action}\n`).join('\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#090e1a] border border-cyan-500/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                2-Minute Hackathon Demo Script (WeMakeDevs Judges)
              </h3>
              <p className="text-[11px] text-slate-400">
                Paced walkthrough guaranteed to convey maximum impact in under 120 seconds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 rounded text-sm transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Script Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {scriptSections.map((sec, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  {sec.heading}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {sec.time}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 text-slate-200 leading-relaxed font-sans italic text-[11px]">
                {sec.dialogue}
              </div>

              <div className="text-[11px] text-cyan-300 font-mono flex items-center gap-1.5 pl-1">
                <span className="text-slate-500 font-bold">ACTION:</span>
                <span>{sec.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Target Pace: 1 minute 50 seconds + 10s Q&amp;A
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFullScript}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied ✓' : 'Copy Entire Script'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono transition"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
