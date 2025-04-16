export interface Node {
  id: string;
  type: 'server' | 'router' | 'database';
  status: 'healthy' | 'warning' | 'failed';
  metrics: {
    latency: number;
    packetLoss: number;
    cpu: number;
    memory: number;
  };
}

export interface Link {
  source: string;
  target: string;
  status: 'active' | 'failed';
  bandwidth: number;
}

export interface NetworkState {
  nodes: Node[];
  links: Link[];
}