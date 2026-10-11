import React, { useState } from 'react';
import { Terminal, Database, Code2, Clock, Cpu, Copy, Check, GitCompare, Zap } from 'lucide-react';

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
    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-4 shadow-xl flex flex-col">
      {/* Top Header & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Observability & Query Inspector
          </h2>
        </div>

        {/* Graph vs SQL Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
          <button
            onClick={() => setViewMode('cypher')}
            className={`px-3 py-1 rounded font-mono font-medium transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'cypher'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>FalkorDB Cypher</span>
          </button>

          <button
            onClick={() => setViewMode('sql')}
            className={`px-3 py-1 rounded font-mono font-medium transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'sql'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-amber-400" />
            <span>Relational SQL</span>
          </button>
        </div>
      </div>

      {/* Query Stats Comparison Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Latency</span>
          </div>
          <div className="mt-1 text-sm font-bold font-mono text-cyan-300">
            {viewMode === 'cypher' ? comparison?.cypherStats?.executionMs || '8.4 ms' : comparison?.sqlStats?.executionMs || '1,420 ms'}
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Code2 className="w-3 h-3 text-emerald-400" />
            <span>Code Length</span>
          </div>
          <div className="mt-1 text-sm font-bold font-mono text-slate-200">
            {viewMode === 'cypher' ? `${comparison?.cypherStats?.linesOfCode || 5} lines` : `${comparison?.sqlStats?.linesOfCode || 24} lines`}
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Database className="w-3 h-3 text-amber-400" />
            <span>Relational Joins</span>
          </div>
          <div className={`mt-1 text-sm font-bold font-mono ${
            viewMode === 'cypher' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {viewMode === 'cypher' ? '0 Joins (Index-Free)' : `${comparison?.sqlStats?.joinsNeeded || 7} Joins (Table Locks)`}
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>Complexity</span>
          </div>
          <div className="mt-1 text-xs font-bold font-mono text-slate-300 truncate" title={viewMode === 'cypher' ? comparison?.cypherStats?.complexity : comparison?.sqlStats?.complexity}>
            {viewMode === 'cypher' ? 'O(k * d) Graph Index' : 'O(N^k) Cartesian Join'}
          </div>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="relative flex-1 bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-xs overflow-x-auto min-h-[160px]">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px]"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy Query'}</span>
        </button>

        {/* Agent Tool Call Badge */}
        <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>Agent Tool:</span>
          <span className="text-cyan-300 font-semibold">falkordb_query_cypher()</span>
        </div>

        {/* Code Content */}
        <pre className="text-slate-300 whitespace-pre leading-relaxed overflow-x-auto">
          <code>{viewMode === 'cypher' ? currentCypher : currentSql}</code>
        </pre>
      </div>

      {/* Explanation Callout */}
      <div className="mt-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
        <span className="font-bold text-cyan-400 uppercase font-mono shrink-0">Insight:</span>
        <p className="leading-relaxed">
          {viewMode === 'cypher'
            ? 'Cypher natively navigates edges as pointers without expensive cross-table lookups, allowing the agent to follow fund loops in constant time.'
            : 'Relational SQL must join the entire transactions ledger repeatedly against itself, causing Cartesian explosions and multi-second locks on live banking databases.'}
        </p>
      </div>
    </div>
  );
}
