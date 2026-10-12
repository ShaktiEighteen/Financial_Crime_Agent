import React from 'react';

export default function AboutSection() {
  return (
    <section className="my-8 border border-[#2c2924] bg-[#161513]">
      {/* Section Header */}
      <div className="px-5 py-2.5 border-b border-[#2c2924] bg-[#1a1917] flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-1.5 h-1.5 bg-[#c27803]"></span>
          <span className="font-bold text-[#faf7f2]">DISCLOSURES &amp; SYSTEM NOTES</span>
          <span className="text-[#3f3b34]">|</span>
          <span className="text-[#9e988a]">ENGINEERING MEMORANDUM</span>
        </div>
        <span className="font-mono text-[10px] text-[#656157]">DOC // REF-AML-NOTES</span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Why We Built This (First-Person Authentic Voice) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#c27803] font-bold">
            <span>§01</span>
            <span>Why we built this</span>
          </div>

          <h3 className="font-display text-xl font-bold text-[#faf7f2] leading-snug">
            Relational tables were never designed to chase networks.
          </h3>

          <div className="text-xs text-[#a8a294] font-serif leading-relaxed space-y-2.5">
            <p>
              We built this because traditional compliance tools suffer from a structural blind spot: they inspect transactions row by row. If five accounts pass \$48,000 sequentially in a circle over six days, every single row looks like an ordinary, compliant wire transfer to a relational database.
            </p>
            <p>
              Chasing multi-hop loops and shared burner devices in SQL forces engineers to write recursive Common Table Expressions with 6+ self-joins. In live core banking systems, those queries lock tables and take seconds or minutes to complete.
            </p>
            <p>
              With <strong className="text-[#ece7de]">FalkorDB</strong>, relationships are index-free in-memory pointers. The agent doesn't join tables; it walks the graph topology directly. An investigation that took an analyst four hours of spreadsheet stitching runs here in single-digit milliseconds.
            </p>
          </div>
        </div>

        {/* Right Column: What It Can't Do Yet & Synthetic Data Note */}
        <div className="lg:col-span-6 space-y-5">
          {/* What it can't do yet */}
          <div className="p-4 border border-[#3f3b34] bg-[#1a1917]">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#e03131] font-bold mb-2">
              <span>§02</span>
              <span>What this system cannot do yet (Known Limitations)</span>
            </div>

            <ul className="space-y-2 text-xs text-[#a8a294] font-serif">
              <li className="flex items-start gap-2">
                <span className="text-[#e03131] font-mono font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-[#ece7de]">No autonomous fund freezes:</strong> The agent compiles topological evidence and drafts FinCEN SAR filings, but it cannot freeze customer balances. Final legal disposition requires a licensed compliance officer.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#e03131] font-mono font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-[#ece7de]">Assumes normalized telemetry feeds:</strong> In this demo, device IMEIs and corporate registry IDs are pre-normalized. Real production deployments require dirty entity resolution across conflicting bank feeds.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#e03131] font-mono font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-[#ece7de]">Offshore jurisdiction black boxes:</strong> When illicit funds move into uncooperative shell company registries or unhosted offshore crypto gateways, graph traversal stops at the correspondent gateway edge.
                </span>
              </li>
            </ul>
          </div>

          {/* Synthetic Data Note */}
          <div className="p-3.5 border border-[#2c2924] bg-[#121110] text-[11px] font-mono text-[#9e988a]">
            <div className="text-[#faf7f2] font-bold uppercase text-[10px] mb-1">
              Data Generation Methodology:
            </div>
            <p className="font-serif text-[#a8a294] leading-relaxed">
              All accounts, personal names, phone IMEI fingerprints, and routing numbers in this application are 100% synthetic fixtures modeled after FinCEN advisory typologies (circular wash trading, layered offshore holding structures, and sub-\$10k smurfing). No real banking data is used.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
