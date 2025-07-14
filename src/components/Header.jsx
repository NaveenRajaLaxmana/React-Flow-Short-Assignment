import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { useNodeContext } from "./NodeContext";

const Header = () => {
  const { getNodes, getEdges, setNodes } = useReactFlow();
  const [error, setError] = useState(false);
  const [selectedNode, _, editedmessageContent, setEditedMessageContent] =
    useNodeContext();

  const nodes = getNodes();
  const edges = getEdges();

  const SaveChangetoNode = () => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode) {
          return {
            ...node,
            data: {
              ...node.data,
              msg: editedmessageContent, // Merge with existing data
            },
          };
        }
        return node;
      })
    );
    setTimeout(() => setEditedMessageContent(null), 1000);
  };

  const onSaveClick = (event) => {
    event.preventDefault();

    // Build a map of nodeId -> number of target connections
    const targetHandleCount = nodes.reduce((acc, node) => {
      acc[node.id] = 0;
      return acc;
    }, {});

    edges.forEach((edge) => {
      if (targetHandleCount[edge.target] !== undefined) {
        targetHandleCount[edge.target] += 1;
      }
    });

    // Find nodes with no target connections
    const unconnectedTargetNodes = nodes.filter(
      (node) => targetHandleCount[node.id] === 0
    );

    if (unconnectedTargetNodes.length > 1) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      setError(false);
      // Proceed with save logic
      SaveChangetoNode();
    }
  };

  return (
    <div className="header">
      <div className="error-toast-wrapper">
        {error ? (
          <div className="error-box">
            <h6>Cannot save Flow</h6>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="save-btn-wrapper">
        <button onClick={onSaveClick}>Save Changes</button>
      </div>
    </div>
  );
};

export default Header;
