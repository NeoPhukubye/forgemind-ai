export default function ResultsTabs({
                                        activeTab,
                                        setActiveTab,
                                    }) {

    const tabs = [
        { id: "architecture", label: "🏗 Architecture" },
        { id: "tech", label: "🛠 Tech Stack" },
        { id: "folders", label: "📁 Folders" },
        { id: "api", label: "🌐 API" },
        { id: "database", label: "🗄 Database" },
        { id: "roadmap", label: "🗓 Roadmap" },
        { id: "security", label: "🔒 Security" },
        { id: "risks", label: "⚠ Risks" },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                margin: "30px 0",
                justifyContent: "center",
            }}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        padding: "10px 18px",
                        borderRadius: "12px",
                        border: "none",
                        cursor: "pointer",
                        background:
                            activeTab === tab.id
                                ? "#7c3aed"
                                : "#1f2937",
                        color: "white",
                        fontWeight: "600",
                        transition: "0.3s",
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}