import {
    Folder,
    FileCode,
    Copy
} from "lucide-react";
import toast from "react-hot-toast";

export default function FolderStructure({ result }) {

    const folders = result.folder_structure || [];

    function copyFolders() {

        navigator.clipboard.writeText(
            folders.join("\n")
        );

        toast.success("Folder structure copied!");

    }

    return (

        <div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >

                <h1
                    style={{
                        color: "white",
                        margin: 0,
                    }}
                >
                    📁 Folder Structure
                </h1>

                <button
                    onClick={copyFolders}
                    style={{
                        padding: "10px 18px",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(90deg,#7c3aed,#2563eb)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Copy size={18}/>
                    Copy
                </button>

            </div>

            <div
                style={{
                    background: "#0f172a",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,.08)",
                    overflow: "hidden",
                }}
            >

                <div
                    style={{
                        background: "#1e293b",
                        padding: "14px 20px",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >

                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#ef4444",
                        }}
                    />

                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#f59e0b",
                        }}
                    />

                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#22c55e",
                        }}
                    />

                    <span
                        style={{
                            color: "#94a3b8",
                            marginLeft: "20px",
                            fontWeight: "600",
                        }}
                    >
                        project/
                    </span>

                </div>

                <div
                    style={{
                        padding: "25px",
                    }}
                >

                    {folders.map((folder, index) => (

                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px",
                                borderRadius: "10px",
                                color: "#cbd5e1",
                                transition: ".3s",
                            }}
                            onMouseEnter={(e)=>{
                                e.currentTarget.style.background="#1e293b";
                            }}
                            onMouseLeave={(e)=>{
                                e.currentTarget.style.background="transparent";
                            }}
                        >

                            {folder.includes(".") ? (

                                <FileCode
                                    size={20}
                                    color="#38bdf8"
                                />

                            ) : (

                                <Folder
                                    size={20}
                                    color="#fbbf24"
                                />

                            )}

                            <span
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: "15px",
                                }}
                            >
                                {folder}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}