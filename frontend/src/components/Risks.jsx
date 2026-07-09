import {
    AlertTriangle,
    ShieldAlert,
    Copy
} from "lucide-react";
import toast from "react-hot-toast";

export default function Risks({ result }) {

    const risks = result.risks || [];

    function copyRisks() {
        navigator.clipboard.writeText(
            risks.join("\n")
        );

        toast.success("Risks copied!");
    }

    function getSeverityColor(risk) {

        const text = risk.toLowerCase();

        if (
            text.includes("security") ||
            text.includes("privacy") ||
            text.includes("breach") ||
            text.includes("attack")
        ) {
            return "#ef4444";
        }

        if (
            text.includes("performance") ||
            text.includes("latency") ||
            text.includes("slow")
        ) {
            return "#f59e0b";
        }

        return "#3b82f6";
    }

    function getSeverity(risk) {

        const text = risk.toLowerCase();

        if (
            text.includes("security") ||
            text.includes("privacy") ||
            text.includes("breach") ||
            text.includes("attack")
        ) {
            return "High";
        }

        if (
            text.includes("performance") ||
            text.includes("latency") ||
            text.includes("slow")
        ) {
            return "Medium";
        }

        return "Low";
    }

    return (

        <div>

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:"35px",
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"15px",
                    }}
                >

                    <AlertTriangle
                        size={34}
                        color="#f59e0b"
                    />

                    <h1
                        style={{
                            color:"white",
                            margin:0,
                        }}
                    >
                        Project Risks
                    </h1>

                </div>

                <button

                    onClick={copyRisks}

                    style={{
                        padding:"10px 18px",
                        borderRadius:"10px",
                        border:"none",
                        background:
                            "linear-gradient(90deg,#7c3aed,#2563eb)",
                        color:"white",
                        cursor:"pointer",
                        display:"flex",
                        alignItems:"center",
                        gap:"8px",
                    }}

                >

                    <Copy size={18}/>
                    Copy

                </button>

            </div>

            <div

                style={{
                    display:"grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(340px,1fr))",
                    gap:"22px",
                }}

            >

                {risks.map((risk,index)=>(

                    <div

                        key={index}

                        style={{
                            background:"#111827",
                            borderRadius:"18px",
                            padding:"24px",
                            border:
                                `1px solid ${getSeverityColor(risk)}`,
                            transition:".3s",
                        }}

                        onMouseEnter={(e)=>{
                            e.currentTarget.style.transform=
                                "translateY(-6px)";
                            e.currentTarget.style.boxShadow=
                                "0 18px 35px rgba(0,0,0,.35)";
                        }}

                        onMouseLeave={(e)=>{
                            e.currentTarget.style.transform=
                                "translateY(0)";
                            e.currentTarget.style.boxShadow=
                                "none";
                        }}

                    >

                        <div

                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                marginBottom:"20px",
                            }}

                        >

                            <ShieldAlert
                                color={getSeverityColor(risk)}
                                size={30}
                            />

                            <span

                                style={{
                                    background:getSeverityColor(risk),
                                    color:"white",
                                    padding:"8px 14px",
                                    borderRadius:"25px",
                                    fontWeight:"700",
                                }}

                            >

                                {getSeverity(risk)}

                            </span>

                        </div>

                        <p

                            style={{
                                color:"#cbd5e1",
                                lineHeight:"1.8",
                                minHeight:"90px",
                            }}

                        >

                            {risk}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}