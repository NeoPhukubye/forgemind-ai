import { useEffect, useState } from "react";
import { getDashboardStatus } from "../services/agentService";

export default function Dashboard() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getDashboardStatus()
            .then(setStatus)
            .catch((err) => {
                console.error(err);
                setError("Could not load backend dashboard status.");
            });
    }, []);

    return (
        <section className="agent-panel">
            <h1>Project Dashboard</h1>

            {error && <p className="agent-error">{error}</p>}

            {!status && !error && <p>Loading project status...</p>}

            {status && (
                <div className="dashboard-grid">
                    <div>
                        <h2>Completed</h2>
                        <ul>
                            {status.completed.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2>Next</h2>
                        <ul>
                            {status.next.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}
