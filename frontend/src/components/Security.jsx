import {
    ShieldCheck,
    Lock,
    CheckCircle,
    Copy
} from "lucide-react";
import toast from "react-hot-toast";

export default function Security({ result }) {

    const security = result.security_considerations || [];

    function copySecurity() {

        navigator.clipboard.writeText(
            security.join("\n")
        );

        toast.success("Security copied!");

    }

    return (

        <div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "35px",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >

                    <ShieldCheck
                        size={34}
                        color="#22c55e"
                    />

                    <h1
                        style={{
                            color: "white",
                            margin: 0,
                        }}
                    >
                        Security Recommendations
                    </h1>

                </div>

                <button
                    onClick={copySecurity}
                    style={{
                        padding: "10px 18px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        background:
                            "linear-gradient(90deg,#7c3aed,#2563eb)",
                        color: "white",
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
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(320px,1fr))",
                    gap: "22px",
                }}
            >

                {security.map((item, index) => (

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
                                display:"flex",
                                alignItems:"center",
                                gap:"12px",
                                marginBottom:"18px",
                            }}
                        >

                            <Lock
                                color="#22c55e"
                                size={28}
                            />

                            <h3
                                style={{
                                    color:"white",
                                    margin:0,
                                }}
                            >
                                Security Rule
                            </h3>

                        </div>

                        <p
                            style={{
                                color:"#cbd5e1",
                                lineHeight:"1.8",
                                marginBottom:"20px",
                            }}
                        >
                            {item}
                        </p>

                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                gap:"10px",
                                color:"#22c55e",
                                fontWeight:"600",
                            }}
                        >
                            <CheckCircle size={18}/>
                            Recommended
                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}