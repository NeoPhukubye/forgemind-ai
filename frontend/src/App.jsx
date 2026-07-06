import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
      <>
        <Navbar />

        <div
            style={{
              display: "flex",
              minHeight: "100vh",
            }}
        >
          <Sidebar />

          <main
              style={{
                flex: 1,
                padding: "30px",
              }}
          >
            <Home />
          </main>
        </div>
      </>
  );
}

export default App;