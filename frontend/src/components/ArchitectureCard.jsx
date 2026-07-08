export default function ArchitectureCard({ result }) {
    if (!result) return null;

    const techStack = result.tech_stack || {};
    const endpoints = result.api_endpoints || [];
    const database = result.database_schema || [];
    const roadmap = result.development_roadmap || [];
    const security = result.security_considerations || [];
    const risks = result.risks || [];

    return (
        <div className="results-container">

            <div className="section-card">
                <h2>🚀 {result.project}</h2>
                <p>{result.summary}</p>
            </div>

            <div className="section-card">
                <h2>🛠 Technology Stack</h2>

                <table className="tech-table">
                    <tbody>
                    {Object.entries(techStack).map(([key, value]) => (
                        <tr key={key}>
                            <td><strong>{key}</strong></td>
                            <td>
                                {Array.isArray(value)
                                    ? value.join(", ")
                                    : value}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="section-card">
                <h2>📁 Folder Structure</h2>

                <ul>
                    {(result.folder_structure || []).map(folder => (
                        <li key={folder}>{folder}</li>
                    ))}
                </ul>
            </div>

            <div className="section-card">
                <h2>🌐 REST API Endpoints</h2>

                <table className="tech-table">
                    <thead>
                    <tr>
                        <th>Method</th>
                        <th>Path</th>
                        <th>Purpose</th>
                    </tr>
                    </thead>

                    <tbody>
                    {endpoints.map(endpoint => (
                        <tr key={endpoint.method + endpoint.path}>
                            <td>{endpoint.method}</td>
                            <td>{endpoint.path}</td>
                            <td>{endpoint.purpose}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="section-card">
                <h2>🗄 Database Schema</h2>

                {database.map(table => (
                    <div key={table.table}>
                        <h3>{table.table}</h3>

                        <ul>
                            {table.fields.map(field => (
                                <li key={field}>{field}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="section-card">
                <h2>📅 Development Roadmap</h2>

                <ol>
                    {roadmap.map(step => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </div>

            <div className="section-card">
                <h2>🔒 Security</h2>

                <ul>
                    {security.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="section-card">
                <h2>⚠ Risks</h2>

                <ul>
                    {risks.map(risk => (
                        <li key={risk}>{risk}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
}