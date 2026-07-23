import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PlannerPage from "./pages/PlannerPage";
import CoderPage from "./pages/CoderPage";
import DebuggerPage from "./pages/DebuggerPage";
import TesterPage from "./pages/TesterPage";
import DocsPage from "./pages/DocsPage";

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/coder" element={<CoderPage />} />
                <Route path="/debugger" element={<DebuggerPage />} />
                <Route path="/tester" element={<TesterPage />} />
                <Route path="/docs" element={<DocsPage />} />
            </Routes>
            <Footer />
        </>
    );
}
