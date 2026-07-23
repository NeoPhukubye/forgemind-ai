import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { runTestGenerator } from "../services/agentService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TesterPage() {
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!code.trim()) {
            toast.error("Please paste your code.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await runTestGenerator(code, description, language);
            if (data.error) {
                setError(data.error);
                toast.error("Test generation failed");
            } else {
                setResult(data);
                toast.success("Tests generated!");
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
                    Test Generator Agent
                </h1>
                <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
                    Generate unit tests, integration tests, and edge case coverage.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <textarea
                        rows={10}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste your code here..."
                        style={{ fontFamily: "monospace" }}
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the feature (optional)"
                    />
                    <input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        placeholder="Language / test framework (e.g. python/pytest)"
                    />
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? "Generating Tests..." : "Generate Tests"}
                    </button>
                </form>
            </div>

            {loading && <LoadingSpinner />}

            {error && <div className="error-box">{error}</div>}

            {result && (
                <div className="card result-card" style={{ maxWidth: "900px", margin: "20px auto" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result.tests}
                    </ReactMarkdown>
                </div>
            )}
        </main>
    );
}
