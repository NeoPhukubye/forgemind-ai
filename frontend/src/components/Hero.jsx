import { Link } from "react-router-dom";
import {
    Cpu,
    Code2,
    Bug,
    TestTube2,
    FileText,
    CalendarCheck,
    Sparkles,
    Zap,
    Shield,
    Layers,
} from "lucide-react";

const agents = [
    {
        icon: <Layers size={28} />,
        title: "Architect",
        desc: "Generate full system architectures with tech stacks, APIs, databases, and deployment plans.",
        to: "/",
        color: "#8b5cf6",
    },
    {
        icon: <CalendarCheck size={28} />,
        title: "Planner",
        desc: "Create sprint plans, milestones, user stories, and delivery roadmaps.",
        to: "/planner",
        color: "#3b82f6",
    },
    {
        icon: <Code2 size={28} />,
        title: "Coder",
        desc: "Generate production-ready code in any language with best practices.",
        to: "/coder",
        color: "#06b6d4",
    },
    {
        icon: <Bug size={28} />,
        title: "Debugger",
        desc: "Diagnose bugs, security flaws, and performance issues with fixes.",
        to: "/debugger",
        color: "#f59e0b",
    },
    {
        icon: <TestTube2 size={28} />,
        title: "Test Generator",
        desc: "Generate unit, integration, and edge case tests automatically.",
        to: "/tester",
        color: "#22c55e",
    },
    {
        icon: <FileText size={28} />,
        title: "Documentation",
        desc: "Create comprehensive READMEs, API docs, and project guides.",
        to: "/docs",
        color: "#ec4899",
    },
];

export default function Hero({ onExampleClick }) {
    const examples = [
        {
            title: "Smart Hospital",
            name: "Smart Hospital",
            description:
                "An AI-powered hospital management system with patient records, appointments, billing and medical analytics.",
        },
        {
            title: "E-Commerce Platform",
            name: "E-Commerce Platform",
            description:
                "A scalable online marketplace with authentication, payments, inventory management and analytics.",
        },
        {
            title: "Digital Banking",
            name: "Digital Banking",
            description:
                "A secure banking platform supporting accounts, payments, fraud detection and AI-powered insights.",
        },
    ];

    return (
        <section className="hero-section">
            {/* Animated background orbs */}
            <div className="hero-orb hero-orb--purple" />
            <div className="hero-orb hero-orb--blue" />
            <div className="hero-orb hero-orb--cyan" />

            {/* Badge */}
            <div className="hero-badge">
                <Sparkles size={14} />
                <span>Powered by Google Gemini AI</span>
            </div>

            {/* Main heading */}
            <h1 className="hero-title">
                Build Software
                <br />
                <span className="hero-title--gradient">10x Faster with AI</span>
            </h1>

            <p className="hero-subtitle">
                ForgeMind AI is your multi-agent engineering assistant. Design architectures,
                generate code, write tests, debug issues, and create documentation — all from a
                single prompt.
            </p>

            {/* CTA buttons */}
            <div className="hero-cta">
                <a href="#prompt-section" className="hero-btn hero-btn--primary">
                    <Zap size={18} />
                    Start Building
                </a>
                <Link to="/coder" className="hero-btn hero-btn--secondary">
                    <Code2 size={18} />
                    Try Code Agent
                </Link>
            </div>

            {/* Agent cards grid */}
            <div className="agents-grid">
                {agents.map((agent) => (
                    <Link
                        key={agent.title}
                        to={agent.to}
                        className="agent-card"
                        style={{ "--agent-color": agent.color }}
                    >
                        <div className="agent-card__icon">{agent.icon}</div>
                        <h3 className="agent-card__title">{agent.title}</h3>
                        <p className="agent-card__desc">{agent.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Features row */}
            <div className="features-row">
                <div className="feature-item">
                    <Zap size={20} color="#8b5cf6" />
                    <div>
                        <strong>Instant Generation</strong>
                        <span>Results in seconds, not hours</span>
                    </div>
                </div>
                <div className="feature-item">
                    <Shield size={20} color="#22c55e" />
                    <div>
                        <strong>Security First</strong>
                        <span>OWASP-aware recommendations</span>
                    </div>
                </div>
                <div className="feature-item">
                    <Cpu size={20} color="#06b6d4" />
                    <div>
                        <strong>6 AI Agents</strong>
                        <span>Specialized for every task</span>
                    </div>
                </div>
            </div>

            {/* Example prompts */}
            <div className="examples-section" id="prompt-section">
                <h2 className="examples-title">Try an example project</h2>
                <div className="hero-examples">
                    {examples.map((example) => (
                        <button
                            key={example.name}
                            className="example-card"
                            onClick={() => onExampleClick(example.name, example.description)}
                        >
                            <span className="example-card__name">{example.title}</span>
                            <span className="example-card__desc">{example.description}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
