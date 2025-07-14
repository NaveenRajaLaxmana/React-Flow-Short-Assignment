import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import Flow from "./components/flow";
import Panel from "./components/panel";
import { DnDProvider } from "./components/DnDContext";
import { NodeContextProvider } from "./components/NodeContext";
import Header from "./components/Header"; 

function App() {
  return (
    <>
     <NodeContextProvider>
      <ReactFlowProvider>
    <Header />
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <DnDProvider>
       
         
           
          
       
        <div style={{ width: "75%", height: "100%" }}>
          
            <Flow />
          
         </div>
        <div style={{ width: "20%", height: "100%" }}>
          <Panel />
        </div>
       
       
      
      </DnDProvider>
    </div>
    </ReactFlowProvider>
      </NodeContextProvider>
    </>
    
  );
}

export default App;
