export default function Footer() {
    return (
        <footer
            style={{
                marginTop: "60px",
                padding: "30px",
                textAlign: "center",
                color: "#94a3b8",
                borderTop: "1px solid rgba(255,255,255,.08)",
            }}
        >
            <h3 style={{ color: "white" }}>
                🚀 ForgeMind AI
            </h3>

            <p>
                Built with React • FastAPI • Google Gemini • Python • Docker
            </p>

            <p style={{ marginTop: "10px" }}>
                © 2026 ForgeMind AI — AMD Developer Challenge
            </p>
        </footer>
    );
}

