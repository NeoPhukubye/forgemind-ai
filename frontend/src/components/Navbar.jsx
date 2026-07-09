import {
    Cpu,
    Sparkles,
    Github,
    Menu
} from "lucide-react";

export default function Navbar() {
    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backdropFilter: "blur(18px)",
                background: "rgba(2,6,23,.75)",
                borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
        >
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 28px",
                }}
            >
                {/* Left */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            display: "grid",
                            placeItems: "center",
                            background:
                                "linear-gradient(135deg,#7c3aed,#2563eb)",
                        }}
                    >
                        <Cpu size={24} color="white" />
                    </div>

                    <div>

                        <h2
                            style={{
                                margin: 0,
                                color: "white",
                                fontWeight: "800",
                            }}
                        >
                            ForgeMind AI
                        </h2>

                        <small
                            style={{
                                color: "#94a3b8",
                            }}
                        >
                            Enterprise AI Architect
                        </small>

                    </div>
                </div>

                {/* Center */}

                <div
                    style={{
                        display: "flex",
                        gap: "28px",
                        color: "#cbd5e1",
                        fontWeight: 600,
                    }}
                >

                    <span
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        Dashboard
                    </span>

                    <span
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        Features
                    </span>

                    <span
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        Documentation
                    </span>

                </div>

                {/* Right */}

                <div
                    style={{
                        display: "flex",
                        gap: "18px",
                        alignItems: "center",
                    }}
                >

                    <Sparkles
                        color="#8b5cf6"
                        size={22}
                    />

                    <Github
                        color="#cbd5e1"
                        size={22}
                        style={{
                            cursor: "pointer",
                        }}
                    />

                    <Menu
                        color="#cbd5e1"
                        size={22}
                    />

                </div>
            </div>
        </nav>
    );
}