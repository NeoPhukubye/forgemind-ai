import { useState } from "react";
import Hero from "../components/Hero";
import PromptForm from "../components/PromptForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ArchitectureCard from "../components/ArchitectureCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { generateArchitecture } from "../services/architectService";
import toast from "react-hot-toast";

export default function Home() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Sidebar navigation state
    const [activeTab, setActiveTab] = useState("dashboard");

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
        <>
            <Navbar />

            <div
                style={{
                    display: "flex",
                    minHeight: "calc(100vh - 80px)",
                    background: "transparent",
                }}
            >
                <Sidebar
                    active={activeTab}
                    setActive={setActiveTab}
                />

                <main
                    style={{
                        flex: 1,
                        padding: "40px",
                        overflowY: "auto",
                    }}
                >
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
                                marginTop: "25px",
                                padding: "18px",
                                borderRadius: "12px",
                                background: "#7f1d1d",
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {!loading && result && (
                        <ArchitectureCard
                            result={result}
                            activeTab={activeTab}
                        />
                    )}
                </main>
            </div>
        </>
    );
}