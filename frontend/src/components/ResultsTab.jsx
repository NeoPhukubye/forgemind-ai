import {
    Rocket,
    Boxes,
    FolderTree,
    Globe,
    Database,
    ShieldCheck,
    AlertTriangle,
    Calendar
} from "lucide-react";

const tabs = [
    {
        id: "architecture",
        label: "Architecture",
        icon: <Rocket size={18} />
    },
    {
        id: "tech",
        label: "Tech Stack",
        icon: <Boxes size={18} />
    },
    {
        id: "folders",
        label: "Folders",
        icon: <FolderTree size={18} />
    },
    {
        id: "api",
        label: "API",
        icon: <Globe size={18} />
    },
    {
        id: "database",
        label: "Database",
        icon: <Database size={18} />
    },
    {
        id: "roadmap",
        label: "Roadmap",
        icon: <Calendar size={18} />
    },
    {
        id: "security",
        label: "Security",
        icon: <ShieldCheck size={18} />
    },
    {
        id: "risks",
        label: "Risks",
        icon: <AlertTriangle size={18} />
    }
];

export default function ResultsTabs({
                                        activeTab,
                                        setActiveTab,
                                    }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "30px",
            }}
        >
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border:
                            activeTab === tab.id
                                ? "1px solid #8b5cf6"
                                : "1px solid rgba(255,255,255,.08)",
                        background:
                            activeTab === tab.id
                                ? "linear-gradient(90deg,#7c3aed,#2563eb)"
                                : "#111827",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}