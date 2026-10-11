import React from 'react';
import { Database, Cpu, Layout, ArrowRight, Shield, Zap, Sparkles, Network } from 'lucide-react';

export default function ArchitectureDiagram() {
  const steps = [
    {
      title: '1. Ingestion Engine',
      subtitle: 'Core Banking & SWIFT',
      icon: Database,
      desc: 'Raw transaction streams, device auth events, and corporate registry records normalized into graph entities.',
      tag: 'Real-time Feed',
      color: 'blue'
    },
    {
      title: '2. FalkorDB Graph',
      subtitle: 'Knowledge Graph DB',
      icon: Network,
      desc: 'Blazing-fast in-memory Cypher graph storing accounts, persons, companies, devices, and multi-hop paths.',
      tag: '< 10ms Latency',
      color: 'cyan'
    },
    {
      title: '3. AI Crime Agent',
      subtitle: 'Reasoning & Cypher Tools',
      icon: Cpu,
      desc: 'Autonomous agent that generates targeted Cypher queries, pierces corporate veils, and calculates syndicate risk.',
      tag: 'Multi-Hop Reasoning',
      color: 'purple'
    },
    {
      title: '4. SOC Visual Canvas',
      subtitle: 'Analyst Cockpit & SAR',
      icon: Layout,
      desc: 'Interactive graph visualization, automated evidence dimming, signal breakdown, and draft FinCEN SAR filing.',
      tag: 'Human-in-the-Loop',
      color: 'emerald'
    }
  ];

  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            System Architecture &amp; Data Pipeline
          </h2>
        </div>
        <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
          FalkorDB + Agentic LLM Orchestration
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between relative group hover:border-cyan-500/40 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-${s.color}-500/10 border border-${s.color}-500/30 text-${s.color}-400`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white font-mono">{s.title}</h3>
                <h4 className="text-[11px] text-cyan-400 font-semibold mb-2">{s.subtitle}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-slate-900 border border-slate-700 rounded-full p-1 text-slate-400">
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
