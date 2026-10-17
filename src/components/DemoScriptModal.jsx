import React from 'react';
import { X, Clock, Copy, Check } from 'lucide-react';

export default function DemoScriptModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const scriptSections = [
    {
      time: '0:00 - 0:25',
      heading: 'The Hook & Trigger (Hero Section)',
      screen: 'Scrolled to top. Full view of headline and red investigation button.',
      cursor: 'Rest cursor near headline -> at 0:15 move down to red button -> CLICK at 0:18.',
      dialogue: `"Traditional anti-money laundering systems inspect transactions row by row in relational spreadsheets. To an isolated database table, an account wiring $48,000 looks like an ordinary, compliant wire. But financial crime syndicates don't operate in rows—they hide in graph topology. That is why we built the Financial Crime Graph Agent powered by FalkorDB."`,
      action: 'CLICK the red button [▶ RUN SAMPLE INVESTIGATION]. The graph starts animating and timeline steps start lighting up.'
    },
    {
      time: '0:25 - 0:50',
      heading: 'The Graph Centerpiece & Device Collision',
      screen: 'Scroll down slightly so the Graph Canvas (left) and Reasoning Log (right) fill the screen.',
      cursor: 'Move mouse onto canvas -> HOVER over center amber rectangle (iPhone 15 Pro) -> at 0:38 CLICK circle ACC-101 (Rivera) -> at 0:48 click "Dismiss Dossier".',
      dialogue: `"Look at our interactive graph pinboard. An initial alert flagged Account ACC-101 for a wire spike. In a spreadsheet, that is where the trail goes cold. But when our agent walks the graph in FalkorDB, it reveals that five distinct accounts—Rivera, Lee, Kim, Patel, and Chen (Accounts 101 through 105)—all authenticate from the exact same physical iPhone in the center. In isolated spreadsheet rows, this collision is completely invisible."`,
      action: 'Hover over iPhone 15 Pro in the center. Click ACC-101 (Rivera) to open the side dossier. Click "Dismiss Dossier" to close it.'
    },
    {
      time: '0:50 - 1:15',
      heading: 'Observability: FalkorDB Cypher vs Relational SQL',
      screen: 'Look at right-hand column, middle box: "OBSERVABILITY & QUERY INSPECTOR".',
      cursor: 'Move cursor to the toggle -> CLICK "Relational SQL" at 0:58 -> point to 1,420 ms -> CLICK "FalkorDB Cypher" back at 1:08.',
      dialogue: `"Why FalkorDB? In our Observability panel, look at the difference. With FalkorDB Cypher, this 5-hop circular wash detection requires one 5-line openCypher query executing in 8.4 milliseconds because relationships are stored as direct in-memory pointers. In relational SQL, that exact same question requires six recursive CTEs, seven self-joins, and 1,420 milliseconds of latency."`,
      action: 'Toggle between [Relational SQL] (highlight 1,420 ms / 7 joins) and [FalkorDB Cypher] (highlight 8.4 ms / 0 joins).'
    },
    {
      time: '1:15 - 1:40',
      heading: 'Traceable Deductions: The Reasoning Log',
      screen: 'Look at right-hand column, top box: "AGENT REASONING LOG".',
      cursor: 'Move mouse up to Step 3 -> CLICK Step 3 at 1:20 -> move down to Step 4 -> CLICK Step 4 at 1:30.',
      dialogue: `"A critical question with AI in compliance is: how can an investigator trust the agent? Notice our live Reasoning Log. The agent does not hallucinate. Every single deduction links directly to verifiable graph nodes. Clicking Step 3 highlights the device collision; clicking Step 4 traces the closed wash circuit of $240,000 returning to the source account while skimming a fee to an offshore gateway."`,
      action: 'Click Step 3 (graph zooms to DEV-9842). Click Step 4 (graph highlights the full circular fund loop in red).'
    },
    {
      time: '1:40 - 2:00',
      heading: 'Risk Verdict & Human-in-the-Loop SAR',
      screen: 'Look at right-hand column, bottom box: "RISK VERDICT & ASSESSMENT".',
      cursor: 'Point to red "Risk Index 95/100" -> at 1:48 CLICK "Open FinCEN Draft SAR Report" -> close modal -> at 1:55 CLICK "AUTHORIZE DRAFT".',
      dialogue: `"Finally, the agent compiles a Risk Verdict of 95/100 and drafts an official FinCEN Suspicious Activity Report with exact evidence references. Crucially, we enforce Human-in-the-Loop compliance—the agent surfaces the topological evidence, but the human compliance officer provides the legal sign-off. This turns 5 hours of manual spreadsheet stitching into under two seconds."`,
      action: 'Click "Open FinCEN Draft SAR Report". Dismiss modal. Click "AUTHORIZE DRAFT" to show the green [✓ VERIFIED & SIGNED] stamp.'
    }
  ];

  const handleCopyFullScript = () => {
    const fullText = scriptSections.map(s => 
`[${s.time}] ${s.heading}
SCREEN: ${s.screen}
MOUSE / CURSOR: ${s.cursor}
WHAT TO SAY:
${s.dialogue}
ACTION TO EXECUTE:
${s.action}
`).join('\n---\n\n');
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
              2-Minute Video Presentation Script &amp; Mouse Roadmap
            </h3>
            <p className="text-[11px] text-[#9e988a] font-serif">
              Step-by-step cue sheet: exactly where to look, hover, and click at each second
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
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {scriptSections.map((sec, i) => (
            <div key={i} className="bg-[#121110] p-4 border border-[#2c2924] space-y-2.5">
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

              {/* Screen & Mouse Cue Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] p-2 bg-[#181715] border border-[#262420]">
                <div>
                  <span className="text-[#656157] font-bold block mb-0.5">SCREEN VIEW:</span>
                  <span className="text-[#9e988a]">{sec.screen}</span>
                </div>
                <div>
                  <span className="text-[#c27803] font-bold block mb-0.5">MOUSE &amp; CLICKS:</span>
                  <span className="text-[#ece7de]">{sec.cursor}</span>
                </div>
              </div>

              {/* Dialogue */}
              <div className="p-3 bg-[#1a1917] border border-[#2c2924] text-[#dcd6ca] leading-relaxed font-serif text-[11px]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#656157] block mb-1">WHAT TO SAY:</span>
                {sec.dialogue}
              </div>

              {/* Action */}
              <div className="text-[10px] text-[#9e988a] flex items-center gap-1.5 pl-1 font-mono">
                <span className="text-[#e03131] font-bold">KEY EVENT:</span>
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

