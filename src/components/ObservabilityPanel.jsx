import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ObservabilityPanel({ activeStep, comparison, scenario }) {
  const [viewMode, setViewMode] = useState('cypher'); // 'cypher' | 'sql'
  const [copied, setCopied] = useState(false);

  const currentCypher = activeStep?.cypher || comparison?.cypherQuery;
  const currentSql = comparison?.sqlQuery;

  const handleCopy = () => {
    const text = viewMode === 'cypher' ? currentCypher : currentSql;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#161513] border border-[#2c2924] p-4 flex flex-col">
      {/* Top Header & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2c2924] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
          <h2 className="text-xs font-bold text-[#faf7f2] uppercase tracking-wider font-mono">
            OBSERVABILITY &amp; QUERY INSPECTOR
          </h2>
        </div>

        {/* Graph vs SQL Toggle */}
        <div className="flex items-center gap-1 bg-[#1a1917] border border-[#2c2924] p-0.5 text-xs font-mono">
          <button
            onClick={() => setViewMode('cypher')}
            className={`px-2.5 py-1 transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'cypher'
                ? 'bg-[#26180a] text-[#c27803] font-bold border border-[#5a3507]'
                : 'text-[#9e988a] hover:text-[#ece7de]'
            }`}
          >
            <span>FalkorDB Cypher</span>
          </button>

          <button
            onClick={() => setViewMode('sql')}
            className={`px-2.5 py-1 transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'sql'
                ? 'bg-[#22201d] text-[#ece7de] font-bold border border-[#3f3b34]'
                : 'text-[#9e988a] hover:text-[#ece7de]'
            }`}
          >
            <span>Relational SQL</span>
          </button>
        </div>
      </div>

      {/* Query Stats Comparison Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 font-mono">
        <div className="bg-[#1a1917] border border-[#2c2924] p-2">
          <div className="text-[#656157] text-[10px] uppercase">
            Execution Latency
          </div>
          <div className="mt-0.5 text-sm font-bold text-[#faf7f2]">
            {viewMode === 'cypher' ? comparison?.cypherStats?.executionMs || '8.4 ms' : comparison?.sqlStats?.executionMs || '1,420 ms'}
          </div>
        </div>

        <div className="bg-[#1a1917] border border-[#2c2924] p-2">
          <div className="text-[#656157] text-[10px] uppercase">
            Code Lines
          </div>
          <div className="mt-0.5 text-sm font-bold text-[#ece7de]">
            {viewMode === 'cypher' ? `${comparison?.cypherStats?.linesOfCode || 5} lines` : `${comparison?.sqlStats?.linesOfCode || 24} lines`}
          </div>
        </div>

        <div className="bg-[#1a1917] border border-[#2c2924] p-2">
          <div className="text-[#656157] text-[10px] uppercase">
            Relational Joins
          </div>
          <div className={`mt-0.5 text-xs font-bold ${
            viewMode === 'cypher' ? 'text-[#c27803]' : 'text-[#e03131]'
          }`}>
            {viewMode === 'cypher' ? '0 Joins (Index-Free)' : `${comparison?.sqlStats?.joinsNeeded || 7} Self-Joins`}
          </div>
        </div>

        <div className="bg-[#1a1917] border border-[#2c2924] p-2">
          <div className="text-[#656157] text-[10px] uppercase">
            Graph Complexity
          </div>
          <div className="mt-0.5 text-[11px] font-bold text-[#9e988a] truncate" title={viewMode === 'cypher' ? comparison?.cypherStats?.complexity : comparison?.sqlStats?.complexity}>
            {viewMode === 'cypher' ? 'O(k * d) Graph Pointers' : 'O(N^k) Cartesian Join'}
          </div>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="relative flex-1 bg-[#121110] border border-[#2c2924] p-3 font-mono text-xs overflow-x-auto min-h-[160px]">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 px-2 py-1 bg-[#1a1917] hover:bg-[#22201d] border border-[#2c2924] text-[#9e988a] hover:text-[#ece7de] transition flex items-center gap-1 text-[10px] font-mono cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-[#2b8a3e]" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Agent Tool Call Badge */}
        <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#1a1917] border border-[#2c2924] text-[10px] text-[#9e988a]">
          <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
          <span>AGENT TOOL CALL:</span>
          <span className="text-[#ece7de] font-bold">falkordb_query_cypher()</span>
        </div>

        {/* Code Content */}
        <pre className="text-[#dcd6ca] whitespace-pre leading-relaxed overflow-x-auto text-[11px]">
          <code>{viewMode === 'cypher' ? currentCypher : currentSql}</code>
        </pre>
      </div>

      {/* Forensic Contrast Note */}
      <div className="mt-3 p-2.5 bg-[#1a1917] border border-[#2c2924] text-xs text-[#a8a294] font-serif flex items-start gap-2">
        <span className="font-bold text-[#c27803] font-mono text-[10px] uppercase shrink-0 pt-0.5">NOTE:</span>
        <p className="leading-relaxed">
          {viewMode === 'cypher'
            ? 'Cypher treats relationships as direct in-memory memory pointers. FalkorDB navigates multi-hop circular wash loops in constant time without table lookups.'
            : 'Relational SQL must join the entire transactions ledger repeatedly against itself. A 5-hop loop query requires 5 self-joins and recursive CTE table locking.'}
        </p>
      </div>
    </div>
  );
}

