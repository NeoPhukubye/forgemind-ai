import { useState } from "react";
import {
    runCoder,
    runDebugger,
    runDocumentation,
    runPlanner,
    runTestGenerator,
} from "../services/agentService";

const agentConfig = {
    planner: {
        title: "Planner Agent",
        button: "Generate Plan",
        resultKey: "plan",
        needsProject: true,
        needsDescription: true,
        run: ({ projectName, description }) => runPlanner(projectName, description),
    },
    coder: {
        title: "Coder Agent",
        button: "Generate Code",
        resultKey: "code",
        needsProject: true,
        needsDescription: true,
        needsLanguage: true,
        run: ({ projectName, description, language }) => runCoder(projectName, description, language),
    },
    debugger: {
        title: "Debugger Agent",
        button: "Debug Code",
        resultKey: "debug_report",
        needsDescription: true,
        needsLanguage: true,
        needsCode: true,
        run: ({ code, description, language }) => runDebugger(code, description, language),
    },
    tests: {
        title: "Test Generator",
        button: "Generate Tests",
        resultKey: "tests",
        needsDescription: true,
        needsLanguage: true,
        needsCode: true,
        run: ({ code, description, language }) => runTestGenerator(code, description, language),
    },
    documentation: {
        title: "Documentation Agent",
        button: "Generate Docs",
        resultKey: "documentation",
        needsProject: true,
        needsDescription: true,
        needsCode: true,
        run: ({ projectName, description, code }) => runDocumentation(projectName, description, code),
    },
};

export default function AgentWorkspace({ type }) {
    const config = agentConfig[type];
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRun() {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await config.run({ projectName, description, language, code });
            if (data.error) {
                setError(data.error);
                return;
            }

            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Agent request failed. Check that the backend is running.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="agent-panel">
            <h1>{config.title}</h1>

            <div className="agent-form">
                {config.needsProject && (
                    <input
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                        placeholder="Project name"
                    />
                )}

                {config.needsLanguage && (
                    <input
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                        placeholder="Language or stack, e.g. Python, React, FastAPI"
                    />
                )}

                {config.needsDescription && (
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Describe the feature, bug, or expected output"
                        rows={4}
                    />
                )}

                {config.needsCode && (
                    <textarea
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        placeholder="Paste code or project context"
                        rows={10}
                    />
                )}

                <button onClick={handleRun} disabled={loading}>
                    {loading ? "Running..." : config.button}
                </button>
            </div>

            {error && <p className="agent-error">{error}</p>}

            {result && (
                <div className="agent-result">
                    <h2>{result.message || "Result"}</h2>
                    <pre>{result[config.resultKey]}</pre>
                </div>
            )}
        </section>
    );
}
