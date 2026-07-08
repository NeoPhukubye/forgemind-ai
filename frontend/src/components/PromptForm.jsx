export default function PromptForm({
                                       projectName,
                                       description,
                                       setProjectName,
                                       setDescription,
                                       loading,
                                       onGenerate,
                                   }) {
    return (
        <div className="prompt-form">
            <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name..."
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your application..."
                rows={6}
            />

            <button
                onClick={onGenerate}
                disabled={loading}
            >
                {loading
                    ? "⚙ Generating..."
                    : "🚀 Generate Architecture"}
            </button>
        </div>
    );
}