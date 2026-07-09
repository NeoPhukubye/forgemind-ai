import { Copy, Download, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function ArchitectureHeader({ result }) {

    function copySummary() {
        navigator.clipboard.writeText(
            `${result.project}\n\n${result.summary}`
        );

        toast.success("Architecture copied!");
    }

    function downloadJSON() {

        const blob = new Blob(
            [JSON.stringify(result, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = `${result.project
            .replace(/\s+/g, "-")
            .toLowerCase()}-architecture.json`;

        a.click();

        URL.revokeObjectURL(url);

        toast.success("JSON Downloaded!");
    }

    return (

        <div
            className="card"
            style={{
                animation: "fadeIn .5s ease",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginBottom: "30px",
                }}
            >

                <div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <Sparkles
                            size={28}
                            color="#8b5cf6"
                        />

                        <h1
                            style={{
                                margin: 0,
                                color: "white",
                            }}
                        >
                            {result.project}
                        </h1>

                    </div>

                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "17px",
                            lineHeight: "1.8",
                            maxWidth: "900px",
                        }}
                    >
                        {result.summary}
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap",
                    }}
                >

                    <button
                        onClick={copySummary}
                    >
                        <Copy size={18}/>
                        &nbsp;
                        Copy
                    </button>

                    <button
                        onClick={downloadJSON}
                    >
                        <Download size={18}/>
                        &nbsp;
                        Download JSON
                    </button>

                </div>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >

                <div
                    style={{
                        background:"#111827",
                        padding:"25px",
                        borderRadius:"16px",
                    }}
                >
                    <h3
                        style={{
                            color:"#8b5cf6",
                            marginBottom:"12px",
                        }}
                    >
                        🚀 AI Generated
                    </h3>

                    <p
                        style={{
                            color:"#cbd5e1",
                            lineHeight:"1.7",
                        }}
                    >
                        Enterprise architecture generated
                        automatically using ForgeMind AI.
                    </p>

                </div>

                <div
                    style={{
                        background:"#111827",
                        padding:"25px",
                        borderRadius:"16px",
                    }}
                >

                    <h3
                        style={{
                            color:"#3b82f6",
                            marginBottom:"12px",
                        }}
                    >
                        🏗 Production Ready
                    </h3>

                    <p
                        style={{
                            color:"#cbd5e1",
                            lineHeight:"1.7",
                        }}
                    >
                        Includes scalable architecture,
                        APIs, security, roadmap
                        and deployment guidance.
                    </p>

                </div>

                <div
                    style={{
                        background:"#111827",
                        padding:"25px",
                        borderRadius:"16px",
                    }}
                >

                    <h3
                        style={{
                            color:"#06b6d4",
                            marginBottom:"12px",
                        }}
                    >
                        ⚡ Powered by Fireworks AI
                    </h3>

                    <p
                        style={{
                            color:"#cbd5e1",
                            lineHeight:"1.7",
                        }}
                    >
                        Uses your deployed AI model
                        to generate modern software
                        architecture recommendations.
                    </p>

                </div>

            </div>

        </div>

    );

}