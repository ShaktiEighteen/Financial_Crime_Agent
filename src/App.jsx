import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactStrip from './components/ImpactStrip';
import GraphCanvas from './components/GraphCanvas';
import AgentTimeline from './components/AgentTimeline';
import ObservabilityPanel from './components/ObservabilityPanel';
import RiskVerdictCard from './components/RiskVerdictCard';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import AboutSection from './components/AboutSection';
import NodeDetailModal from './components/NodeDetailModal';
import DemoScriptModal from './components/DemoScriptModal';
import Footer from './components/Footer';
import { SCENARIOS } from './data/scenarios';

export default function App() {
  const [scenarioKey, setScenarioKey] = useState('fraud_ring');
  const [currentStepIndex, setCurrentStepIndex] = useState(null); // null = full graph visible
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDemoScriptOpen, setIsDemoScriptOpen] = useState(false);

  const scenario = SCENARIOS[scenarioKey];
  const steps = scenario.steps;
  const activeStep = currentStepIndex !== null ? steps[currentStepIndex] : null;

  // Auto-play timeline timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev === null) return 0;
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            setWalkthroughStep(3);
            return prev;
          }
        });
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  // When changing scenario, reset states
  const handleSelectScenario = (key) => {
    setScenarioKey(key);
    setCurrentStepIndex(null);
    setIsPlaying(false);
    setIsInvestigating(false);
    setWalkthroughStep(1);
    setSelectedNode(null);
  };

  // Run sample investigation handler
  const handleRunInvestigation = () => {
    setIsInvestigating(true);
    setCurrentStepIndex(0);
    setWalkthroughStep(2);
    setIsPlaying(true);

    setTimeout(() => {
      setIsInvestigating(false);
    }, 1200);
  };

  // 3-Step Walkthrough pill handler
  const handleWalkthroughStepChange = (stepNum) => {
    setWalkthroughStep(stepNum);
    setIsPlaying(false);
    if (stepNum === 1) {
      setCurrentStepIndex(0);
    } else if (stepNum === 2) {
      setCurrentStepIndex(Math.min(1, steps.length - 1));
    } else if (stepNum === 3) {
      setCurrentStepIndex(steps.length - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex === null) {
      setCurrentStepIndex(0);
      setWalkthroughStep(2);
      return;
    }
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === steps.length - 1) {
        setWalkthroughStep(3);
      } else {
        setWalkthroughStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex !== null && currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      if (prevIdx === 0) setWalkthroughStep(1);
      else setWalkthroughStep(2);
    } else if (currentStepIndex === 0) {
      setCurrentStepIndex(null);
      setWalkthroughStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#ece7de] flex flex-col font-serif selection:bg-[#c92a2a]/30 selection:text-[#fff]">
      {/* Top Header */}
      <Header onOpenDemoScript={() => setIsDemoScriptOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* Module 1: Hero & Scenario Selector */}
        <Hero
          scenarioKey={scenarioKey}
          onSelectScenario={handleSelectScenario}
          scenarios={SCENARIOS}
          onRunInvestigation={handleRunInvestigation}
          isInvestigating={isInvestigating}
          walkthroughStep={walkthroughStep}
          onWalkthroughStepChange={handleWalkthroughStepChange}
        />

        {/* Module 9: Forensic Case Ledger Strip */}
        <ImpactStrip metrics={scenario.impactMetrics} scenario={scenario} />

        {/* Centerpiece Grid: Interactive Graph + Agent Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Canvas & Architecture) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Module 2 & 3: Interactive Cytoscape Transaction Graph */}
            <GraphCanvas
              scenario={scenario}
              activeStep={activeStep}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
            />

            {/* Module 8: System Architecture Schematic */}
            <ArchitectureDiagram />
          </div>

          {/* Right Column (Reasoning, Observability, Verdict) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Module 4: Agent Reasoning Timeline */}
            <AgentTimeline
              steps={steps}
              currentStepIndex={currentStepIndex}
              onSelectStep={(idx) => {
                setCurrentStepIndex(idx);
                setIsPlaying(false);
                if (idx === 0) setWalkthroughStep(1);
                else if (idx === steps.length - 1) setWalkthroughStep(3);
                else setWalkthroughStep(2);
              }}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />

            {/* Module 5: Observability & Cypher vs SQL Studio */}
            <ObservabilityPanel
              activeStep={activeStep}
              comparison={scenario.graphComparison}
              scenario={scenario}
            />

            {/* Module 6: Risk Verdict Card & SAR Generator */}
            <RiskVerdictCard scenario={scenario} />
          </div>
        </div>

        {/* Step 4: Human Copywriting - Why We Built This & Limitations */}
        <AboutSection />
      </main>

      {/* Node Detail Flyout Drawer */}
      <NodeDetailModal
        node={selectedNode}
        scenario={scenario}
        onClose={() => setSelectedNode(null)}
      />

      {/* 2-Minute Demo Script Modal */}
      <DemoScriptModal
        isOpen={isDemoScriptOpen}
        onClose={() => setIsDemoScriptOpen(false)}
      />

      {/* Module 10: Footer */}
      <Footer onOpenDemoScript={() => setIsDemoScriptOpen(true)} />
    </div>
  );
}

