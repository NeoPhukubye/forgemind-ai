export default function ArchitectureCard({ result }) {

    if (!result) return null;

    return (
        <div className="card">

            <h2>{result.project}</h2>

            <p>{result.summary}</p>

            <h3>🛠 Tech Stack</h3>

            <ul>
                {Object.entries(result.tech_stack || {}).map(([k, v]) => (
                    <li key={k}>
                        <strong>{k}</strong> :{" "}
                        {Array.isArray(v)
                            ? v.join(", ")
                            : v}
                    </li>
                ))}
            </ul>

            <h3>🌐 API Endpoints</h3>

            <ul>
                {(result.api_endpoints || []).map((endpoint) => (
                    <li key={endpoint.method + endpoint.path}>
                        {endpoint.method} {endpoint.path}
                    </li>
                ))}
            </ul>

        </div>
    );
}