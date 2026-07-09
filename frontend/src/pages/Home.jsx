import { useState } from "react";
import Hero from "../components/Hero";
import PromptForm from "../components/PromptForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ArchitectureCard from "../components/ArchitectureCard";
import { generateArchitecture } from "../services/architectService";
import toast from "react-hot-toast";

export default function Home() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleGenerate() {
        if (!projectName.trim()) {
            toast.error("Please enter a project name.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await generateArchitecture(
                projectName,
                description
            );

            if (data.error) {
                setError(data.error);
                toast.error(data.error);
                return;
            }

            setResult(data);
            toast.success("Architecture generated!");

        } catch (err) {
            console.error(err);

            setError(
                "Could not connect to the backend. Is FastAPI running?"
            );

            toast.error("Generation failed.");

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
                        marginTop: "20px",
                        fontWeight: "bold",
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