import {
    Monitor,
    Server,
    Database,
    Cloud
} from "lucide-react";

export default function ArchitectureDiagram({ result }) {

    const frontend =
        result.tech_stack?.frontend || "Frontend";

    const backend =
        result.tech_stack?.backend || "Backend";

    const database =
        result.tech_stack?.database || "Database";

    return (

        <div
            className="card"
            style={{
                marginTop: "30px",
                padding: "35px",
            }}
        >

            <h2
                style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "40px",
                }}
            >
                🏗 System Architecture
            </h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "40px",
                }}
            >

                <Box
                    icon={<Monitor size={40} color="#8b5cf6" />}
                    title="Frontend"
                    value={frontend}
                />

                <Arrow />

                <Box
                    icon={<Server size={40} color="#3b82f6" />}
                    title="Backend"
                    value={backend}
                />

                <Arrow />

                <Box
                    icon={<Database size={40} color="#22c55e" />}
                    title="Database"
                    value={database}
                />

                <Arrow />

                <Box
                    icon={<Cloud size={40} color="#06b6d4" />}
                    title="Deployment"
                    value="Cloud"
                />

            </div>

        </div>

    );

}

function Arrow() {

    return (
        <div
            style={{
                fontSize: "40px",
                color: "#8b5cf6",
                fontWeight: "bold",
            }}
        >
            ➜
        </div>
    );

}

function Box({ icon, title, value }) {

    return (

        <div
            style={{
                background: "#111827",
                padding: "30px",
                borderRadius: "18px",
                width: "220px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,.08)",
                transition: ".3s",
            }}
        >

            <div
                style={{
                    marginBottom: "20px",
                }}
            >
                {icon}
            </div>

            <h3
                style={{
                    color: "white",
                    marginBottom: "15px",
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    color: "#cbd5e1",
                    lineHeight: "1.7",
                }}
            >
                {Array.isArray(value)
                    ? value.join(", ")
                    : value}
            </p>

        </div>

    );

}