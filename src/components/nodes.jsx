import { Handle, Position } from "@xyflow/react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { useNodeContext } from "./NodeContext";

const TextNode = ({ id, data, isConnectable }) => {
 
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div
        className="text-node-wrapper"
        onClick={() => {
           data.onClickTrigger(id)
        }}
      >
        <div className="text-node-header">
          <BiMessageRoundedDetail />
          <div>
            <b>Send Message</b>
          </div>
          <RiWhatsappFill style={{ color: "#25D366" }} />
        </div>

        <div className="text-node-content">{data?.msg}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
};

export { TextNode };
