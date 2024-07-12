import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import CustomNode from '../components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: 'Math 235' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', type: 'output', position: { x: 0, y: 200 }, data: { label: '3' } },
  { id: '4', type: 'custom', position: { x: 0, y: 300 }, data: { title: 'Custom Node 1', subline: 'api.ts' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true}
];
 
export default function Playground() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (changes) => setEdges((eds) => addEdge(changes, eds)),
    [setEdges],
  );
  

 
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode='dark'
        nodeTypes={nodeTypes}
      >
      <Controls />
      <MiniMap />
      <Background variant = "dots" gap = {12} size = {1} />
      </ReactFlow>
    </div>
  );
}