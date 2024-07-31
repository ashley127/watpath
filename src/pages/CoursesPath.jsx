import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import dagre from 'dagre';

import '@xyflow/react/dist/style.css';
import { useCourses } from '../components/CourseContext';

import { PlaceholdersAndVanishInput } from '../components/placeholders-and-vanish-input';

import { useSearchParams } from 'react-router-dom';

const buildBlueprint = (course, coursesMap) => {
  let nodes = [];
  let edges = [];
  let treeMapping = new Map();
  let treeMappingCnt = 0;
  let treeMappingConnectionCnt = 0;

  const traverseCourse = (course) => {
    if (coursesMap.has(course)) {
      const cur = coursesMap.get(course);

      if (!treeMapping.has(course)) {
        nodes.push({
          id: `TreeNode${treeMappingCnt}`,
          data: { label: `${course}` },
          position: { x: 0, y: 0 },
        });

        treeMapping.set(course, treeMappingCnt);
        treeMappingCnt++;
      }

      cur.preReqs.forEach((c) => {
        if (!treeMapping.has(c)) {
          nodes.push({
            id: `TreeNode${treeMappingCnt}`,
            data: { label: `${c}` },
            position: { x: 0, y: 0 },
          });

          treeMapping.set(c, treeMappingCnt);
          treeMappingCnt++;

          traverseCourse(c);
        }

        edges.push({
          id: `TreeConnection${treeMappingConnectionCnt}`,
          source: `TreeNode${treeMapping.get(course)}`,
          target: `TreeNode${treeMapping.get(c)}`,
          type: 'straight', // Use straight connection lines
        });
        treeMappingConnectionCnt++;
      });
    } else {
      console.log('course not found as dep ' + course);
    }
  };

  traverseCourse(course);

  return { nodes, edges };
};

const LayoutFlow = () => {
  const { coursesMap, loading, error } = useCourses();
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({
      rankdir: direction,
      ranksep: 10,  // Adjust to reduce the distance between levels
      nodesep: 10,  // Adjust to reduce the distance between nodes
    });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search') || '';
  const [userInput, setUserInput] = useState(searchValue);

  useEffect(() => {
    if (!loading && !error && coursesMap.size > 0) {
      const blueprint = buildBlueprint(userInput, coursesMap); // Replace with the actual root course

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        blueprint.nodes,
        blueprint.edges,
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [coursesMap, loading, error, userInput]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: 'straight' }, // Use straight connection lines
          eds
        )
      ),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );


  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchValue });
    setUserInput('')
  };

  const saveValue = (value) => {
    console.log('Saving value:', value);
    // Example: Save value to local storage
    localStorage.setItem('searchValue', value);
    // Example: You might also want to send this value to an API
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'black', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', width: '90%', zIndex: 1000 }}>
        <PlaceholdersAndVanishInput
          placeholders={['Search for a course', 'The future is in yours']}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType='straight' // Use straight connection lines
        colorMode='dark'
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default LayoutFlow;
