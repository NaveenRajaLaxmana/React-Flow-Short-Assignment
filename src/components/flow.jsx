import { useCallback, useRef } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useEdges,
  useReactFlow,
} from "@xyflow/react";
import { customNodes } from "./custom";
import { useDnD } from "./DnDContext";
import { useNodeContext } from "./NodeContext";

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [_, setSelectedNode] = useNodeContext();
  const initialNodes = [
    {
      id: "n1",
      position: { x: 0, y: 0 },
      data: { msg: "First Message", onClickTrigger: setSelectedNode },
      type: "textNode",
    },
    {
      id: "n2",
      position: { x: 100, y: 100 },
      data: { msg: "Second Message", onClickTrigger: setSelectedNode },
      type: "textNode",
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();
  const existingEdges = useEdges();

  const onConnect = useCallback((params) => {
    setEdges((currentEdges) => {
      // Check against current edges in state
      const isSourceAlreadyUsed = currentEdges.some(
        (edge) =>
          edge.source === params.source &&
          (edge.sourceHandle || "default") ===
            (params.sourceHandle || "default")
      );

      if (!isSourceAlreadyUsed) {
        return addEdge({ ...params }, currentEdges);
      } else {
        return currentEdges; // Return unchanged edges
      }
    });
  }, []);

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { msg: `${type} node ${id}`, onClickTrigger: setSelectedNode },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{ width: "100%", height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={customNodes}
        onConnect={onConnect}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        onContextMenu={() => setSelectedNode(null)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
