import { useParams, useNavigate } from "react-router-dom"

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Stripe",
        location: "Dublin, Ireland",
        type: "Full-time",
        salary: "€65,000 – €80,000",
        posted: "2 days ago",
        description: "We are looking for a talented Frontend Developer to join our team at Stripe. You will work on building and maintaining user-facing features for our payments platform used by millions of businesses worldwide.",
        requirements: [
            "2+ years of experience with React",
            "Strong understanding of HTML, CSS, JavaScript",
            "Experience with REST APIs",
            "Familiarity with Git and version control",
        ],
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "Shopify",
        location: "Remote",
        type: "Full-time",
        salary: "€70,000 – €90,000",
        posted: "1 day ago",
        description: "Join Shopify as a Backend Engineer and help power the platform that millions of merchants rely on. You will design and build scalable APIs and services.",
        requirements: [
            "3+ years of backend development experience",
            "Proficiency in Node.js or Python",
            "Experience with PostgreSQL or similar databases",
            "Understanding of REST API design",
        ],
    },
    {
        id: 3,
        title: "React Developer",
        company: "HubSpot",
        location: "Dublin, Ireland",
        type: "Contract",
        salary: "€50,000 – €60,000",
        posted: "3 days ago",
        description: "HubSpot is looking for a React Developer on a contract basis to help build new features for our CRM platform. This is a great opportunity to work with a world-class engineering team.",
        requirements: [
            "Strong React and JavaScript skills",
            "Experience with component libraries",
            "Good communication skills",
            "Ability to work independently",
        ],
    },
    {
        id: 4,
        title: "Junior Software Engineer",
        company: "Intercom",
        location: "Dublin, Ireland",
        type: "Full-time",
        salary: "€45,000 – €55,000",
        posted: "Today",
        description: "Intercom is hiring a Junior Software Engineer to join our growing engineering team. You will work across the full stack, learning from senior engineers and shipping real features from day one.",
        requirements: [
            "Some experience with JavaScript or any programming language",
            "Eagerness to learn and grow",
            "Familiarity with Git",
            "Good problem solving skills",
        ],
    },
]

export default function JobDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const job = jobs.find(j => j.id === parseInt(id))

    if (!job) return <p style={{ padding: "40px", textAlign: "center" }}>Job not found.</p>

    return (
        <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
            <div style={{
                background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px",
                display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
                <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#111" }}>JobBoard</h1>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        background: "transparent", color: "#111", border: "1px solid #e5e7eb",
                        borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer"
                    }}>
                    Back to jobs
                </button>
            </div>

            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 16px" }}>
                <div style={{
                    background: "#fff", border: "1px solid #e5e7eb",
                    borderRadius: "12px", padding: "32px"
                }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                        {job.title}
                    </h2>
                    <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "16px" }}>
                        {job.company} · {job.location}
                    </p>

                    <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                        <span style={{
                            fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
                            background: "#eff6ff", color: "#1d4ed8", fontWeight: "500"
                        }}>{job.type}</span>
                        <span style={{
                            fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
                            background: "#f0fdf4", color: "#15803d", fontWeight: "500"
                        }}>{job.salary}</span>
                        <span style={{
                            fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
                            background: "#f9fafb", color: "#6b7280", fontWeight: "500"
                        }}>Posted {job.posted}</span>
                    </div>

                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "10px" }}>
                        About the role
                    </h3>
                    <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7", marginBottom: "24px" }}>
                        {job.description}
                    </p>

                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "10px" }}>
                        Requirements
                    </h3>
                    <ul style={{ paddingLeft: "20px", marginBottom: "32px" }}>
                        {job.requirements.map((req, i) => (
                            <li key={i} style={{ fontSize: "14px", color: "#374151", lineHeight: "2" }}>{req}</li>
                        ))}
                    </ul>

                    <button style={{
                        background: "#111", color: "#fff", border: "none", borderRadius: "8px",
                        padding: "12px 28px", fontSize: "14px", cursor: "pointer", fontWeight: "500",
                        width: "100%"
                    }}>
                        Apply for this role
                    </button>
                </div>
            </div>
        </div>
    )
}