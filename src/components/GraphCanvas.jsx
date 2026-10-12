import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

const NODE_COLORS = {
  account: '#ded9ce',  // Archival token
  person: '#a8a294',   // Individual dossier token
  company: '#c2b49d',  // Corporate entity
  device: '#c27803',   // Hardware asset amber
  merchant: '#b04a4a'  // Offshore gateway
};

const EDGE_COLORS = {
  transfer: '#8c8679',        // Wire transfer ink
  owns: '#6e685d',            // Legal ownership
  'shares-device': '#c27803', // Hardware collision
  'shares-address': '#7a7468' // Address collision
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
          color: NODE_COLORS[n.type] || '#8c8679',
          size: Math.max(38, Math.min(62, 34 + (n.risk / 100) * 28))
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
          color: EDGE_COLORS[e.type] || '#7a7468'
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
      maxZoom: 2.2,
      wheelSensitivity: 0.3,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'color': '#faf7f2',
            'font-family': 'Space Mono, monospace',
            'font-size': '9px',
            'font-weight': 700,
            'text-valign': 'bottom',
            'text-margin-y': 5,
            'text-background-color': '#161513',
            'text-background-opacity': 0.95,
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle',
            'text-border-color': '#2c2924',
            'text-border-width': 1,
            'width': 'data(size)',
            'height': 'data(size)',
            'border-width': 2,
            'border-color': '#2c2924',
            'transition-property': 'background-color, border-color, border-width, opacity, width, height',
            'transition-duration': '0.2s'
          }
        },
        {
          selector: 'node[type = "device"]',
          style: {
            'shape': 'round-rectangle',
            'border-color': '#5a3507'
          }
        },
        {
          selector: 'node[type = "merchant"]',
          style: {
            'shape': 'diamond',
            'border-color': '#5c1919'
          }
        },
        {
          selector: 'node[risk >= 75]',
          style: {
            'border-width': 3,
            'border-color': '#c92a2a',
            'border-style': 'solid'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#c27803'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1.8,
            'line-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.0,
            'label': 'data(label)',
            'font-family': 'Space Mono, monospace',
            'font-size': '8px',
            'font-weight': 400,
            'color': '#a8a294',
            'text-background-color': '#161513',
            'text-background-opacity': 0.9,
            'text-background-padding': '2px',
            'text-rotation': 'autorotate',
            'opacity': 0.85,
            'transition-property': 'width, line-color, opacity',
            'transition-duration': '0.2s'
          }
        },
        {
          selector: 'edge[type = "shares-device"]',
          style: {
            'line-style': 'dashed',
            'line-dash-pattern': [5, 3]
          }
        },
        {
          selector: 'edge[type = "shares-address"]',
          style: {
            'line-style': 'dotted',
            'line-dash-pattern': [2, 3]
          }
        },
        {
          selector: '.highlighted',
          style: {
            'border-color': '#c92a2a',
            'border-width': 4,
            'background-color': '#e03131',
            'color': '#faf7f2',
            'opacity': 1,
            'z-index': 999
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'width': 3.5,
            'line-color': '#c92a2a',
            'target-arrow-color': '#c92a2a',
            'color': '#faf7f2',
            'opacity': 1,
            'z-index': 998
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.12,
            'text-opacity': 0.12
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

    const resizeTimer = setTimeout(() => {
      if (cy && !cy.destroyed()) {
        cy.resize();
        cy.fit(undefined, 50);
      }
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
      if (cy.destroyed()) return;
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
      clearTimeout(resizeTimer);
      if (cy && !cy.destroyed()) {
        cy.destroy();
      }
      if (cyRef.current === cy) {
        cyRef.current = null;
      }
    };
  }, [scenario]);

  // Handle active step highlighting & evidence dimming
  useEffect(() => {
    if (!cyRef.current || cyRef.current.destroyed()) return;
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
            duration: 350
          });
        } else if (highlightedNodes.length > 1) {
          cy.animate({
            fit: {
              eles: highlightedNodes,
              padding: 90
            },
            duration: 350
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
    <div className="relative w-full h-[580px] bg-[#161513] border border-[#2c2924] overflow-hidden">
      {/* Top Bar inside Graph Canvas */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Graph Legend & Status Header */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#1a1917] px-2.5 py-1.5 border border-[#2c2924] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#c92a2a]"></span>
            <span className="font-mono text-[10px] font-bold text-[#faf7f2]">
              TOPOLOGY CANVAS
            </span>
          </div>

          <div className="hidden sm:block h-3 w-[1px] bg-[#2c2924] mx-1" />

          {/* Node Types Legend */}
          <div className="hidden sm:flex items-center gap-2.5 text-[10px] font-mono text-[#9e988a]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ded9ce]" /> Account
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#a8a294]" /> Person
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#c2b49d]" /> Shell Co
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#c27803]" /> Device
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rotate-45 bg-[#b04a4a]" /> Merchant
            </span>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1 pointer-events-auto bg-[#1a1917] p-1 border border-[#2c2924]">
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-[#22201d] text-[#9e988a] hover:text-[#ece7de] transition cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-[#22201d] text-[#9e988a] hover:text-[#ece7de] transition cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleFit}
            className="p-1.5 hover:bg-[#22201d] text-[#9e988a] hover:text-[#ece7de] transition cursor-pointer"
            title="Fit to Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-[#22201d] text-[#9e988a] hover:text-[#ece7de] transition cursor-pointer"
            title="Reset View & Un-dim"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Cytoscape Graph Canvas DOM Container */}
      <div
        ref={containerRef}
        style={{ width: '100%', height: '580px', minHeight: '580px' }}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-ledger-ruled"
      />

      {/* Edge Types Sub-Legend & Forensic Annotation */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-auto bg-[#1a1917] px-2.5 py-1 border border-[#2c2924] text-[9px] font-mono text-[#9e988a] flex items-center gap-2">
        <span className="font-bold text-[#ece7de]">EDGES:</span>
        <span className="flex items-center gap-1 text-[#8c8679]">
          <span className="w-2 h-0.5 bg-[#8c8679]" /> Transfer
        </span>
        <span className="flex items-center gap-1 text-[#6e685d]">
          <span className="w-2 h-0.5 bg-[#6e685d]" /> Owns
        </span>
        <span className="flex items-center gap-1 text-[#c27803]">
          <span className="w-2 h-0.5 border-t border-dashed border-[#c27803]" /> Device
        </span>
      </div>

      {/* Forensic Stamped Risk Badge */}
      <div className="hidden sm:flex absolute bottom-3 right-3 z-10 pointer-events-auto bg-[#251212] border border-[#5c1919] text-[#e03131] px-2.5 py-1 text-[10px] font-mono font-bold items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#e03131]" />
        <span>EVIDENCE STAMP: RISK &ge; 75 OUTLINED IN CRIMSON</span>
      </div>

      {/* Floating Tooltip - Typewriter Style */}
      {hoveredNode && (
        <div
          className="absolute z-30 pointer-events-none bg-[#1a1917] border border-[#3f3b34] p-3 text-xs min-w-[210px] shadow-lg font-mono"
          style={{
            left: `${Math.min(window.innerWidth - 250, tooltipPos.x + 15)}px`,
            top: `${Math.max(10, tooltipPos.y - 40)}px`
          }}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#2c2924] pb-1.5 mb-1.5">
            <span className="font-bold text-[#faf7f2] flex items-center gap-1.5">
              <span
                className="w-2 h-2"
                style={{ backgroundColor: NODE_COLORS[hoveredNode.type] }}
              />
              {hoveredNode.label}
            </span>
            <span className={`px-1 py-0.5 text-[9px] font-bold ${
              hoveredNode.risk >= 75 ? 'bg-[#251212] text-[#e03131] border border-[#5c1919]' :
              hoveredNode.risk >= 40 ? 'bg-[#26180a] text-[#c27803] border border-[#5a3507]' :
              'bg-[#1a2418] text-[#2b8a3e] border border-[#1e3a1b]'
            }`}>
              RISK: {hoveredNode.risk}
            </span>
          </div>
          <p className="text-[#9e988a] text-[11px] mb-1 font-serif">{hoveredNode.subtitle}</p>
          <div className="text-[9px] text-[#656157]">
            [Click node for full transaction history &amp; dossier]
          </div>
        </div>
      )}
    </div>
  );
}

