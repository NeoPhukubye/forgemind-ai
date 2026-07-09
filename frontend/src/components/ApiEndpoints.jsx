import {
    Globe,
    Copy
} from "lucide-react";
import toast from "react-hot-toast";

export default function ApiEndpoints({ result }) {

    const endpoints = result.api_endpoints || [];

    function getColor(method) {

        switch (method?.toUpperCase()) {

            case "GET":
                return "#22c55e";

            case "POST":
                return "#3b82f6";

            case "PUT":
                return "#f59e0b";

            case "PATCH":
                return "#8b5cf6";

            case "DELETE":
                return "#ef4444";

            default:
                return "#64748b";
        }

    }

    function copyEndpoints() {

        const text = endpoints.map(endpoint =>

            `${endpoint.method} ${endpoint.path}

${endpoint.purpose}

`
        ).join("");

        navigator.clipboard.writeText(text);

        toast.success("API Endpoints copied!");

    }

    return (

        <div>

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:"30px",
                }}
            >

                <h1
                    style={{
                        color:"white",
                        margin:0,
                    }}
                >
                    🌐 REST API Endpoints
                </h1>

                <button

                    onClick={copyEndpoints}

                    style={{
                        padding:"10px 18px",
                        borderRadius:"10px",
                        border:"none",
                        cursor:"pointer",
                        color:"white",
                        background:
                            "linear-gradient(90deg,#7c3aed,#2563eb)"
                    }}

                >
                    <Copy size={18}/>
                </button>

            </div>

            <div

                style={{
                    display:"grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(360px,1fr))",
                    gap:"20px",
                }}

            >

                {endpoints.map((endpoint,index)=>(

                    <div

                        key={index}

                        style={{
                            background:"#111827",
                            borderRadius:"18px",
                            padding:"24px",
                            border:
                                "1px solid rgba(255,255,255,.08)"
                        }}

                    >

                        <div

                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                marginBottom:"18px",
                            }}

                        >

                            <span

                                style={{
                                    background:getColor(endpoint.method),
                                    color:"white",
                                    padding:"8px 14px",
                                    borderRadius:"20px",
                                    fontWeight:"700",
                                }}

                            >

                                {endpoint.method}

                            </span>

                            <Globe
                                size={22}
                                color="#38bdf8"
                            />

                        </div>

                        <div

                            style={{
                                color:"#f8fafc",
                                fontSize:"17px",
                                fontWeight:"700",
                                marginBottom:"15px",
                                fontFamily:"monospace",
                            }}

                        >

                            {endpoint.path}

                        </div>

                        <div

                            style={{
                                color:"#94a3b8",
                                lineHeight:"1.8",
                            }}

                        >

                            {endpoint.purpose}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}