import React from 'react';

export default function ArchitectureDiagram() {
  const stages = [
    {
      num: '01',
      title: 'DATA INGESTION',
      subtitle: 'Raw Banking Ledgers',
      desc: 'Raw SWIFT transactions, IP/MAC device auth logs, and beneficial ownership records.',
      tag: 'STREAM INGEST'
    },
    {
      num: '02',
      title: 'FALKORDB GRAPH',
      subtitle: 'In-Memory Engine',
      desc: 'Indexed graph nodes and edges. Enables index-free adjacency traversals in < 10ms.',
      tag: 'OPENCYPHER'
    },
    {
      num: '03',
      title: 'CRIME AGENT',
      subtitle: 'LLM + Cypher Tools',
      desc: 'Formulates multi-hop Cypher queries, uncovers circular loops, and scores syndicate risk.',
      tag: 'REASONING LOOP'
    },
    {
      num: '04',
      title: 'ANALYST DOSSIER',
      subtitle: 'Human-in-the-Loop',
      desc: 'Forensic graph canvas, automated evidence dimming, and FinCEN SAR draft generation.',
      tag: 'HUMAN SIGNOFF'
    }
  ];

  return (
    <div className="bg-[#161513] border border-[#2c2924] p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2c2924] pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
          <h2 className="text-xs font-bold text-[#faf7f2] uppercase tracking-wider font-mono">
            PIPELINE ARCHITECTURE // SCHEMATIC
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#9e988a] px-2 py-0.5 border border-[#2c2924] bg-[#1a1917]">
          Data Feed &rarr; FalkorDB &rarr; Agent Tools &rarr; FinCEN SAR
        </span>
      </div>

      {/* Connected Technical Schematic */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 font-mono">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#1a1917] border border-[#2c2924] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#656157] mb-1.5 pb-1 border-b border-[#24211d]">
                <span className="font-bold text-[#c27803]">STAGE {stage.num}</span>
                <span className="px-1.5 py-0.2 text-[9px] border border-[#2c2924] text-[#9e988a]">
                  {stage.tag}
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#faf7f2]">{stage.title}</h3>
              <h4 className="text-[10px] text-[#c27803] font-semibold mb-1.5">{stage.subtitle}</h4>
              <p className="text-[11px] text-[#9e988a] font-serif leading-relaxed">{stage.desc}</p>
            </div>

            <div className="mt-2 text-[9px] text-[#656157] pt-1.5 border-t border-[#24211d]">
              {idx < stages.length - 1 ? 'TRAVERSAL FLOW ──►' : 'FINAL SAR DISPOSITION'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

