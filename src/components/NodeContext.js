import { createContext, useContext, useState } from "react";

const NodeContext = createContext([null, (_) => {}]);

export const NodeContextProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [editedmessageContent, setEditedMessageContent] = useState(null);

  return (
    <NodeContext.Provider
      value={[
        selectedNode,
        setSelectedNode,
        editedmessageContent,
        setEditedMessageContent,
      ]}
    >
      {children}
    </NodeContext.Provider>
  );
};

export default NodeContext;

export const useNodeContext = () => {
  return useContext(NodeContext);
};
