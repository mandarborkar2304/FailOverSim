import { useState, useEffect, useCallback } from 'react';
import { NetworkState, Node, Link } from '../types';

const INITIAL_STATE: NetworkState = {
  nodes: [
    {
      id: 'server-1',
      type: 'server',
      status: 'healthy',
      metrics: { latency: 20, packetLoss: 0, cpu: 45, memory: 60 },
    },
    {
      id: 'server-2',
      type: 'server',
      status: 'healthy',
      metrics: { latency: 18, packetLoss: 0, cpu: 35, memory: 55 },
    },
    {
      id: 'router-1',
      type: 'router',
      status: 'healthy',
      metrics: { latency: 5, packetLoss: 0, cpu: 25, memory: 40 },
    },
    {
      id: 'db-1',
      type: 'database',
      status: 'healthy',
      metrics: { latency: 15, packetLoss: 0, cpu: 55, memory: 70 },
    },
  ],
  links: [
    { source: 'router-1', target: 'server-1', status: 'active', bandwidth: 5 },
    { source: 'router-1', target: 'server-2', status: 'active', bandwidth: 5 },
    { source: 'server-1', target: 'db-1', status: 'active', bandwidth: 3 },
    { source: 'server-2', target: 'db-1', status: 'active', bandwidth: 3 },
  ],
};

export const useNetworkSimulation = () => {
  const [networkState, setNetworkState] = useState<NetworkState>(INITIAL_STATE);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const updateNodeMetrics = useCallback((node: Node) => {
    const jitter = Math.random() * 10 - 5;
    return {
      ...node,
      metrics: {
        latency: Math.max(0, Math.min(200, node.metrics.latency + jitter)),
        packetLoss: Math.max(0, Math.min(100, node.metrics.packetLoss + (Math.random() * 2 - 1))),
        cpu: Math.max(0, Math.min(100, node.metrics.cpu + (Math.random() * 4 - 2))),
        memory: Math.max(0, Math.min(100, node.metrics.memory + (Math.random() * 2 - 1))),
      },
    };
  }, []);

  const simulateFailure = useCallback(() => {
    const randomNode = networkState.nodes[Math.floor(Math.random() * networkState.nodes.length)];
    setNetworkState(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === randomNode.id
          ? {
              ...node,
              status: 'failed',
              metrics: {
                latency: 200,
                packetLoss: 100,
                cpu: 100,
                memory: 100,
              },
            }
          : node
      ),
      links: prev.links.map(link =>
        link.source === randomNode.id || link.target === randomNode.id
          ? { ...link, status: 'failed' }
          : link
      ),
    }));
  }, [networkState.nodes]);

  const reset = useCallback(() => {
    setNetworkState(INITIAL_STATE);
    setSelectedNode(null);
  }, []);

  useEffect(() => {
    let intervalId: number;

    if (isSimulating) {
      intervalId = window.setInterval(() => {
        setNetworkState(prev => ({
          ...prev,
          nodes: prev.nodes.map(node =>
            node.status !== 'failed' ? updateNodeMetrics(node) : node
          ),
        }));
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSimulating, updateNodeMetrics]);

  return {
    networkState,
    isSimulating,
    selectedNode,
    setIsSimulating,
    setSelectedNode,
    simulateFailure,
    reset,
  };
};