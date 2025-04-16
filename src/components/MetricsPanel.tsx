import React from 'react';
import { Node } from '../types';
import { Activity, Cpu, MemoryStick as Memory, WifiOff } from 'lucide-react';

interface MetricsPanelProps {
  node: Node | null;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ node }) => {
  if (!node) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Select a node to view metrics</p>
      </div>
    );
  }

  const statusColor = {
    healthy: 'text-green-500',
    warning: 'text-yellow-500',
    failed: 'text-red-500',
  }[node.status];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{node.id}</h2>
        <span className={`${statusColor} font-semibold capitalize`}>{node.status}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-400" size={18} />
            <span className="text-gray-300 text-sm">Latency</span>
          </div>
          <p className="text-xl font-bold">{node.metrics.latency}ms</p>
        </div>

        <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="text-red-400" size={18} />
            <span className="text-gray-300 text-sm">Packet Loss</span>
          </div>
          <p className="text-xl font-bold">{node.metrics.packetLoss}%</p>
        </div>

        <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="text-green-400" size={18} />
            <span className="text-gray-300 text-sm">CPU Usage</span>
          </div>
          <p className="text-xl font-bold">{node.metrics.cpu}%</p>
        </div>

        <div className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Memory className="text-purple-400" size={18} />
            <span className="text-gray-300 text-sm">Memory Usage</span>
          </div>
          <p className="text-xl font-bold">{node.metrics.memory}%</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;