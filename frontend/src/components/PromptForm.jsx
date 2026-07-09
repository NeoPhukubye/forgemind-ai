export default function PromptForm({
                                       projectName,
                                       description,
                                       setProjectName,
                                       setDescription,
                                       loading,
                                       onGenerate,
                                   }) {
    return (
        <div
            className="card"
            style={{
                maxWidth: "950px",
                margin: "50px auto",
            }}
        >
            <h2
                style={{
                    fontSize: "34px",
                    marginBottom: "10px",
                    color: "#fff",
                }}
            >
                ✨ Create Your Architecture
            </h2>

            <p
                style={{
                    color: "#94a3b8",
                    marginBottom: "35px",
                    fontSize: "17px",
                    lineHeight: "1.6",
                }}
            >
                Describe your project and let ForgeMind AI design an
                enterprise-ready software architecture, complete with
                technology recommendations, APIs, databases, security,
                DevOps, and a development roadmap.
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "22px",
                }}
            >
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#cbd5e1",
                            fontWeight: "600",
                        }}
                    >
                        🚀 Project Name
                    </label>

                    <input
                        value={projectName}
                        onChange={(e) =>
                            setProjectName(e.target.value)
                        }
                        placeholder="e.g. Smart Hospital"
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#cbd5e1",
                            fontWeight: "600",
                        }}
                    >
                        📝 Project Description
                    </label>

                    <textarea
                        rows={7}
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        placeholder="Describe your application, users, core features, business goals, scalability requirements and any AI capabilities..."
                    />
                </div>

                <button
                    onClick={onGenerate}
                    disabled={loading}
                    style={{
                        marginTop: "15px",
                        padding: "18px",
                        fontSize: "18px",
                        fontWeight: "700",
                        borderRadius: "14px",
                        background:
                            "linear-gradient(90deg,#7c3aed,#2563eb)",
                        color: "#fff",
                        border: "none",
                        cursor: loading ? "wait" : "pointer",
                    }}
                >
                    {loading
                        ? "⚙️ Designing Your Architecture..."
                        : "✨ Generate Enterprise Architecture"}
                </button>

                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "15px",
                        color: "#94a3b8",
                        fontSize: "14px",
                    }}
                >
                    <span>⚡ AI-Powered</span>
                    <span>🏗 Enterprise Ready</span>
                    <span>🔒 Security First</span>
                    <span>☁ Cloud Native</span>
                    <span>📊 Scalable</span>
                </div>
            </div>
        </div>
    );
}