import { useState } from "react";
import { generateArchitecture } from "../services/architectService";

export default function Home() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleGenerate() {
        if (!projectName.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await generateArchitecture(projectName, description);
            if (data.error) {
                setError(data.error);
                return;
            }

            setResult(data);
        } catch (error) {
            console.error(error);
            setError("Failed to generate architecture. Check that the backend is running.");
        } finally {
            setLoading(false);
        }
    }

    const architectureItems = Array.isArray(result?.architecture) ? result.architecture : [];
    const apiEndpoints = Array.isArray(result?.api_endpoints) ? result.api_endpoints : [];
    const risks = Array.isArray(result?.risks) ? result.risks : [];
    const techStack = result?.tech_stack || {};

    return (
        <div style={{ padding: "30px" }}>
            <h1>🚀 ForgeMind AI</h1>

            <input
                type="text"
                placeholder="Enter project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                style={{
                    width: "350px",
                    padding: "12px",
                    marginTop: "20px",
                }}
            />

            <br />
            <br />

            <textarea
                placeholder="Describe what you want to build..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{
                    width: "350px",
                    padding: "12px",
                    resize: "vertical",
                }}
            />

            <br />
            <br />

            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Architecture"}
            </button>

            {error && (
                <p style={{ color: "#b91c1c", marginTop: "24px" }}>
                    {error}
                </p>
            )}

            {result && (
                <div style={{ marginTop: "40px" }}>
                    <h2>{result.project}</h2>

                    {result.summary && <p>{result.summary}</p>}

                    {Object.keys(techStack).length > 0 && (
                        <>
                            <h3>Tech Stack</h3>
                            <ul>
                                {Object.entries(techStack).map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong>{" "}
                                        {Array.isArray(value) ? value.join(", ") : value}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {architectureItems.length > 0 && (
                        <>
                            <h3>Architecture</h3>
                            <ul>
                                {architectureItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {apiEndpoints.length > 0 && (
                        <>
                            <h3>API Endpoints</h3>
                            <ul>
                                {apiEndpoints.map((endpoint) => (
                                    <li key={`${endpoint.method}-${endpoint.path}`}>
                                        <strong>{endpoint.method}</strong> {endpoint.path} - {endpoint.purpose}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {risks.length > 0 && (
                        <>
                            <h3>Risks</h3>
                            <ul>
                                {risks.map((risk) => (
                                    <li key={risk}>{risk}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    <p>{result.message}</p>
                </div>
            )}
        </div>
    );
}
