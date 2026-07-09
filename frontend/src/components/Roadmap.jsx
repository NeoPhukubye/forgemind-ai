import { Calendar, Flag, CheckCircle } from "lucide-react";

export default function Roadmap({ result }) {

    const roadmap = result.development_roadmap || [];

    return (

        <div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "35px",
                }}
            >
                <Calendar size={32} color="#8b5cf6" />

                <h1
                    style={{
                        color: "white",
                        margin: 0,
                    }}
                >
                    Development Roadmap
                </h1>

            </div>

            <div
                style={{
                    position: "relative",
                    paddingLeft: "35px",
                }}
            >

                <div
                    style={{
                        position: "absolute",
                        left: "14px",
                        top: 0,
                        bottom: 0,
                        width: "3px",
                        background:
                            "linear-gradient(#7c3aed,#2563eb)",
                    }}
                />

                {roadmap.map((step, index) => (

                    <div
                        key={index}
                        style={{
                            position: "relative",
                            marginBottom: "35px",
                        }}
                    >

                        <div
                            style={{
                                position: "absolute",
                                left: "-29px",
                                top: "8px",
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background: "#8b5cf6",
                                border: "4px solid #111827",
                            }}
                        />

                        <div
                            style={{
                                background: "#111827",
                                borderRadius: "18px",
                                padding: "24px",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                                transition: ".3s",
                            }}
                            onMouseEnter={(e)=>{
                                e.currentTarget.style.transform="translateX(8px)";
                            }}
                            onMouseLeave={(e)=>{
                                e.currentTarget.style.transform="translateX(0)";
                            }}
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginBottom:"15px",
                                }}
                            >

                                <h2
                                    style={{
                                        color:"white",
                                        margin:0,
                                    }}
                                >
                                    Phase {index + 1}
                                </h2>

                                <Flag color="#22c55e"/>

                            </div>

                            <p
                                style={{
                                    color:"#cbd5e1",
                                    lineHeight:"1.8",
                                }}
                            >
                                {step}
                            </p>

                            <div
                                style={{
                                    marginTop:"20px",
                                    display:"flex",
                                    alignItems:"center",
                                    gap:"10px",
                                    color:"#22c55e",
                                    fontWeight:"600",
                                }}
                            >
                                <CheckCircle size={18}/>
                                Planned Milestone
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}