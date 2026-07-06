import { Home, Brain, Bug, FileText, Code2 } from "lucide-react";

export default function Sidebar() {
    return (
        <aside style={{ width: "220px", padding: "20px", borderRight: "1px solid #ddd" }}>
            <h2>ForgeMind AI</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Home size={18} /> Dashboard</li>
                <li><Brain size={18} /> Architect</li>
                <li><Code2 size={18} /> Coder</li>
                <li><Bug size={18} /> Debugger</li>
                <li><FileText size={18} /> Docs</li>
            </ul>
        </aside>
    );
}