import {
    LayoutDashboard,
    Boxes,
    FolderTree,
    Database,
    ShieldCheck,
    Rocket,
    Globe,
    AlertTriangle,
    X
} from "lucide-react";

const menuItems = [
    {
        icon: <LayoutDashboard size={20} />,
        label: "Dashboard",
        id: "dashboard",
    },
    {
        icon: <Rocket size={20} />,
        label: "Architecture",
        id: "architecture",
    },
    {
        icon: <Boxes size={20} />,
        label: "Tech Stack",
        id: "tech",
    },
    {
        icon: <FolderTree size={20} />,
        label: "Folder Structure",
        id: "folders",
    },
    {
        icon: <Globe size={20} />,
        label: "API Endpoints",
        id: "api",
    },
    {
        icon: <Database size={20} />,
        label: "Database",
        id: "database",
    },
    {
        icon: <ShieldCheck size={20} />,
        label: "Security",
        id: "security",
    },
    {
        icon: <AlertTriangle size={20} />,
        label: "Risks",
        id: "risks",
    },
];

export default function Sidebar({ active, setActive, open, onClose }) {
    return (
        <>
            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}
            <aside
                className={`sidebar${open ? " sidebar--open" : ""}`}
                style={{
                    width: "270px",
                    minHeight: "calc(100vh - 82px)",
                    background: "rgba(15,23,42,.9)",
                    borderRight: "1px solid rgba(255,255,255,.08)",
                    padding: "30px 20px",
                    position: "sticky",
                    top: "82px",
                }}
            >
                {open && (
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            background: "transparent",
                            border: "none",
                            color: "#94a3b8",
                            padding: "4px",
                            margin: 0,
                        }}
                    >
                        <X size={22} />
                    </button>
                )}

                <div
                    style={{
                        color: "#94a3b8",
                        fontWeight: 700,
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        marginBottom: "25px",
                    }}
                >
                    Workspace
                </div>

                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            if (onClose) onClose();
                        }}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            padding: "15px",
                            marginBottom: "12px",
                            borderRadius: "14px",
                            border:
                                active === item.id
                                    ? "1px solid #7c3aed"
                                    : "1px solid transparent",
                            background:
                                active === item.id
                                    ? "linear-gradient(90deg,#7c3aed,#2563eb)"
                                    : "transparent",
                            color: "white",
                            cursor: "pointer",
                            transition: ".3s",
                            fontSize: "15px",
                            fontWeight: 600,
                            marginTop: 0,
                        }}
                        onMouseEnter={(e) => {
                            if (active !== item.id) {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,.05)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (active !== item.id) {
                                e.currentTarget.style.background = "transparent";
                            }
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}

                <div
                    style={{
                        marginTop: "50px",
                        padding: "20px",
                        borderRadius: "16px",
                        background: "linear-gradient(180deg,#7c3aed,#2563eb)",
                        color: "white",
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        ForgeMind AI
                    </h3>

                    <p
                        style={{
                            fontSize: "14px",
                            lineHeight: "1.6",
                        }}
                    >
                        Powered by Gemini AI
                        <br />
                        Built for AMD Hackathon
                    </p>
                </div>
            </aside>
        </>
    );
}
