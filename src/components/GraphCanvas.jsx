import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

const NODE_COLORS = {
  account: '#3b82f6',  // blue
  person: '#10b981',   // emerald
  company: '#8b5cf6',  // purple
  device: '#f59e0b',   // amber
  merchant: '#ec4899'  // pink
};

const EDGE_COLORS = {
  transfer: '#06b6d4',      // cyan
  owns: '#a855f7',          // purple
  'shares-device': '#f59e0b', // amber
  'shares-address': '#10b981' // emerald
};

export default function GraphCanvas({
  scenario,
  activeStep,
  selectedNode,
  onSelectNode
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Initialize and update Cytoscape graph
  useEffect(() => {
    if (!containerRef.current) return;

    // Build elements
    const elements = [
      ...scenario.nodes.map(n => ({
        group: 'nodes',
        data: {
          id: n.id,
          label: n.label,
          type: n.type,
          risk: n.risk,
          subtitle: n.subtitle,
          details: n.details,
          color: NODE_COLORS[n.type] || '#64748b',
          size: Math.max(40, Math.min(68, 36 + (n.risk / 100) * 32))
        }
      })),
      ...scenario.edges.map(e => ({
        group: 'edges',
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          type: e.type,
          label: e.label,
          amount: e.amount || 0,
          color: EDGE_COLORS[e.type] || '#94a3b8'
        }
      }))
    ];

    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      minZoom: 0.35,
      maxZoom: 2.0,
      wheelSensitivity: 0.3,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'color': '#ffffff',
            'font-family': 'Inter, sans-serif',
            'font-size': '10px',
            'font-weight': 600,
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'text-background-color': '#090d16',
            'text-background-opacity': 0.9,
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle',
            'width': 'data(size)',
            'height': 'data(size)',
            'border-width': 2,
            'border-color': '#334155',
            'transition-property': 'background-color, border-color, border-width, opacity, width, height',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'node[risk >= 75]',
          style: {
            'border-width': 3,
            'border-color': '#ef4444',
            'shadow-blur': 16,
            'shadow-color': '#ef4444',
            'shadow-opacity': 0.7
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            'shadow-blur': 25,
            'shadow-color': '#38bdf8',
            'shadow-opacity': 0.9
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.1,
            'label': 'data(label)',
            'font-family': 'JetBrains Mono, monospace',
            'font-size': '9px',
            'font-weight': 500,
            'color': '#cbd5e1',
            'text-background-color': '#090d16',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'text-rotation': 'autorotate',
            'opacity': 0.85,
            'transition-property': 'width, line-color, opacity',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'edge[type = "shares-device"]',
          style: {
            'line-style': 'dashed',
            'line-dash-pattern': [6, 3]
          }
        },
        {
          selector: 'edge[type = "shares-address"]',
          style: {
            'line-style': 'dotted',
            'line-dash-pattern': [3, 3]
          }
        },
        {
          selector: '.highlighted',
          style: {
            'border-color': '#ef4444',
            'border-width': 4,
            'shadow-blur': 28,
            'shadow-color': '#ef4444',
            'shadow-opacity': 1,
            'opacity': 1,
            'z-index': 999
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'width': 4,
            'line-color': '#f43f5e',
            'target-arrow-color': '#f43f5e',
            'color': '#fecdd3',
            'opacity': 1,
            'z-index': 998
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.15,
            'text-opacity': 0.15
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: false,
        randomize: false,
        componentSpacing: 60,
        nodeRepulsion: () => 320000,
        nodeOverlap: 25,
        idealEdgeLength: () => 110,
        edgeElasticity: () => 100,
        nestingFactor: 5,
        gravity: 45,
        numIter: 400
      }
    });

    setTimeout(() => {
      cy.resize();
      cy.fit(undefined, 50);
    }, 60);

    // Node click
    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data();
      const rawNode = scenario.nodes.find(n => n.id === nodeData.id);
      if (rawNode) {
        onSelectNode(rawNode);
      }
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        onSelectNode(null);
      }
    });

    // Hover tooltip
    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      const renderedPos = node.renderedPosition();
      const nodeData = scenario.nodes.find(n => n.id === node.id());
      setHoveredNode(nodeData);
      setTooltipPos({ x: renderedPos.x, y: renderedPos.y });
    });

    cy.on('mouseout', 'node', () => {
      setHoveredNode(null);
    });

    cyRef.current = cy;

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [scenario]);

  // Handle active step highlighting & evidence dimming
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    cy.batch(() => {
      cy.elements().removeClass('highlighted dimmed');

      if (activeStep) {
        const targetNodes = new Set(activeStep.highlightNodes || []);
        const targetEdges = new Set(activeStep.highlightEdges || []);

        cy.nodes().forEach(node => {
          if (targetNodes.has(node.id())) {
            node.addClass('highlighted');
          } else {
            node.addClass('dimmed');
          }
        });

        cy.edges().forEach(edge => {
          if (targetEdges.has(edge.id())) {
            edge.addClass('highlighted');
          } else {
            edge.addClass('dimmed');
          }
        });

        const highlightedNodes = cy.nodes('.highlighted');
        if (highlightedNodes.length === 1) {
          cy.animate({
            center: { eles: highlightedNodes },
            zoom: 1.15,
            duration: 400
          });
        } else if (highlightedNodes.length > 1) {
          cy.animate({
            fit: {
              eles: highlightedNodes,
              padding: 90
            },
            duration: 400
          });
        }
      } else {
        cy.fit(undefined, 50);
      }
    });
  }, [activeStep]);

  // Controls
  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.3);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() / 1.3);
  const handleFit = () => cyRef.current?.fit(undefined, 40);
  const handleReset = () => {
    if (!cyRef.current) return;
    cyRef.current.elements().removeClass('highlighted dimmed');
    cyRef.current.fit(undefined, 50);
  };

  return (
    <div className="relative w-full h-[580px] bg-[#090e1a] rounded-xl border border-slate-800/80 shadow-2xl overflow-hidden">
      {/* Top Bar inside Graph Canvas */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Graph Legend & Status */}
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs shadow-lg">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-semibold text-slate-200">Interactive Graph Centerpiece</span>
          </div>

          <div className="h-3 w-[1px] bg-slate-700 mx-1" />

          {/* Node Types Legend */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Account
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Person
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Company
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Device
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Merchant
            </span>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleFit}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Fit to Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Reset View & Un-dim"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Cytoscape Graph Canvas DOM Container */}
      <div
        ref={containerRef}
        style={{ width: '100%', height: '580px', minHeight: '580px' }}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-grid-pattern"
      />

      {/* Edge Types Sub-Legend */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-3 shadow-lg">
        <span className="font-semibold text-slate-300">Edges:</span>
        <span className="flex items-center gap-1 text-cyan-400">
          <span className="w-3 h-0.5 bg-cyan-400" /> Transfer
        </span>
        <span className="flex items-center gap-1 text-purple-400">
          <span className="w-3 h-0.5 bg-purple-400" /> Owns
        </span>
        <span className="flex items-center gap-1 text-amber-400">
          <span className="w-3 h-0.5 border-t border-dashed border-amber-400" /> Shares Device
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-3 h-0.5 border-t border-dotted border-emerald-400" /> Shares Address
        </span>
      </div>

      {/* Risk Pulsing Alert Overlay Pill */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-auto bg-red-950/70 border border-red-500/40 text-red-300 px-3 py-1.5 rounded-lg backdrop-blur-md text-xs flex items-center gap-2 shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
        <span className="font-mono font-medium">Nodes with Risk &ge; 75 pulse in red</span>
      </div>

      {/* Floating Tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-30 pointer-events-none bg-slate-950/95 border border-slate-700/80 rounded-lg p-2.5 shadow-2xl text-xs backdrop-blur-md transition-all duration-75 min-w-[200px]"
          style={{
            left: `${Math.min(window.innerWidth - 250, tooltipPos.x + 15)}px`,
            top: `${Math.max(10, tooltipPos.y - 40)}px`
          }}
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
            <span className="font-bold text-slate-100 flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: NODE_COLORS[hoveredNode.type] }}
              />
              {hoveredNode.label}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              hoveredNode.risk >= 75 ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
              hoveredNode.risk >= 40 ? 'bg-amber-500/20 text-amber-400' :
              'bg-emerald-500/20 text-emerald-400'
            }`}>
              Risk: {hoveredNode.risk}
            </span>
          </div>
          <p className="text-slate-400 text-[11px] mb-1">{hoveredNode.subtitle}</p>
          <div className="text-[10px] text-slate-500 font-mono">
            Click node for full transaction history & dossier
          </div>
        </div>
      )}
    </div>
  );
}
