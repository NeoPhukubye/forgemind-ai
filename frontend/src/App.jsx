import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AgentWorkspace from "./components/AgentWorkspace";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  const [activeView, setActiveView] = useState("architect");

  function renderView() {
    if (activeView === "dashboard") {
      return <Dashboard />;
    }

    if (activeView === "architect") {
      return <Home />;
    }

    return <AgentWorkspace type={activeView} />;
  }

  return (
      <>
        <Navbar />

        <div
            style={{
              display: "flex",
              minHeight: "100vh",
            }}
        >
          <Sidebar activeView={activeView} onChangeView={setActiveView} />

          <main
              style={{
                flex: 1,
                padding: "30px",
              }}
          >
            {renderView()}
          </main>
        </div>
      </>
  );
}

export default App;
