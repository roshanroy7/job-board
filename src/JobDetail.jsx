import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function JobDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://job-board-production-9425.up.railway.app/api/jobs/${id}`)
            .then(res => res.json())
            .then(data => { setJob(data); setLoading(false) })
    }, [id])

    if (loading) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7ff" }}>
            <p style={{ color: "#6b7280", fontSize: "15px" }}>Loading job...</p>
        </div>
    )

    if (!job) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7ff" }}>
            <p style={{ color: "#6b7280" }}>Job not found.</p>
        </div>
    )

    const avatarHue = job.company.length * 37 % 360

    return (
        <div style={{ minHeight: "100vh", background: "#f8f7ff", fontFamily: "'Inter', sans-serif" }}>

            {/* Navbar */}
            <div style={{
                background: "#fff", borderBottom: "1.5px solid #e5e7eb",
                padding: "14px 32px", display: "flex", alignItems: "center",
                justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px"
                    }}></div>
                    <span style={{ fontSize: "17px", fontWeight: "800", color: "#111" }}>JobBoard</span>
                </div>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        background: "#fff", color: "#6366f1", border: "1.5px solid #6366f1",
                        borderRadius: "10px", padding: "8px 18px", fontSize: "13px",
                        cursor: "pointer", fontWeight: "600"
                    }}>
                    ← Back to jobs
                </button>
            </div>

            {/* Hero banner */}
            <div style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                padding: "40px 32px"
            }}>
                <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{
                        width: "64px", height: "64px", borderRadius: "16px", flexShrink: 0,
                        background: `hsl(${avatarHue}, 70%, 92%)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "28px", fontWeight: "800",
                        color: `hsl(${avatarHue}, 60%, 35%)`
                    }}>
                        {job.company[0]}
                    </div>
                    <div>
                        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>
                            {job.title}
                        </h1>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                            {job.company} · {job.location} · Posted {job.posted}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "28px 16px 60px" }}>

                {/* Tags */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
                    <span style={{
                        fontSize: "13px", padding: "5px 14px", borderRadius: "20px",
                        background: "#e0f2fe", color: "#0369a1", fontWeight: "600"
                    }}>{job.type}</span>
                    <span style={{
                        fontSize: "13px", padding: "5px 14px", borderRadius: "20px",
                        background: "#f0fdf4", color: "#15803d", fontWeight: "600"
                    }}> {job.salary}</span>
                </div>

                {/* About */}
                <div style={{
                    background: "#fff", borderRadius: "16px", padding: "28px",
                    border: "1.5px solid #e5e7eb", marginBottom: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}>
                    <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#111", marginBottom: "12px" }}>
                        About the role
                    </h2>
                    <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.8" }}>
                        {job.description}
                    </p>
                </div>

                {/* Requirements */}
                <div style={{
                    background: "#fff", borderRadius: "16px", padding: "28px",
                    border: "1.5px solid #e5e7eb", marginBottom: "24px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}>
                    <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#111", marginBottom: "12px" }}>
                        Requirements
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {job.requirements.map((req, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#374151" }}>
                                <span style={{
                                    width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "11px", color: "#fff", fontWeight: "700"
                                }}>✓</span>
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Apply button */}
                <button style={{
                    width: "100%", padding: "16px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff", border: "none", borderRadius: "14px",
                    fontSize: "16px", fontWeight: "700", cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.35)"
                }}>
                    Apply for this role 🚀
                </button>
            </div>
        </div>
    )
}