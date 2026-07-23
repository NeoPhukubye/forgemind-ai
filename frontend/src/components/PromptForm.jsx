export default function PromptForm({
    projectName,
    description,
    setProjectName,
    setDescription,
    loading,
    onGenerate,
}) {
    return (
        <div className="card">
            <h2 style={{ fontSize: "28px", marginBottom: "8px", color: "#fff" }}>
                Design Your Architecture
            </h2>

            <p style={{ color: "#94a3b8", marginBottom: "28px", fontSize: "16px", lineHeight: "1.6" }}>
                Describe your project and let ForgeMind AI generate a complete architecture
                with tech stack, APIs, database schema, and deployment strategy.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ color: "#cbd5e1", fontWeight: "600", fontSize: "14px", marginTop: "12px" }}>
                    Project Name
                </label>
                <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Smart Hospital, Fintech App, SaaS Platform"
                    style={{ marginTop: "8px" }}
                />

                <label style={{ color: "#cbd5e1", fontWeight: "600", fontSize: "14px", marginTop: "20px" }}>
                    Project Description
                </label>
                <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your application: target users, core features, business goals, scalability needs, AI capabilities..."
                    style={{ marginTop: "8px" }}
                />

                <button
                    onClick={onGenerate}
                    disabled={loading}
                    className="btn-primary"
                    style={{ marginTop: "20px" }}
                >
                    {loading ? "Generating Architecture..." : "Generate Architecture"}
                </button>
            </div>
        </div>
    );
}
