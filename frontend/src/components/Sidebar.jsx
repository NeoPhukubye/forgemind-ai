import { Brain, Bug, ClipboardList, Code2, FileText, Home, TestTube2 } from "lucide-react";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "architect", label: "Architect", icon: Brain },
    { id: "planner", label: "Planner", icon: ClipboardList },
    { id: "coder", label: "Coder", icon: Code2 },
    { id: "debugger", label: "Debugger", icon: Bug },
    { id: "tests", label: "Tests", icon: TestTube2 },
    { id: "documentation", label: "Docs", icon: FileText },
];

export default function Sidebar({ activeView, onChangeView }) {
    return (
        <aside style={{ width: "220px", padding: "20px", borderRight: "1px solid #ddd" }}>
            <h2>ForgeMind AI</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                        <li key={item.id}>
                            <button
                                className={isActive ? "nav-button active" : "nav-button"}
                                onClick={() => onChangeView(item.id)}
                                type="button"
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
