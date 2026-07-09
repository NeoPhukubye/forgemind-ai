export default function ArchitectureCard({ result }) {
    if (!result) return null;

    const techStack = result.tech_stack || {};
    const endpoints = result.api_endpoints || [];
    const database = result.database_schema || [];
    const roadmap = result.development_roadmap || [];
    const security = result.security_considerations || [];
    const risks = result.risks || [];

    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "50px auto",
            }}
        >
            {/* Header */}
            <div className="card">
                <h1
                    style={{
                        marginBottom: "15px",
                        fontSize: "42px",
                    }}
                >
                    🚀 {result.project}
                </h1>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#cbd5e1",
                        lineHeight: "1.8",
                    }}
                >
                    {result.summary}
                </p>
            </div>

            {/* Tech Stack */}
            <div className="card">
                <h2>🛠 Technology Stack</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                        gap: "20px",
                        marginTop: "25px",
                    }}
                >
                    {Object.entries(techStack).map(([key, value]) => (
                        <div
                            key={key}
                            style={{
                                background: "#0f172a",
                                padding: "20px",
                                borderRadius: "14px",
                                border: "1px solid rgba(255,255,255,.08)",
                            }}
                        >
                            <h3
                                style={{
                                    color: "#60a5fa",
                                    marginBottom: "10px",
                                }}
                            >
                                {key}
                            </h3>

                            <p style={{ color: "#e5e7eb" }}>
                                {Array.isArray(value)
                                    ? value.join(", ")
                                    : value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Folder Structure */}
            <div className="card">
                <h2>📁 Folder Structure</h2>

                <pre
                    style={{
                        marginTop: "20px",
                        background: "#020617",
                        padding: "25px",
                        borderRadius: "15px",
                    }}
                >
{(result.folder_structure || []).join("\n")}
                </pre>
            </div>

            {/* REST APIs */}
            <div className="card">
                <h2>🌐 REST API Endpoints</h2>

                <table style={{ marginTop: "25px" }}>
                    <thead>
                    <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Purpose</th>
                    </tr>
                    </thead>

                    <tbody>
                    {endpoints.map((endpoint) => (
                        <tr key={endpoint.method + endpoint.path}>
                            <td>
                                <strong>{endpoint.method}</strong>
                            </td>

                            <td>
                                <code>{endpoint.path}</code>
                            </td>

                            <td>{endpoint.purpose}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Database */}
            <div className="card">
                <h2>🗄 Database Schema</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                        gap: "20px",
                        marginTop: "25px",
                    }}
                >
                    {database.map((table) => (
                        <div
                            key={table.table}
                            style={{
                                background: "#0f172a",
                                borderRadius: "15px",
                                padding: "20px",
                                border: "1px solid rgba(255,255,255,.08)",
                            }}
                        >
                            <h3
                                style={{
                                    color: "#8b5cf6",
                                    marginBottom: "15px",
                                }}
                            >
                                {table.table}
                            </h3>

                            <ul>
                                {table.fields.map((field) => (
                                    <li key={field}>{field}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Roadmap */}
            <div className="card">
                <h2>📅 Development Roadmap</h2>

                <ol
                    style={{
                        marginTop: "20px",
                        lineHeight: "2",
                    }}
                >
                    {roadmap.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </div>

            {/* Security */}
            <div className="card">
                <h2>🔒 Security</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                        gap: "20px",
                        marginTop: "20px",
                    }}
                >
                    {security.map((item) => (
                        <div
                            key={item}
                            style={{
                                background: "#052e16",
                                padding: "18px",
                                borderRadius: "14px",
                            }}
                        >
                            ✅ {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Risks */}
            <div className="card">
                <h2>⚠ Risks</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                        gap: "20px",
                        marginTop: "20px",
                    }}
                >
                    {risks.map((risk) => (
                        <div
                            key={risk}
                            style={{
                                background: "#451a03",
                                padding: "18px",
                                borderRadius: "14px",
                            }}
                        >
                            ⚠ {risk}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}