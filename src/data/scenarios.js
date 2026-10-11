/**
 * Synthetic datasets for Financial Crime Agent demo
 * NOTE: All data is synthetic and designed solely for hackathon demonstration purposes.
 */

export const SCENARIOS = {
  fraud_ring: {
    id: 'fraud_ring',
    name: 'Mule Fraud Ring',
    subtitle: 'Circular Wash Transfers & Shared Hardware Fingerprints',
    badge: 'Synthetic Scenario 01',
    description: 'A syndicate of 5 mule accounts executing automated circular wash transfers ($240,000) while masquerading as distinct individuals, betrayed by a shared physical iPhone hardware fingerprint.',
    alertText: 'ALERT #AML-8492: High-velocity circular transfers detected across 5 retail accounts with zero prior transaction history.',
    category: 'Mule Networks',
    targetAccount: 'ACC-101',
    impactMetrics: {
      accountsAnalyzed: 14,
      hiddenLinksFound: 7,
      manualTimeHours: 4.8,
      agentTimeSeconds: 1.2,
      falsePositiveReduction: '92%'
    },
    signals: [
      { name: 'Circular Fund Velocity', score: 35, max: 35, desc: 'Closed loop transaction path detected: A -> B -> C -> D -> E -> A within 48 hours.' },
      { name: 'Hardware Fingerprint Collision', score: 28, max: 30, desc: '5 distinct SSNs logged in from identical hardware UUID: DEV-9842 (iPhone 15 Pro).' },
      { name: 'Synthetic Identity Patterns', score: 18, max: 20, desc: 'Accounts opened within 4 business days of each other with matching credit bureaus.' },
      { name: 'Offshore Gateway Leakage', score: 14, max: 15, desc: 'Consistent 3.5% skim funneled to unhosted merchant gateway Apex Offshore Pay.' }
    ],
    riskScore: 95,
    verdict: 'CONFIRMED CRIME RING',
    verdictSummary: 'The agent established beyond statistical coincidence that Accounts ACC-101 through ACC-105 operate as a single coordinated mule syndicate. While tabular ledgers show valid individual transfers, graph topology reveals a closed circular wash ring sharing device hardware UUID DEV-9842, systematically laundering $240,000.',
    sarReport: {
      filingId: 'SAR-2026-09842-RING',
      priority: 'CRITICAL / URGENT',
      suspectEntities: ['Alex Rivera (ACC-101)', 'Jordan Lee (ACC-102)', 'Taylor Kim (ACC-103)', 'Sam Patel (ACC-104)', 'Morgan Chen (ACC-105)'],
      sharedIdentifiers: ['Hardware UUID: hw_a8f9219b', 'IP Subnet: 198.51.100.0/24', 'Gateway: Apex Offshore Pay'],
      totalAmountUSD: '$240,000.00',
      timeframe: 'Oct 08, 2026 - Oct 11, 2026',
      narrative: 'Between Oct 8 and Oct 11, 2026, automated monitoring flagged account ACC-101 for rapid outbound funds. Graph investigation unmasked four downstream recipient accounts (ACC-102, ACC-103, ACC-104, ACC-105). Graph traversal revealed that funds circulated sequentially through all five entities before returning to ACC-101 (net volume: $240,000, 3.5% fee skimmed to Apex Offshore Pay). Device telemetry confirms all 5 accounts authenticated via identical mobile handset (DEV-9842). Subject activity strongly matches synthetic identity mule syndicate operations under 31 U.S.C. 5318(g).'
    },
    steps: [
      {
        id: 1,
        title: 'Ingest Trigger Alert & Seed Account',
        detail: 'Triggered by wire spike on ACC-101 ($50,000 outgoing). Initialized subgraph exploration centered on ACC-101 with 2-hop radius expansion.',
        highlightNodes: ['ACC-101'],
        highlightEdges: [],
        cypher: 'MATCH (a:Account {id: "ACC-101"}) RETURN a',
        timeMs: 4.1
      },
      {
        id: 2,
        title: 'Traverse 1-Hop Neighbor Outflows',
        detail: 'Discovered immediate funds transfer from ACC-101 to ACC-102 ($48,500), cascading instantly into ACC-103 and ACC-104 within 6 hours.',
        highlightNodes: ['ACC-101', 'ACC-102', 'ACC-103'],
        highlightEdges: ['e_transfer_1', 'e_transfer_2'],
        cypher: 'MATCH (a:Account {id: "ACC-101"})-[r:TRANSFERRED_TO*1..2]->(target:Account)\nRETURN a, r, target',
        timeMs: 8.6
      },
      {
        id: 3,
        title: 'Hardware Entity Resolution & Device Collision',
        detail: 'Traversed SHARES_DEVICE relationships. Discovered accounts ACC-101 through ACC-105 all share physical handset DEV-9842 (iPhone 15 Pro, hw_a8f921). Probability of coincidence: < 0.0001%.',
        highlightNodes: ['ACC-101', 'ACC-102', 'ACC-103', 'ACC-104', 'ACC-105', 'DEV-9842'],
        highlightEdges: ['e_dev_1', 'e_dev_2', 'e_dev_3', 'e_dev_4', 'e_dev_5'],
        cypher: 'MATCH (a:Account)-[:SHARES_DEVICE]->(d:Device)<-[:SHARES_DEVICE]-(b:Account)\nWHERE a.id <> b.id\nRETURN a, d, b',
        timeMs: 11.2
      },
      {
        id: 4,
        title: 'Closed-Loop Detection & Extraction Path',
        detail: 'Closed the circuit: ACC-105 transferred $42,000 back to ACC-101, while skimming $8,000 to unhosted merchant Apex Offshore Pay (MER-88). Flagged ring as Critical Severity.',
        highlightNodes: ['ACC-101', 'ACC-102', 'ACC-103', 'ACC-104', 'ACC-105', 'DEV-9842', 'MER-88'],
        highlightEdges: ['e_transfer_1', 'e_transfer_2', 'e_transfer_3', 'e_transfer_4', 'e_transfer_5', 'e_merchant'],
        cypher: 'MATCH path = (a:Account)-[:TRANSFERRED_TO*4..6]->(a)\nRETURN path, length(path) AS cycle_length',
        timeMs: 13.9
      }
    ],
    graphComparison: {
      cypherQuery: `// FalkorDB Cypher: Uncover circular flow + shared device in 1 expressive statement
MATCH path = (a:Account)-[:TRANSFERRED_TO*3..6]->(a)
MATCH (a)-[:SHARES_DEVICE]->(d:Device)
RETURN path, d.uuid, count(DISTINCT a) AS ring_size
HAVING ring_size > 3;`,
      sqlQuery: `-- Relational SQL: Requires 6 recursive Common Table Expressions (CTEs), multiple self-joins, and table locks
WITH RECURSIVE cycle_detector AS (
  SELECT sender_id, recipient_id, amount, 1 AS depth,
         ARRAY[sender_id] AS path
  FROM transactions
  WHERE timestamp >= NOW() - INTERVAL '7 days'
  UNION ALL
  SELECT c.sender_id, t.recipient_id, t.amount, c.depth + 1,
         path || t.recipient_id
  FROM cycle_detector c
  JOIN transactions t ON c.recipient_id = t.sender_id
  WHERE NOT t.recipient_id = ANY(path) AND c.depth < 6
),
device_collisions AS (
  SELECT da.account_id, d.device_uuid, COUNT(*) OVER(PARTITION BY d.device_uuid) AS shared_count
  FROM device_auths da
  JOIN devices d ON da.device_id = d.id
)
SELECT cd.*, dc.device_uuid
FROM cycle_detector cd
JOIN device_collisions dc ON cd.sender_id = dc.account_id
WHERE cd.recipient_id = cd.sender_id AND dc.shared_count > 3;`,
      cypherStats: { executionMs: '8.4 ms', linesOfCode: 5, joinsNeeded: 0, complexity: 'O(k * d) Graph Index Lookup' },
      sqlStats: { executionMs: '1,420 ms', linesOfCode: 24, joinsNeeded: 7, complexity: 'O(N^k) Cartesian Join Explosion' }
    },
    nodes: [
      { id: 'ACC-101', label: 'ACC-101 (Rivera)', type: 'account', risk: 94, subtitle: 'Checking | $54,200', details: { owner: 'Alex Rivera', country: 'US', opened: '2026-09-12', branch: 'Austin, TX' } },
      { id: 'ACC-102', label: 'ACC-102 (Lee)', type: 'account', risk: 92, subtitle: 'Checking | $48,500', details: { owner: 'Jordan Lee', country: 'US', opened: '2026-09-14', branch: 'Dallas, TX' } },
      { id: 'ACC-103', label: 'ACC-103 (Kim)', type: 'account', risk: 89, subtitle: 'Savings | $46,100', details: { owner: 'Taylor Kim', country: 'US', opened: '2026-09-15', branch: 'Houston, TX' } },
      { id: 'ACC-104', label: 'ACC-104 (Patel)', type: 'account', risk: 91, subtitle: 'Checking | $44,000', details: { owner: 'Sam Patel', country: 'US', opened: '2026-09-15', branch: 'Austin, TX' } },
      { id: 'ACC-105', label: 'ACC-105 (Chen)', type: 'account', risk: 95, subtitle: 'Checking | $42,000', details: { owner: 'Morgan Chen', country: 'US', opened: '2026-09-16', branch: 'San Antonio, TX' } },
      { id: 'DEV-9842', label: 'iPhone 15 Pro (hw_a8f921)', type: 'device', risk: 98, subtitle: 'iOS 18.2 | IMEI Match', details: { os: 'iOS 18.2', mac: '58:CB:52:8A:10:E1', ip: '198.51.100.44', provider: 'AT&T' } },
      { id: 'MER-88', label: 'Apex Offshore Pay', type: 'merchant', risk: 96, subtitle: 'High-Risk Gateway', details: { jurisdiction: 'Seychelles', category: 'Virtual Asset / FX', registered: '2026-04-01' } },
      // Background innocent nodes
      { id: 'ACC-201', label: 'ACC-201 (Evans)', type: 'account', risk: 8, subtitle: 'Verified Retail', details: { owner: 'Ben Evans', country: 'US', opened: '2021-02-10' } },
      { id: 'ACC-202', label: 'ACC-202 (Connor)', type: 'account', risk: 5, subtitle: 'Payroll Account', details: { owner: 'Sara Connor', country: 'US', opened: '2019-06-18' } },
      { id: 'DEV-1100', label: 'Home iPad (Air 5)', type: 'device', risk: 4, subtitle: 'Single User Device', details: { os: 'iPadOS 18.0', mac: '12:44:88:AA:BC:01' } },
      { id: 'MER-12', label: 'Spotify Premium', type: 'merchant', risk: 2, subtitle: 'Standard Subscription', details: { jurisdiction: 'SE', category: 'Digital Media' } }
    ],
    edges: [
      { id: 'e_transfer_1', source: 'ACC-101', target: 'ACC-102', type: 'transfer', label: '$48,500 Wire', amount: 48500, animated: true },
      { id: 'e_transfer_2', source: 'ACC-102', target: 'ACC-103', type: 'transfer', label: '$46,100 Wire', amount: 46100, animated: true },
      { id: 'e_transfer_3', source: 'ACC-103', target: 'ACC-104', type: 'transfer', label: '$44,000 Wire', amount: 44000, animated: true },
      { id: 'e_transfer_4', source: 'ACC-104', target: 'ACC-105', type: 'transfer', label: '$42,000 Wire', amount: 42000, animated: true },
      { id: 'e_transfer_5', source: 'ACC-105', target: 'ACC-101', type: 'transfer', label: '$38,500 Wash Return', amount: 38500, animated: true },
      { id: 'e_merchant', source: 'ACC-105', target: 'MER-88', type: 'transfer', label: '$3,500 Fee Skim', amount: 3500 },
      { id: 'e_dev_1', source: 'ACC-101', target: 'DEV-9842', type: 'shares-device', label: 'Authenticated' },
      { id: 'e_dev_2', source: 'ACC-102', target: 'DEV-9842', type: 'shares-device', label: 'Authenticated' },
      { id: 'e_dev_3', source: 'ACC-103', target: 'DEV-9842', type: 'shares-device', label: 'Authenticated' },
      { id: 'e_dev_4', source: 'ACC-104', target: 'DEV-9842', type: 'shares-device', label: 'Authenticated' },
      { id: 'e_dev_5', source: 'ACC-105', target: 'DEV-9842', type: 'shares-device', label: 'Authenticated' },
      // Background edges
      { id: 'e_bg_1', source: 'ACC-201', target: 'MER-12', type: 'transfer', label: '$14.99 Sub' },
      { id: 'e_bg_2', source: 'ACC-201', target: 'DEV-1100', type: 'shares-device', label: 'Logged In' },
      { id: 'e_bg_3', source: 'ACC-202', target: 'MER-12', type: 'transfer', label: '$14.99 Sub' }
    ]
  },

  shell_company: {
    id: 'shell_company',
    name: 'Shell Company Layering',
    subtitle: 'Offshore Beneficial Ownership Concealment & Corporate Veil Piercing',
    badge: 'Synthetic Scenario 02',
    description: 'An offshore layered structure routing $1.85M across 3 tax havens with nominee straw-directors to obscure a sanctioned beneficial owner purchasing Manhattan real estate.',
    alertText: 'ALERT #AML-9201: Inbound SWIFT wire of $1,850,000 to New York Commercial Title & Escrow from unverified BVI holding company.',
    category: 'Trade & Corporate AML',
    targetAccount: 'COMP-01',
    impactMetrics: {
      accountsAnalyzed: 16,
      hiddenLinksFound: 9,
      manualTimeHours: 6.5,
      agentTimeSeconds: 1.4,
      falsePositiveReduction: '95%'
    },
    signals: [
      { name: 'Multi-Hop Ownership Chain', score: 32, max: 35, desc: '4-tier holding structure crossing British Virgin Islands, Cyprus, and Delaware.' },
      { name: 'Straw / Nominee Director', score: 28, max: 30, desc: 'Dmitri Volkov acts as official director for 420+ unrelated holding corporations.' },
      { name: 'Sanctioned UBO Linkage', score: 24, max: 25, desc: 'Graph ownership resolves to Elena Rostova (80% beneficial interest via trust).' },
      { name: 'High-Value Real Estate Sink', score: 10, max: 10, desc: 'Funds terminal node is an all-cash luxury condo escrow without commercial justification.' }
    ],
    riskScore: 94,
    verdict: 'SANCTIONS EVASION / SHELL NETWORK',
    verdictSummary: 'The agent traversed 4 layers of shell corporations and nominee director filings to resolve the Ultimate Beneficial Owner (UBO). Traditional databases stopped at North Star LLC (Delaware); the graph traced the foreign ownership chain to sanctioned entity Elena Rostova, preventing illegal real estate acquisition.',
    sarReport: {
      filingId: 'SAR-2026-11429-SHELL',
      priority: 'CRITICAL / REGULATORY BLOCK',
      suspectEntities: ['Elena Rostova (Beneficial Owner)', 'Aegis Horizon Ltd (BVI)', 'Vanguard Trust Holdings (Cyprus)', 'North Star Capital LLC (Delaware)'],
      sharedIdentifiers: ['Registered Office: Geneva Trust Chambers #4', 'Escrow Account: ACC-302'],
      totalAmountUSD: '$1,850,000.00',
      timeframe: 'Sep 29, 2026 - Oct 10, 2026',
      narrative: 'Investigation initiated following an incoming $1,850,000 transfer into Manhattan Real Estate Escrow (ACC-302). Entity resolution on North Star Capital LLC traced beneficial control through Vanguard Trust Holdings (Cyprus) and Aegis Horizon Ltd (BVI). Nominee director Dmitri Volkov was identified as a straw person on 400+ corporate filings. Deep graph ownership traversal unmasked Elena Rostova holding 80% beneficial trust equity. Subject is listed on OFAC/EU watchlists. Transaction halted in accordance with Section 312 of the USA PATRIOT Act.'
    },
    steps: [
      {
        id: 1,
        title: 'Ingest Real Estate Escrow Wire Alert',
        detail: 'Escrow account ACC-302 received $1.85M from Delaware entity North Star Capital LLC. Initiated corporate entity graph expansion.',
        highlightNodes: ['ACC-302', 'COMP-03'],
        highlightEdges: ['e_shell_transfer_3'],
        cypher: 'MATCH (c:Company {id: "COMP-03"})-[:TRANSFERRED_TO]->(e:Account {id: "ACC-302"}) RETURN c, e',
        timeMs: 5.2
      },
      {
        id: 2,
        title: 'Traverse Corporate Ownership Upstream',
        detail: 'Queried OWNS relationships: North Star Capital LLC is 100% owned by Vanguard Trust Holdings (Cyprus), which in turn is 100% owned by Aegis Horizon Ltd (BVI).',
        highlightNodes: ['COMP-03', 'COMP-02', 'COMP-01'],
        highlightEdges: ['e_owns_2', 'e_owns_1'],
        cypher: 'MATCH path = (child:Company {id: "COMP-03"})<-[:OWNS*1..3]-(parent:Company)\nRETURN path',
        timeMs: 9.8
      },
      {
        id: 3,
        title: 'Straw Director Cluster Detection',
        detail: 'Queried Director relations: Dmitri Volkov serves as sole director for both Aegis Horizon and Vanguard Trust. Graph intelligence exposes Volkov linked to 420 other shell entities at the same address.',
        highlightNodes: ['COMP-01', 'COMP-02', 'PER-88'],
        highlightEdges: ['e_dir_1', 'e_dir_2'],
        cypher: 'MATCH (p:Person {id: "PER-88"})-[:DIRECTOR_OF]->(c:Company)\nRETURN p, count(c) AS total_directorships',
        timeMs: 12.4
      },
      {
        id: 4,
        title: 'Ultimate Beneficial Owner (UBO) Piercing',
        detail: 'Resolved Aegis Horizon private registry trust deed: Elena Rostova retains 80% beneficial entitlement. Matched against Sanctions Watchlist. Recommended immediate freeze.',
        highlightNodes: ['COMP-01', 'PER-99', 'PER-88', 'COMP-02', 'COMP-03', 'ACC-302'],
        highlightEdges: ['e_owns_ubo', 'e_dir_1', 'e_owns_1', 'e_owns_2', 'e_shell_transfer_3'],
        cypher: 'MATCH (p:Person)-[:BENEFICIAL_OWNER]->(top:Company)-[:OWNS*]->(target:Company)\nWHERE p.sanction_flag = true\nRETURN p, target',
        timeMs: 14.8
      }
    ],
    graphComparison: {
      cypherQuery: `// FalkorDB Cypher: Arbitrary depth corporate veil traversal
MATCH (p:Person)-[b:BENEFICIAL_OWNER|OWNS*1..5]->(c:Company)
WHERE c.name = "North Star Capital LLC"
RETURN p.name, b.percent, p.sanction_flag;`,
      sqlQuery: `-- Relational SQL: Hard-coded self-joins or CTE depth limits fail when shells add extra tiers
WITH RECURSIVE company_hierarchy AS (
  SELECT parent_id, child_id, share_percent, 1 as level
  FROM entity_ownership
  WHERE child_id = 'COMP-03'
  UNION ALL
  SELECT eo.parent_id, eo.child_id, eo.share_percent, ch.level + 1
  FROM entity_ownership eo
  JOIN company_hierarchy ch ON eo.child_id = ch.parent_id
  WHERE ch.level < 5
)
SELECT p.name, p.sanction_flag
FROM company_hierarchy ch
JOIN person_beneficial_owners pbo ON ch.parent_id = pbo.company_id
JOIN persons p ON pbo.person_id = p.id;`,
      cypherStats: { executionMs: '6.8 ms', linesOfCode: 4, joinsNeeded: 0, complexity: 'Index-free adjacency traversal' },
      sqlStats: { executionMs: '980 ms', linesOfCode: 18, joinsNeeded: 5, complexity: 'Recursive B-Tree index scan' }
    },
    nodes: [
      { id: 'COMP-01', label: 'Aegis Horizon Ltd', type: 'company', risk: 95, subtitle: 'BVI Offshore Shell', details: { jurisdiction: 'British Virgin Islands', registered: '2025-11-04', capital: '$10,000' } },
      { id: 'COMP-02', label: 'Vanguard Trust Holdings', type: 'company', risk: 92, subtitle: 'Cyprus Holding Co', details: { jurisdiction: 'Cyprus', registered: '2026-01-18', taxStatus: 'Non-resident' } },
      { id: 'COMP-03', label: 'North Star Capital LLC', type: 'company', risk: 88, subtitle: 'Delaware SPV', details: { jurisdiction: 'Delaware, US', registered: '2026-06-02', purpose: 'Special Purpose Vehicle' } },
      { id: 'PER-99', label: 'Elena Rostova', type: 'person', risk: 98, subtitle: 'Watchlist UBO (80%)', details: { nationality: 'Cyprus/Russia', sanctionStatus: 'EU/OFAC Listed', pep: true } },
      { id: 'PER-88', label: 'Dmitri Volkov', type: 'person', risk: 85, subtitle: 'Straw / Nominee Director', details: { registeredDirectorships: 420, resident: 'Limassol, Cyprus' } },
      { id: 'ACC-301', label: 'Zurich Wire Account', type: 'account', risk: 89, subtitle: 'Swiss Outbound Sink', details: { bank: 'Private Bank Zurich', currency: 'USD' } },
      { id: 'ACC-302', label: 'Manhattan Title Escrow', type: 'account', risk: 84, subtitle: 'Real Estate Escrow Sink', details: { bank: 'JPMorgan Chase NY', purpose: 'Penthouse Purchase' } },
      // Background innocent nodes
      { id: 'COMP-LEGIT', label: 'Stripe Merchant Acc', type: 'company', risk: 3, subtitle: 'Verified SaaS Processor', details: { jurisdiction: 'US', status: 'Active' } },
      { id: 'ACC-309', label: 'Clean Operating Account', type: 'account', risk: 4, subtitle: 'Payroll Account', details: { employees: 24, payrollMonthly: '$140k' } }
    ],
    edges: [
      { id: 'e_owns_ubo', source: 'PER-99', target: 'COMP-01', type: 'owns', label: '80% Beneficial Owner' },
      { id: 'e_dir_1', source: 'PER-88', target: 'COMP-01', type: 'owns', label: 'Nominee Director' },
      { id: 'e_dir_2', source: 'PER-88', target: 'COMP-02', type: 'owns', label: 'Nominee Director' },
      { id: 'e_owns_1', source: 'COMP-01', target: 'COMP-02', type: 'owns', label: '100% Parent Equity' },
      { id: 'e_owns_2', source: 'COMP-02', target: 'COMP-03', type: 'owns', label: '100% Parent Equity' },
      { id: 'e_shell_transfer_1', source: 'ACC-301', target: 'COMP-01', type: 'transfer', label: '$1.85M Inflow' },
      { id: 'e_shell_transfer_3', source: 'COMP-03', target: 'ACC-302', type: 'transfer', label: '$1.85M Wire Escrow', amount: 1850000, animated: true },
      // Background edges
      { id: 'e_bg_c1', source: 'COMP-LEGIT', target: 'ACC-309', type: 'transfer', label: '$12,400 Payroll' }
    ]
  },

  structuring: {
    id: 'structuring',
    name: 'Smurfing & Structuring',
    subtitle: 'Coordinated Split Deposits Evading $10,000 Currency Thresholds',
    badge: 'Synthetic Scenario 03',
    description: 'Coordinated smurf accounts depositing cash just below the $10,000 BSA reporting limit across 4 regional branches, instantly converging funds into an unhosted crypto liquidity pool.',
    alertText: 'ALERT #AML-7714: Four accounts recorded deposits between $9,750 and $9,950 within 90 minutes with zero previous history.',
    category: 'Structuring / Smurfing',
    targetAccount: 'ACC-401',
    impactMetrics: {
      accountsAnalyzed: 12,
      hiddenLinksFound: 6,
      manualTimeHours: 3.5,
      agentTimeSeconds: 0.9,
      falsePositiveReduction: '91%'
    },
    signals: [
      { name: 'Threshold Evasion Clustering', score: 35, max: 35, desc: 'Multiple transactions between $9,700 and $9,950 just under the $10,000 CTR statutory limit.' },
      { name: 'Temporal Synchronization', score: 28, max: 30, desc: '4 cash branch deposits made within a narrow 85-minute window across metropolitan branches.' },
      { name: 'Convergent Outflow Funnel', score: 22, max: 25, desc: 'All structured funds instantly routed to a single counterparty: CRYPTO-OTC-X.' },
      { name: 'Shared IP Subnet & Phone Node', score: 10, max: 10, desc: 'Common telemetry match: subnet 198.51.100.0/29 and phone +1-555-0199.' }
    ],
    riskScore: 92,
    verdict: 'CONFIRMED STRUCTURING (CTR VIOLATION)',
    verdictSummary: 'The agent exposed a classic smurfing funnel. In isolated spreadsheets, each $9,800 deposit looks like a normal sub-threshold transaction that never triggers mandatory regulatory filings. The graph revealed that four depositors share an IP subnet and pooled $39,420 into unhosted OTC crypto broker CRYPTO-OTC-X.',
    sarReport: {
      filingId: 'SAR-2026-07714-SMURF',
      priority: 'HIGH / STRUCTURING VIOLATION',
      suspectEntities: ['ACC-401 (Austin)', 'ACC-402 (Round Rock)', 'ACC-403 (Cedar Park)', 'ACC-404 (San Marcos)'],
      sharedIdentifiers: ['IP Subnet: 198.51.100.0/29', 'Contact Phone: +1-555-0199', 'Sink: CRYPTO-OTC-X'],
      totalAmountUSD: '$39,420.00',
      timeframe: 'Oct 11, 2026 (08:15 AM - 09:40 AM)',
      narrative: 'On Oct 11, 2026, four separate retail bank branches recorded cash deposits: ACC-401 ($9,850), ACC-402 ($9,900), ACC-403 ($9,750), and ACC-404 ($9,920). Each individual transaction falls strictly beneath the mandatory $10,000 Currency Transaction Report (CTR) filing line. Cross-relational graph analysis connected all four individuals to an identical IP subnet and recovery contact. Within 15 minutes of deposit, aggregate funds ($39,420) were wired to CRYPTO-OTC-X. Pattern represents deliberate structuring under 31 U.S.C. 5324.'
    },
    steps: [
      {
        id: 1,
        title: 'Cluster Sub-Threshold Deposits',
        detail: 'Queried transactions between $9,500 and $9,999 in the past 24 hours. Isolated four suspicious accounts in the Austin metro area.',
        highlightNodes: ['ACC-401', 'ACC-402', 'ACC-403', 'ACC-404'],
        highlightEdges: [],
        cypher: 'MATCH (a:Account)-[t:TRANSFERRED_TO]->()\nWHERE t.amount >= 9500 AND t.amount < 10000\nRETURN a, t',
        timeMs: 4.8
      },
      {
        id: 2,
        title: 'Correlate Telemetry & Shared Metadata',
        detail: 'Discovered all 4 accounts authenticate from a tight /29 IP subnet (IP-SUBNET-4) and list identical recovery contact PHONE-0199.',
        highlightNodes: ['ACC-401', 'ACC-402', 'ACC-403', 'ACC-404', 'IP-SUBNET-4', 'PHONE-0199'],
        highlightEdges: ['e_ip_1', 'e_ip_2', 'e_ip_3', 'e_ip_4', 'e_ph_1', 'e_ph_2'],
        cypher: 'MATCH (a:Account)-[:CONNECTS_VIA_IP]->(ip:Device)\nWITH ip, count(a) AS smurfs\nWHERE smurfs > 2\nRETURN ip, smurfs',
        timeMs: 7.9
      },
      {
        id: 3,
        title: 'Identify Single Funnel Destination',
        detail: 'Traced rapid outbound wires dispatched simultaneously at 09:55 AM: all 4 accounts emptied their balances into CRYPTO-OTC-X.',
        highlightNodes: ['ACC-401', 'ACC-402', 'ACC-403', 'ACC-404', 'CRYPTO-OTC-X'],
        highlightEdges: ['e_smurf_1', 'e_smurf_2', 'e_smurf_3', 'e_smurf_4'],
        cypher: 'MATCH (a:Account)-[t:TRANSFERRED_TO]->(dest:Merchant)\nWHERE a.id IN ["ACC-401", "ACC-402", "ACC-403", "ACC-404"]\nRETURN dest, sum(t.amount) AS total_laundered',
        timeMs: 10.3
      }
    ],
    graphComparison: {
      cypherQuery: `// FalkorDB Cypher: Detect convergent smurf funnels under threshold
MATCH (a:Account)-[d:DEPOSITED]->(a)
WHERE d.amount > 9500 AND d.amount < 10000
MATCH (a)-[:CONNECTS_VIA_IP]->(ip:Device)
MATCH (a)-[:TRANSFERRED_TO]->(sink:Merchant)
RETURN ip, sink, count(a) AS smurf_count, sum(d.amount) AS total
HAVING smurf_count >= 3;`,
      sqlQuery: `-- Relational SQL: Grouping by proximity in time, amount, and auxiliary tables
SELECT da.ip_address, t_out.recipient_id, COUNT(DISTINCT d.account_id) AS smurf_count,
       SUM(d.amount) AS total_structured
FROM deposits d
JOIN device_auths da ON d.account_id = da.account_id
JOIN transactions t_out ON d.account_id = t_out.sender_id
WHERE d.amount BETWEEN 9500 AND 9999
  AND d.timestamp >= NOW() - INTERVAL '24 hours'
GROUP BY da.ip_address, t_out.recipient_id
HAVING COUNT(DISTINCT d.account_id) >= 3;`,
      cypherStats: { executionMs: '5.2 ms', linesOfCode: 7, joinsNeeded: 0, complexity: 'O(k) Subgraph Match' },
      sqlStats: { executionMs: '820 ms', linesOfCode: 12, joinsNeeded: 3, complexity: 'Multi-table scan & aggregate lock' }
    },
    nodes: [
      { id: 'ACC-401', label: 'ACC-401 (Austin South)', type: 'account', risk: 91, subtitle: 'Deposited: $9,850', details: { branch: 'Austin South', time: '08:20 AM', amount: '$9,850' } },
      { id: 'ACC-402', label: 'ACC-402 (Round Rock)', type: 'account', risk: 90, subtitle: 'Deposited: $9,900', details: { branch: 'Round Rock', time: '08:44 AM', amount: '$9,900' } },
      { id: 'ACC-403', label: 'ACC-403 (Cedar Park)', type: 'account', risk: 89, subtitle: 'Deposited: $9,750', details: { branch: 'Cedar Park', time: '09:05 AM', amount: '$9,750' } },
      { id: 'ACC-404', label: 'ACC-404 (San Marcos)', type: 'account', risk: 93, subtitle: 'Deposited: $9,920', details: { branch: 'San Marcos', time: '09:32 AM', amount: '$9,920' } },
      { id: 'IP-SUBNET-4', label: 'Subnet 198.51.100.0/29', type: 'device', risk: 95, subtitle: 'Shared VPN Gateway', details: { range: '198.51.100.1-8', asn: 'AS-PRIV-HOST' } },
      { id: 'PHONE-0199', label: '+1 (555) 019-9281', type: 'person', risk: 86, subtitle: 'Coordinated Contact', details: { carrier: 'Burner VOIP', matchType: 'Recovery SMS' } },
      { id: 'CRYPTO-OTC-X', label: 'CRYPTO-OTC-X Gateway', type: 'merchant', risk: 97, subtitle: 'Unhosted Pool ($39,420)', details: { type: 'OTC Broker', jurisdiction: 'Offshore Unlicensed' } },
      // Background innocent nodes
      { id: 'ACC-501', label: 'ACC-501 (Clean Retail)', type: 'account', risk: 6, subtitle: 'Regular Grocery Account', details: { averageMonthly: '$2,400' } }
    ],
    edges: [
      { id: 'e_smurf_1', source: 'ACC-401', target: 'CRYPTO-OTC-X', type: 'transfer', label: '$9,850 Wire', amount: 9850, animated: true },
      { id: 'e_smurf_2', source: 'ACC-402', target: 'CRYPTO-OTC-X', type: 'transfer', label: '$9,900 Wire', amount: 9900, animated: true },
      { id: 'e_smurf_3', source: 'ACC-403', target: 'CRYPTO-OTC-X', type: 'transfer', label: '$9,750 Wire', amount: 9750, animated: true },
      { id: 'e_smurf_4', source: 'ACC-404', target: 'CRYPTO-OTC-X', type: 'transfer', label: '$9,920 Wire', amount: 9920, animated: true },
      { id: 'e_ip_1', source: 'ACC-401', target: 'IP-SUBNET-4', type: 'shares-device', label: 'Subnet IP' },
      { id: 'e_ip_2', source: 'ACC-402', target: 'IP-SUBNET-4', type: 'shares-device', label: 'Subnet IP' },
      { id: 'e_ip_3', source: 'ACC-403', target: 'IP-SUBNET-4', type: 'shares-device', label: 'Subnet IP' },
      { id: 'e_ip_4', source: 'ACC-404', target: 'IP-SUBNET-4', type: 'shares-device', label: 'Subnet IP' },
      { id: 'e_ph_1', source: 'ACC-401', target: 'PHONE-0199', type: 'shares-address', label: 'Recovery Phone' },
      { id: 'e_ph_2', source: 'ACC-403', target: 'PHONE-0199', type: 'shares-address', label: 'Recovery Phone' }
    ]
  }
};
