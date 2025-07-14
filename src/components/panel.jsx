import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { useDnD } from "./DnDContext";
import { useNodeContext } from "./NodeContext";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";

const NodeBox = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      className="node-box"
      onDragStart={(event) => onDragStart(event, "textNode")}
      draggable
    >
      <BiMessageRoundedDetail size={35} />
      <p>Message</p>
    </div>
  );
};

const SettingsPanel = ({ message = "", setSettingsPanelVisbility }) => {
  const [msg, setMsg] = useState(message);
  const [a, b, c, setEditedMessageContent] = useNodeContext();
  useEffect(() => {
    setMsg(message);
  }, [message]);
  return (
    <div className="settings-panel-wrapper">
      <div className="settings-panel-header">
        <FaArrowLeft
          onClick={() => setSettingsPanelVisbility(false)}
          style={{ cursor: "pointer" }}
        />
        <p>Message</p>
        <p></p>
      </div>
      <hr></hr>
      <div className="settings-panel-content">
        <p>Text</p>
        <textarea
          value={msg}
          onChange={(event) => {
            setMsg(event.target.value);
            setEditedMessageContent(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

const Panel = () => {
  const [selectedNode, _] = useNodeContext();
  const { getNode } = useReactFlow();
  const [isSettingsPanelOn, setSettingsPanelVisbility] = useState(false);
  const [currentNodeContent, setCurrentNodeContent] = useState(null);
  useEffect(() => {
    if (selectedNode) {
      const node = getNode(selectedNode);
      setCurrentNodeContent(node.data?.msg);
      setSettingsPanelVisbility(true);
    }
  }, [selectedNode]);
  return (
    <div className="flow-panel">
      {!isSettingsPanelOn ? (
        <div className="flow-node-panel">
          <NodeBox />
        </div>
      ) : (
        <div className="flow-settings-panel">
          <SettingsPanel
            message={currentNodeContent ?? ""}
            setSettingsPanelVisbility={setSettingsPanelVisbility}
          />
        </div>
      )}
    </div>
  );
};

export default Panel;
