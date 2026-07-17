import { useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import PromptForm from "../components/PromptForm";
import DashboardStats from "../components/DashboardStats";
import ResultsTabs from "../components/ResultsTabs";
import ArchitectureCard from "../components/ArchitectureCard";
import LoadingSpinner from "../components/LoadingSpinner";

import { generateArchitecture } from "../services/architectService";

export default function Home({ sidebarOpen, setSidebarOpen }) {
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
            setActiveTab("architecture");
            toast.success("Architecture Generated!");

        } catch (err) {

            console.error(err);

            setError(
                "Could not connect to the backend. Is FastAPI running?"
            );

            toast.error("Generation Failed");

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
            <div
                className="home-layout"
                style={{
                    display: "flex",
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                <Sidebar
                    active={activeTab}
                    setActive={setActiveTab}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main
                    className="home-main"
                    style={{
                        flex: 1,
                        padding: "40px",
                        overflowY: "auto",
                    }}
                >
                    <Hero
                        onExampleClick={handleExample}
                    />

                    <PromptForm
                        projectName={projectName}
                        description={description}
                        setProjectName={setProjectName}
                        setDescription={setDescription}
                        loading={loading}
                        onGenerate={handleGenerate}
                    />

                    {loading && (
                        <LoadingSpinner />
                    )}

                    {error && (
                        <div
                            style={{
                                background: "#7f1d1d",
                                color: "white",
                                padding: "18px",
                                borderRadius: "12px",
                                marginTop: "20px",
                                fontWeight: "600",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {!loading && result && (
                        <>
                            <DashboardStats
                                result={result}
                            />

                            <ResultsTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            <ArchitectureCard
                                result={result}
                                activeTab={activeTab}
                            />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
