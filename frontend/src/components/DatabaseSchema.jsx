import { Database, Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function DatabaseSchema({ result }) {

    const tables = result.database_schema || [];

    function copyDatabase() {

        const text = tables.map(table =>

            `${table.table}

${table.fields.join("\n")}

`
        ).join("");

        navigator.clipboard.writeText(text);

        toast.success("Database schema copied!");

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
                    🗄 Database Schema
                </h1>

                <button
                    onClick={copyDatabase}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        color: "white",
                        background:
                            "linear-gradient(90deg,#7c3aed,#2563eb)"
                    }}
                >
                    <Copy size={18}/>
                </button>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(320px,1fr))",
                    gap: "24px",
                }}
            >

                {tables.map((table, index) => (

                    <div
                        key={index}
                        style={{
                            background: "#111827",
                            borderRadius: "18px",
                            padding: "24px",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                            transition: ".3s",
                        }}
                        onMouseEnter={(e)=>{
                            e.currentTarget.style.transform="translateY(-6px)";
                            e.currentTarget.style.boxShadow="0 18px 35px rgba(0,0,0,.35)";
                        }}
                        onMouseLeave={(e)=>{
                            e.currentTarget.style.transform="translateY(0)";
                            e.currentTarget.style.boxShadow="none";
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "20px",
                            }}
                        >

                            <Database
                                size={28}
                                color="#22c55e"
                            />

                            <h2
                                style={{
                                    color: "white",
                                    margin: 0,
                                }}
                            >
                                {table.table}
                            </h2>

                        </div>

                        {table.fields.map((field, i) => (

                            <div
                                key={i}
                                style={{
                                    padding: "10px 14px",
                                    marginBottom: "10px",
                                    background: "#1f2937",
                                    borderRadius: "10px",
                                    color: "#cbd5e1",
                                    fontFamily: "monospace",
                                    borderLeft: "4px solid #22c55e",
                                }}
                            >
                                {field}
                            </div>

                        ))}

                    </div>

                ))}

            </div>

        </div>

    );

}