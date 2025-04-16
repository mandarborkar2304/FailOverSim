import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NetworkState, Node, Link } from '../types';
import { Server, Router, Database } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

interface NetworkGraphProps {
  data: NetworkState;
  onNodeClick: (node: Node) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(data.links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw links
    const links = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', d => d.status === 'active' ? '#4CAF50' : '#f44336')
      .attr('stroke-width', d => Math.sqrt(d.bandwidth));

    // Create node groups
    const nodes = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add node backgrounds
    nodes.append('circle')
      .attr('r', 25)
      .attr('fill', d => {
        switch (d.status) {
          case 'healthy': return '#4CAF50';
          case 'warning': return '#FFC107';
          case 'failed': return '#f44336';
          default: return '#9E9E9E';
        }
      });

    // Add node icons (using foreignObject)
    nodes.append('foreignObject')
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', -15)
      .attr('y', -15)
      .attr('class', 'flex items-center justify-center')
      .html(d => {
        const iconColor = '#ffffff';
        const iconSize = 24;
        switch (d.type) {
          case 'server':
            return ReactDOMServer.renderToString(
              <div className="flex items-center justify-center w-full h-full">
                <Server color={iconColor} size={iconSize} />
              </div>
            );
          case 'router':
            return ReactDOMServer.renderToString(
              <div className="flex items-center justify-center w-full h-full">
                <Router color={iconColor} size={iconSize} />
              </div>
            );
          case 'database':
            return ReactDOMServer.renderToString(
              <div className="flex items-center justify-center w-full h-full">
                <Database color={iconColor} size={iconSize} />
              </div>
            );
          default:
            return '';
        }
      });

    // Add node labels
    nodes.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', 40)
      .attr('fill', '#ffffff')
      .attr('font-size', '12px');

    // Add click handler
    nodes.on('click', (event, d) => onNodeClick(d));

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      nodes
        .attr('transform', d => `translate(${(d as any).x},${(d as any).y})`);
    });

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, onNodeClick]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full bg-gray-900 rounded-lg"
    />
  );
};

export default NetworkGraph;