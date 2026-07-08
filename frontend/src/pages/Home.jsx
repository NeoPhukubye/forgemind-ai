import { useState } from "react";
import Hero from "../components/Hero";
import PromptForm from "../components/PromptForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ArchitectureCard from "../components/ArchitectureCard";
import { generateArchitecture } from "../services/architectService";
import toast from "react-hot-toast";
setResult(data);
toast.success("Architecture generated!");
toast.error("Generation failed.");

export default function Home() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleGenerate() {
        if (!projectName.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);
        setResult(data);

        try {
            const data = await generateArchitecture(projectName, description);

            if (data.error) {
                setError(data.error);
                return;
            }

            setResult(data);

        } catch (err) {
            console.error(err);

            setError(
                "Could not connect to the backend. Is FastAPI running?"
            );

        } finally {
            setLoading(false);
        }
    }

    function handleExample(name, desc) {
        setProjectName(name);
        setDescription(desc);
    }

    return (
        <div>

            <Hero onExampleClick={handleExample} />

            <PromptForm
                projectName={projectName}
                description={description}
                setProjectName={setProjectName}
                setDescription={setDescription}
                loading={loading}
                onGenerate={handleGenerate}
            />

            {loading && <LoadingSpinner />}

            {error && (
                <div
                    style={{
                        color: "#ef4444",
                        textAlign: "center",
                        marginTop: "20px"
                    }}
                >
                    {error}
                </div>
            )}

            {!loading && result && (
                <ArchitectureCard result={result} />
            )}

        </div>
    );
}