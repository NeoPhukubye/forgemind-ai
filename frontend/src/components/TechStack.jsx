import {
    Monitor,
    Server,
    Database,
    Cloud,
    Lock,
    Cpu
} from "lucide-react";

const icons = {
    frontend: <Monitor size={34} color="#8b5cf6" />,
    backend: <Server size={34} color="#3b82f6" />,
    database: <Database size={34} color="#10b981" />,
    devops: <Cloud size={34} color="#f59e0b" />,
    authentication: <Lock size={34} color="#ef4444" />,
    other: <Cpu size={34} color="#06b6d4" />
};

export default function TechStack({ result }) {

    const stack = result.tech_stack || {};

    return (

        <div>

            <h1
                style={{
                    color: "white",
                    marginBottom: "30px",
                }}
            >
                🛠 Technology Stack
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(300px,1fr))",
                    gap: "25px",
                }}
            >

                {Object.entries(stack).map(([key, value]) => (

                    <div
                        key={key}
                        style={{
                            background: "#111827",
                            borderRadius: "18px",
                            padding: "25px",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                            transition: ".3s",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-8px)";
                            e.currentTarget.style.boxShadow =
                                "0 20px 40px rgba(0,0,0,.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >

                        <div
                            style={{
                                marginBottom: "20px",
                            }}
                        >
                            {icons[key] || <Cpu size={34} color="#6366f1" />}
                        </div>

                        <h2
                            style={{
                                color: "white",
                                textTransform: "capitalize",
                                marginBottom: "18px",
                            }}
                        >
                            {key}
                        </h2>

                        {Array.isArray(value) ? (
                            value.map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        padding: "10px 14px",
                                        background: "#1f2937",
                                        borderRadius: "10px",
                                        marginBottom: "10px",
                                        color: "#cbd5e1",
                                        fontWeight: "500",
                                    }}
                                >
                                    {item}
                                </div>
                            ))
                        ) : (
                            <div
                                style={{
                                    padding: "12px",
                                    background: "#1f2937",
                                    borderRadius: "10px",
                                    color: "#cbd5e1",
                                    lineHeight: "1.6",
                                }}
                            >
                                {value}
                            </div>
                        )}

                    </div>

                ))}

            </div>

        </div>

    );

}