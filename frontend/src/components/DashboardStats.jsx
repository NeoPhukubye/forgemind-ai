import {
    Boxes,
    Globe,
    Database,
    ShieldCheck,
    FolderTree,
    AlertTriangle
} from "lucide-react";

export default function DashboardStats({ result }) {
    if (!result) return null;

    const stats = [
        {
            title: "Technologies",
            value: Object.keys(result.tech_stack || {}).length,
            icon: <Boxes size={32} />,
            color: "#8b5cf6",
        },
        {
            title: "API Endpoints",
            value: (result.api_endpoints || []).length,
            icon: <Globe size={32} />,
            color: "#3b82f6",
        },
        {
            title: "Database Tables",
            value: (result.database_schema || []).length,
            icon: <Database size={32} />,
            color: "#06b6d4",
        },
        {
            title: "Folders",
            value: (result.folder_structure || []).length,
            icon: <FolderTree size={32} />,
            color: "#22c55e",
        },
        {
            title: "Security Rules",
            value: (result.security_considerations || []).length,
            icon: <ShieldCheck size={32} />,
            color: "#f59e0b",
        },
        {
            title: "Risks",
            value: (result.risks || []).length,
            icon: <AlertTriangle size={32} />,
            color: "#ef4444",
        },
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
                marginBottom: "35px",
            }}
        >
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    style={{
                        background: "rgba(17,24,39,.8)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: "18px",
                        padding: "24px",
                        transition: ".3s",
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                            "0 20px 40px rgba(0,0,0,.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                            "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    <div
                        style={{
                            color: stat.color,
                            marginBottom: "18px",
                        }}
                    >
                        {stat.icon}
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            color: "white",
                            fontSize: "42px",
                        }}
                    >
                        {stat.value}
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",
                            color: "#94a3b8",
                            fontWeight: 600,
                        }}
                    >
                        {stat.title}
                    </p>
                </div>
            ))}
        </div>
    );
}