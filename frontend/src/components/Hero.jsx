export default function Hero({ onExampleClick }) {
    const examples = [
        {
            title: "🏠 Airbnb Clone",
            name: "Airbnb Clone",
            description:
                "A booking platform with user authentication, payments, messaging, and reviews."
        },
        {
            title: "🚗 Uber Clone",
            name: "Uber Clone",
            description:
                "A ride-hailing platform with real-time tracking, payments, and driver management."
        },
        {
            title: "🎵 Spotify Clone",
            name: "Spotify Clone",
            description:
                "A music streaming platform with playlists, subscriptions, and recommendations."
        }
    ];

    return (
        <div className="hero">
            <h1>🚀 ForgeMind AI</h1>

            <p>
                AI-powered Software Architecture Generator
            </p>

            <div className="examples">
                {examples.map((example) => (
                    <button
                        key={example.name}
                        onClick={() =>
                            onExampleClick(
                                example.name,
                                example.description
                            )
                        }
                    >
                        {example.title}
                    </button>
                ))}
            </div>
        </div>
    );
}