import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

// Nodes and edges for React Flow
const initialNodes = [
  { 
    id: '1', 
    position: { x: 0, y: 100 }, 
    data: { label: 'You Donate ' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff' // White text color
    }
  },
  { 
    id: '2', 
    position: { x: 250, y: 100 }, 
    data: { label: 'Your Donation ❤️' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff' // White text color
    }
  },
  { 
    id: '3', 
    position: { x: 500, y: 100 }, 
    data: { label: 'ChileCare NGO' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid #fff', 
      padding: '10px', 
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff' // White text color
    }
  },
  { 
    id: '4', 
    position: { x: 750, y: 50 }, 
    data: { label: 'Events ' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid lightgreen', // Green border for end node
      padding: '10px', 
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff' // White text color
    }
  },
  { 
    id: '5', 
    position: { x: 750, y: 150 }, 
    data: { label: 'Projects ' }, 
    style: { 
      borderRadius: '10px', 
      border: '2px solid lightgreen', // Green border for end node
      padding: '10px', 
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff' // White text color
    }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .react-flow__controls,
      .react-flow__logo,
      .react-flow__background {
        display: none !important;
      }
      .react-flow__node {
        background-color: rgba(0, 0, 0, 0.2) !important;
        color: #fff !important;
      }
      .react-flow__edge {
        stroke: #fff;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <h1 style={{ paddingLeft: '20px', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Donation Flow</h1>
      <div style={{ height: '500px', width: '100%', backgroundColor: '#003E1F', position: 'relative', overflow: 'auto' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          panOnScroll={false} // Allow panning while scrolling
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          elementsSelectable={false}
          nodesDraggable={false}
          interactable={false}
        >
          <Background color="#003E1F" />
        </ReactFlow>
      </div>
    </>
  );
}

export default Flow;
