import React from 'react';
import { X, ShieldAlert, ArrowUpRight, ArrowDownLeft, Smartphone, Building2, User, CreditCard, ShoppingBag } from 'lucide-react';

const TYPE_ICONS = {
  account: CreditCard,
  person: User,
  company: Building2,
  device: Smartphone,
  merchant: ShoppingBag
};

export default function NodeDetailModal({ node, scenario, onClose }) {
  if (!node) return null;

  const Icon = TYPE_ICONS[node.type] || CreditCard;

  // Find incoming and outgoing edges for this node
  const outgoing = scenario.edges.filter(e => e.source === node.id);
  const incoming = scenario.edges.filter(e => e.target === node.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#090e1a] border border-slate-700/80 rounded-2xl w-full max-w-md h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-mono">{node.label}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {node.type}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{node.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Risk Card */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-mono">ASSESSED RISK SCORE</span>
              <div className="text-xl font-bold font-mono text-red-400 mt-0.5">
                {node.risk} / 100
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
              node.risk >= 75 ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
              node.risk >= 40 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {node.risk >= 75 ? 'HIGH RISK' : node.risk >= 40 ? 'MEDIUM RISK' : 'LOW RISK'}
            </span>
          </div>

          {/* Metadata attributes */}
          {node.details && (
            <div>
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase mb-2">
                Entity Dossier Attributes
              </h4>
              <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80">
                {Object.entries(node.details).map(([k, v]) => (
                  <div key={k} className="p-2.5 flex items-center justify-between">
                    <span className="text-slate-400 capitalize font-mono text-[11px]">{k}:</span>
                    <span className="text-slate-200 font-semibold text-[11px] font-mono">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outbound Transfers / Links */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 font-mono uppercase mb-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>Outbound Connections ({outgoing.length})</span>
            </div>

            {outgoing.length === 0 ? (
              <p className="text-slate-500 text-[11px]">No outbound edges in current subnetwork.</p>
            ) : (
              <div className="space-y-1.5">
                {outgoing.map(e => (
                  <div key={e.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400 font-mono font-semibold">{e.type}</span>
                      <span className="text-slate-500">&rarr;</span>
                      <span className="text-slate-200 font-mono">{e.target}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">{e.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inbound Transfers / Links */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 font-mono uppercase mb-2">
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inbound Connections ({incoming.length})</span>
            </div>

            {incoming.length === 0 ? (
              <p className="text-slate-500 text-[11px]">No inbound edges in current subnetwork.</p>
            ) : (
              <div className="space-y-1.5">
                {incoming.map(e => (
                  <div key={e.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-200 font-mono">{e.source}</span>
                      <span className="text-slate-500">&rarr;</span>
                      <span className="text-emerald-400 font-mono font-semibold">{e.type}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">{e.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
