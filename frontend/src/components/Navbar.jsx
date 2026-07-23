import { Link } from "react-router-dom";
import { Cpu, Sparkles } from "lucide-react";

const navLinks = [
    { label: "Architect", to: "/" },
    { label: "Planner", to: "/planner" },
    { label: "Coder", to: "/coder" },
    { label: "Debugger", to: "/debugger" },
    { label: "Tests", to: "/tester" },
    { label: "Docs", to: "/docs" },
];

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
                className="navbar-inner"
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 28px",
                }}
            >
                <Link
                    to="/"
                    className="navbar-brand"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            display: "grid",
                            placeItems: "center",
                            background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                            flexShrink: 0,
                        }}
                    >
                        <Cpu size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: "white", fontWeight: "800" }}>
                            ForgeMind AI
                        </h2>
                        <small style={{ color: "#94a3b8" }}>
                            Multi-Agent Engineering Assistant
                        </small>
                    </div>
                </Link>

                <div
                    className="navbar-center"
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            style={{
                                color: "#cbd5e1",
                                fontWeight: 600,
                                textDecoration: "none",
                                padding: "8px 14px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                transition: "background .2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <Sparkles color="#8b5cf6" size={22} />
                </div>
            </div>
        </nav>
    );
}
