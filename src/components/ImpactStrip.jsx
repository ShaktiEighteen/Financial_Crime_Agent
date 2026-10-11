import React from 'react';
import { Users, Link2, Clock, ShieldCheck, CheckCircle } from 'lucide-react';

export default function ImpactStrip({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      label: 'Entities & Accounts Analyzed',
      value: metrics.accountsAnalyzed,
      unit: 'nodes',
      sub: 'Multi-hop subgraphs parsed',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Hidden Links Discovered',
      value: metrics.hiddenLinksFound,
      unit: 'connections',
      sub: 'Shared devices, straw owners, wash loops',
      icon: Link2,
      color: 'amber'
    },
    {
      label: 'Investigation Duration',
      value: `${metrics.agentTimeSeconds}s`,
      unit: `vs ${metrics.manualTimeHours}h manual`,
      sub: '99.9% faster than spreadsheet queries',
      icon: Clock,
      color: 'cyan'
    },
    {
      label: 'False-Positive Reduction',
      value: metrics.falsePositiveReduction,
      unit: 'accuracy',
      sub: 'Contextual graph signal cross-validation',
      icon: ShieldCheck,
      color: 'emerald'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-[#0f172a] border border-slate-800 rounded-xl p-3.5 shadow-lg flex items-start justify-between gap-3"
          >
            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-1">
                {card.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold font-mono text-white">
                  {card.value}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {card.unit}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                {card.sub}
              </p>
            </div>

            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
