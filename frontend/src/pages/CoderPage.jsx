import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { runCoder } from "../services/agentService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CoderPage() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("python");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!projectName.trim()) {
            toast.error("Please enter a project name.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await runCoder(projectName, description, language);
            if (data.error) {
                setError(data.error);
                toast.error("Coder agent failed");
            } else {
                setResult(data);
                toast.success("Code generated!");
            }
        } catch {
            setError("Could not connect to the backend.");
            toast.error("Request failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="agent-page">
            <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
                <h1 style={{ fontSize: "28px", marginBottom: "8px", color: "#fff" }}>
                    Coder Agent
                </h1>
                <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
                    Generate production-ready code for your project features.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project name"
                    />
                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the feature you want to generate..."
                    />
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="java">Java</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                    </select>
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? "Generating Code..." : "Generate Code"}
                    </button>
                </form>
            </div>

            {loading && <LoadingSpinner />}

            {error && <div className="error-box">{error}</div>}

            {result && (
                <div className="card result-card" style={{ maxWidth: "900px", margin: "20px auto" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result.code}
                    </ReactMarkdown>
                </div>
            )}
        </main>
    );
}
