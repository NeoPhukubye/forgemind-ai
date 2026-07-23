import { useState } from "react";
import toast from "react-hot-toast";

import Hero from "../components/Hero";
import PromptForm from "../components/PromptForm";
import DashboardStats from "../components/DashboardStats";
import ResultsTabs from "../components/ResultsTabs";
import ArchitectureCard from "../components/ArchitectureCard";
import LoadingSpinner from "../components/LoadingSpinner";

import { generateArchitecture } from "../services/architectService";

export default function Home() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState("architecture");

    async function handleGenerate() {
        if (!projectName.trim()) {
            toast.error("Please enter a project name.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await generateArchitecture(projectName, description);

            if (data.error) {
                setError(data.error);
                toast.error(data.error);
                return;
            }

            setResult(data);
            setActiveTab("architecture");
            toast.success("Architecture Generated!");
        } catch (err) {
            console.error(err);
            setError("Could not connect to the backend. Is FastAPI running?");
            toast.error("Generation Failed");
        } finally {
            setLoading(false);
        }
    }

    function handleExample(name, desc) {
        setProjectName(name);
        setDescription(desc);
        // Scroll to form
        document.getElementById("prompt-section")?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <main className="home-page">
            <Hero onExampleClick={handleExample} />

            <section className="prompt-section" id="prompt-section">
                <PromptForm
                    projectName={projectName}
                    description={description}
                    setProjectName={setProjectName}
                    setDescription={setDescription}
                    loading={loading}
                    onGenerate={handleGenerate}
                />
            </section>

            {loading && <LoadingSpinner />}

            {error && (
                <div className="error-box">{error}</div>
            )}

            {!loading && result && (
                <section className="results-section">
                    <DashboardStats result={result} />
                    <ResultsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <ArchitectureCard result={result} activeTab={activeTab} />
                </section>
            )}
        </main>
    );
}
