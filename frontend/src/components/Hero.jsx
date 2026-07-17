export default function Hero({ onExampleClick }) {
    const examples = [
        {
            title: "🏥 Smart Hospital",
            name: "Smart Hospital",
            description:
                "An AI-powered hospital management system with patient records, appointments, billing and medical analytics."
        },
        {
            title: "🛒 E-Commerce Platform",
            name: "E-Commerce Platform",
            description:
                "A scalable online marketplace with authentication, payments, inventory management and analytics."
        },
        {
            title: "💳 Digital Banking",
            name: "Digital Banking",
            description:
                "A secure banking platform supporting accounts, payments, fraud detection and AI-powered insights."
        }
    ];

    return (
        <section className="hero">

            <div
                style={{
                    display: "inline-block",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    background: "rgba(124,58,237,.15)",
                    color: "#a78bfa",
                    border: "1px solid rgba(124,58,237,.35)",
                    marginBottom: "25px",
                    fontWeight: 600,
                }}
            >
                🚀 Powered by Fireworks AI + AMD Accelerated Computing
            </div>

            <h1>
                ForgeMind AI
            </h1>

            <p
                style={{
                    maxWidth: "900px",
                    margin: "25px auto",
                    fontSize: "20px",
                    lineHeight: "1.8",
                }}
            >
                Generate <strong>enterprise-grade software architectures</strong>,
                technology stacks, REST APIs, database schemas, folder structures,
                security recommendations and development roadmaps in seconds using AI.
            </p>

            <div
                className="hero-examples"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "18px",
                    flexWrap: "wrap",
                    marginTop: "40px",
                }}
            >
                {examples.map((example) => (
                    <button
                        key={example.name}
                        onClick={() =>
                            onExampleClick(
                                example.name,
                                example.description
                            )
                        }
                        style={{
                            minWidth: "240px",
                            padding: "18px",
                            borderRadius: "18px",
                            border: "1px solid rgba(255,255,255,.08)",
                            background: "rgba(17,24,39,.85)",
                            color: "#fff",
                            cursor: "pointer",
                            transition: ".3s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow =
                                "0 15px 40px rgba(124,58,237,.35)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div
                            style={{
                                fontSize: "22px",
                                fontWeight: "bold",
                                marginBottom: "10px",
                            }}
                        >
                            {example.title}
                        </div>

                        <div
                            style={{
                                fontSize: "14px",
                                color: "#94a3b8",
                                lineHeight: "1.6",
                            }}
                        >
                            {example.description}
                        </div>
                    </button>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "35px",
                    marginTop: "60px",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <h2 style={{ color: "#8b5cf6" }}>⚡ AI Powered</h2>
                    <p style={{ color: "#94a3b8" }}>
                        Generate complete architectures in seconds.
                    </p>
                </div>

                <div>
                    <h2 style={{ color: "#3b82f6" }}>🏗 Enterprise Ready</h2>
                    <p style={{ color: "#94a3b8" }}>
                        Production-ready designs following industry best practices.
                    </p>
                </div>

                <div>
                    <h2 style={{ color: "#06b6d4" }}>🔒 Secure by Design</h2>
                    <p style={{ color: "#94a3b8" }}>
                        Security, scalability and DevOps recommendations included.
                    </p>
                </div>
            </div>

        </section>
    );
}