import React from 'react';
import NetworkGraph from './components/NetworkGraph';
import MetricsPanel from './components/MetricsPanel';
import ControlPanel from './components/ControlPanel';
import { useNetworkSimulation } from './hooks/useNetworkSimulation';
import { Activity } from 'lucide-react';

function App() {
  const {
    networkState,
    isSimulating,
    selectedNode,
    setIsSimulating,
    setSelectedNode,
    simulateFailure,
    reset,
  } = useNetworkSimulation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm fixed top-0 w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Activity size={32} className="text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">FailOverSim</h1>
              <p className="text-sm text-gray-400">Network Failure Simulation Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Network Graph */}
          <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 h-[600px]">
            <NetworkGraph
              data={networkState}
              onNodeClick={setSelectedNode}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metrics Panel */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <MetricsPanel node={selectedNode} />
            </div>

            {/* Control Panel */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <ControlPanel
                isSimulating={isSimulating}
                onToggleSimulation={() => setIsSimulating(!isSimulating)}
                onTriggerFailure={simulateFailure}
                onReset={reset}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;