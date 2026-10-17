# 🛡️ Financial Crime Agent (Graph Hacks by WeMakeDevs)

> **"Follow the money. Expose the network."**  
> An AI investigative copilot that uncovers money laundering rings, shell-company networks, and smurfing funnels using **FalkorDB** graph traversal.

[![Live Demo](https://img.shields.io/badge/Live%20Website-monumental--marigold--feca47.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://monumental-marigold-feca47.netlify.app/)
[![WeMakeDevs Hackathon](https://img.shields.io/badge/Hackathon-Graph%20Hacks%202026-06b6d4?style=for-the-badge)](https://wemakedevs.org)
[![FalkorDB](https://img.shields.io/badge/Powered%20By-FalkorDB%20Cypher-ff0055?style=for-the-badge)](https://falkordb.com)
[![Status](https://img.shields.io/badge/Status-Live%20SOC%20Cockpit-10b981?style=for-the-badge)]()

---

## 🌐 Live Website

- **Website Name**: **Financial Crime Agent**
- **Live URL**: [https://monumental-marigold-feca47.netlify.app/](https://monumental-marigold-feca47.netlify.app/)

---

## ⚡ The 10-Second Pitch: Why Graph Catches What a Spreadsheet Can't

Traditional Anti-Money Laundering (AML) monitoring reviews tabular ledgers. In a relational table:
- Account A transferring $48,000 to Account B looks like an ordinary, isolated transaction.
- Account B transferring $46,000 to Account C looks like an everyday outflow.

**The criminal reality**: The ring hides in the **relationships**.
1. **Circular Wash Trading**: Funds cycle through 5 accounts before returning to the originator ($240,000 laundered with 3.5% fee skimmed).
2. **Device & Telemetry Collision**: All 5 "unrelated" account holders authenticate from the **exact same physical iPhone hardware ID** (`DEV-9842`).
3. **Graph vs SQL Complexity**:
   - **FalkorDB Cypher**: A single 4-line pattern-matching query executing in **8.4 milliseconds**.
   - **Relational SQL**: 6 recursive self-joins, multiple Common Table Expressions (CTEs), Cartesian explosion, and table locks taking **1,420 milliseconds**.

---

## 🚀 Key Features

1. **Interactive Transaction Graph Centerpiece (Cytoscape.js)**:
   - Dynamic semantic styling: `Account` (Blue), `Person` (Emerald), `Company` (Purple), `Device` (Amber), `Merchant` (Pink).
   - Directed edges: Cash transfers (`TRANSFERRED_TO`), beneficial ownership (`OWNS`), hardware authentication (`SHARES_DEVICE`), and physical addresses (`SHARES_ADDRESS`).
   - Dynamic node scaling based on risk score ($0–100$) with continuous crimson radar pulse on high-risk targets.
   - Interactive zoom, pan, hover tooltips, and click-to-open entity dossiers.

2. **Automated Evidence Dimming & Pattern Highlighting**:
   - As the agent investigates, background non-involved accounts dim down to 15% opacity, while the crime ring lights up with neon borders and animated particle arrows.

3. **Traceable Agent Reasoning Timeline**:
   - Live step-by-step audit trail showing what the agent queried at each millisecond.
   - Every reasoning conclusion links to the exact graph nodes used, ensuring explainability.

4. **Observability & "Graph vs SQL" Comparative Studio**:
   - Live Cypher query inspector with execution telemetry (latency, lines of code, joins, algorithmic complexity).
   - Interactive toggle comparing FalkorDB Cypher against relational PostgreSQL/MySQL queries.

5. **Risk Verdict & FinCEN-Compliant Draft SAR**:
   - Risk score gauge ($0–100$) with a breakdown of contributing signals.
   - Auto-generated draft **Suspicious Activity Report (SAR)** (Form 111) ready for regulatory triage.
   - **Human-in-the-Loop Analyst Verification**: AI suggests signals; human analysts retain final authority with one-click digital signoff.

6. **3 Pre-Loaded Scenarios**:
   - **Mule Fraud Ring**: Synthetic mule syndicate executing circular wash transfers on a shared iPhone 15 Pro.
   - **Shell Company Layering**: 4-tier holding structure (BVI $\to$ Cyprus $\to$ Delaware) piercing corporate veils to unmask a sanctioned beneficial owner purchasing luxury real estate.
   - **Smurfing & Structuring**: Coordinated deposits just below the $10,000 BSA threshold funneled into an offshore crypto OTC pool.

7. **End-to-End Architecture Pipeline**:
   - Core Banking Ingestion $\to$ FalkorDB Graph Engine $\to$ Agentic Cypher Reasoning $\to$ SOC Visual Cockpit.

---

## 🛠️ Architecture

```
[ Real-Time Banking Feeds & SWIFT ]
                 │
                 ▼
     [ FalkorDB Graph Engine ]  <─── In-Memory Graph Index (< 10ms Cypher)
                 │
                 ▼
    [ AI Crime Agent Tools ]    <─── falkordb_query_cypher() & Multi-Hop Path Tracing
                 │
                 ▼
[ SOC Cockpit & SAR Generator ] <─── Cytoscape Canvas, Evidence Dimming & Analyst Sign-off
```

---

## 🏃 Quickstart: Run Locally

### Prerequisites
- Node.js (v18+)
- Python 3.10+ (optional, for direct FalkorDB python driver scripts)

### 1. Start the Frontend Dashboard
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser, or visit the live deployment at [https://monumental-marigold-feca47.netlify.app/](https://monumental-marigold-feca47.netlify.app/).

### 2. (Optional) Run with FalkorDB Docker
```bash
# Start FalkorDB instance
docker run -p 6379:6379 -it --rm falkordb/falkordb

# Seed synthetic graph data
python seed_data.py
```

---

## ⚖️ Synthetic Data Disclosure
All accounts, names, serial numbers, IP subnets, and transaction volumes in this project are 100% synthetic simulations created strictly for the WeMakeDevs Graph Hacks hackathon. No real-world customer PII is utilized.
