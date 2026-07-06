import { useState } from "react";
import { generateArchitecture } from "../services/architectService";

export default function Home() {
    const [projectName, setProjectName] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleGenerate() {
        if (!projectName.trim()) return;

        setLoading(true);

        try {
            const data = await generateArchitecture(projectName);
            setResult(data);
        } catch (error) {
            console.error(error);
            alert("Failed to generate architecture.");
        }

        setLoading(false);
    }

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

            <button onClick={handleGenerate}>
                {loading ? "Generating..." : "Generate Architecture"}
            </button>

            {result && (
                <div style={{ marginTop: "40px" }}>
                    <h2>{result.project}</h2>

                    <h3>Architecture</h3>

                    <ul>
                        {result.architecture.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <p>{result.message}</p>
                </div>
            )}
        </div>
    );
}