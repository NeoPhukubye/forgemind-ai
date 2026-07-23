import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { runDocumentation } from "../services/agentService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DocsPage() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
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
            const data = await runDocumentation(projectName, description, code);
            if (data.error) {
                setError(data.error);
                toast.error("Documentation generation failed");
            } else {
                setResult(data);
                toast.success("Documentation generated!");
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
                    Documentation Agent
                </h1>
                <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
                    Generate README, API docs, and project documentation.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project name"
                    />
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what needs documentation..."
                    />
                    <textarea
                        rows={8}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste code or context (optional)"
                        style={{ fontFamily: "monospace" }}
                    />
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? "Generating Docs..." : "Generate Documentation"}
                    </button>
                </form>
            </div>

            {loading && <LoadingSpinner />}

            {error && <div className="error-box">{error}</div>}

            {result && (
                <div className="card result-card" style={{ maxWidth: "900px", margin: "20px auto" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result.documentation}
                    </ReactMarkdown>
                </div>
            )}
        </main>
    );
}
