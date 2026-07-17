import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} />
            <Home sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Footer />
        </>
    );
}
