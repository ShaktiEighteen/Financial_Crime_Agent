import React from 'react';
import { X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function NodeDetailModal({ node, scenario, onClose }) {
  if (!node) return null;

  // Find incoming and outgoing edges for this node
  const outgoing = scenario.edges.filter(e => e.source === node.id);
  const incoming = scenario.edges.filter(e => e.target === node.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black/80">
      <div className="bg-[#161513] border border-[#3f3b34] w-full max-w-md h-[90vh] flex flex-col shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="p-4 border-b border-[#2c2924] flex items-center justify-between bg-[#1a1917]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#faf7f2]">{node.label}</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 border border-[#2c2924] bg-[#121110] text-[#9e988a]">
                {node.type}
              </span>
            </div>
            <p className="text-[11px] text-[#9e988a] font-serif mt-0.5">{node.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 border border-[#2c2924] text-[#9e988a] hover:text-[#ece7de] hover:bg-[#22201d] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Risk Card */}
          <div className="p-3 bg-[#121110] border border-[#2c2924] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#656157]">ASSESSED RISK SCORE</span>
              <div className="text-xl font-bold text-[#faf7f2] mt-0.5">
                {node.risk} / 100
              </div>
            </div>

            <span className={`px-2 py-0.5 text-[10px] font-bold border ${
              node.risk >= 75 ? 'bg-[#251212] text-[#e03131] border-[#5c1919]' :
              node.risk >= 40 ? 'bg-[#26180a] text-[#c27803] border-[#5a3507]' :
              'bg-[#162215] text-[#2b8a3e] border-[#1e3a1b]'
            }`}>
              {node.risk >= 75 ? 'CRITICAL RISK' : node.risk >= 40 ? 'ELEVATED RISK' : 'LOW RISK'}
            </span>
          </div>

          {/* Metadata attributes */}
          {node.details && (
            <div>
              <h4 className="text-[10px] font-bold text-[#9e988a] uppercase tracking-wider mb-2">
                Dossier Metadata Attributes
              </h4>
              <div className="bg-[#121110] border border-[#2c2924] divide-y divide-[#24211d]">
                {Object.entries(node.details).map(([k, v]) => (
                  <div key={k} className="p-2.5 flex items-center justify-between">
                    <span className="text-[#656157] capitalize text-[11px]">{k}:</span>
                    <span className="text-[#ece7de] font-semibold text-[11px]">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outbound Transfers / Links */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9e988a] uppercase tracking-wider mb-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c27803]" />
              <span>Outbound Links ({outgoing.length})</span>
            </div>

            {outgoing.length === 0 ? (
              <p className="text-[#656157] text-[11px] font-serif">No outbound edges in current subnetwork.</p>
            ) : (
              <div className="space-y-1.5">
                {outgoing.map(e => (
                  <div key={e.id} className="p-2 bg-[#121110] border border-[#2c2924] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#c27803] font-semibold">{e.type}</span>
                      <span className="text-[#656157]">&rarr;</span>
                      <span className="text-[#ece7de]">{e.target}</span>
                    </div>
                    <span className="text-[#9e988a] text-[10px]">{e.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inbound Transfers / Links */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9e988a] uppercase tracking-wider mb-2">
              <ArrowDownLeft className="w-3.5 h-3.5 text-[#8c8679]" />
              <span>Inbound Links ({incoming.length})</span>
            </div>

            {incoming.length === 0 ? (
              <p className="text-[#656157] text-[11px] font-serif">No inbound edges in current subnetwork.</p>
            ) : (
              <div className="space-y-1.5">
                {incoming.map(e => (
                  <div key={e.id} className="p-2 bg-[#121110] border border-[#2c2924] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#ece7de]">{e.source}</span>
                      <span className="text-[#656157]">&rarr;</span>
                      <span className="text-[#8c8679] font-semibold">{e.type}</span>
                    </div>
                    <span className="text-[#9e988a] text-[10px]">{e.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#2c2924] bg-[#1a1917] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-[#2c2924] bg-[#161513] hover:bg-[#22201d] text-[#ece7de] text-xs font-mono transition cursor-pointer"
          >
            Dismiss Dossier
          </button>
        </div>
      </div>
    </div>
  );
}

