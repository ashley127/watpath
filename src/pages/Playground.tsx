import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ColorMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PlaceholdersAndVanishInput } from '../components/placeholders-and-vanish-input';
import { useSearchParams } from 'react-router-dom';

interface Node {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type?: string;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: -100, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges: Edge[] = [];

function Playground() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const addNodeToPlayground = useCallback((label: string) => {
    // Add the node directly to the state
    setNodes((nds) => [
      ...nds,
      {
        id: `node-${nds.length + 1}`,
        data: { label },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      },
    ]);
  }, []);

  useEffect(() => {
    const searchValue = searchParams.get('search');
    if (searchValue) {
      addNodeToPlayground(searchValue);
      // Clear the search parameter immediately
      setSearchParams({});
    }
  }, [searchParams, setSearchParams, addNodeToPlayground]);

  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with value:', searchValue);
  };

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'black', position: 'relative'}}>
      <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', width: '90%', zIndex: 1000 }}>
        <PlaceholdersAndVanishInput 
          placeholders={['Search for a course', 'The future is in yours']}
          onChange={handleChange} 
          onSubmit={onSubmit} 
        />
      </div>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode='dark'
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Playground;

