import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const typeColors = {
  "Full-time": { bg: "#e0f2fe", color: "#0369a1" },
  "Contract": { bg: "#fef9c3", color: "#a16207" },
  "Part-time": { bg: "#fce7f3", color: "#be185d" },
}

function JobCard({ job }) {
  const navigate = useNavigate()
  const tc = typeColors[job.type] || { bg: "#f3f4f6", color: "#374151" }

  return (
    <div
      onClick={() => navigate(`/job/${job.id}`)}
      style={{
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: "16px",
        padding: "22px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"
      }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flex: 1 }}>
        <div style={{
          width: "46px", height: "46px", borderRadius: "12px", flexShrink: 0,
          background: `hsl(${job.company.length * 37 % 360}, 70%, 92%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: "700",
          color: `hsl(${job.company.length * 37 % 360}, 60%, 35%)`
        }}>
          {job.company[0]}
        </div>
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#111", marginBottom: "3px" }}>
            {job.title}
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>
            {job.company} · {job.location}
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
              background: tc.bg, color: tc.color, fontWeight: "600"
            }}>{job.type}</span>
            <span style={{
              fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
              background: "#f0fdf4", color: "#15803d", fontWeight: "600"
            }}> {job.salary}</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "10px" }}>{job.posted}</p>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/job/${job.id}`) }}
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", border: "none", borderRadius: "10px",
            padding: "8px 18px", fontSize: "13px", cursor: "pointer",
            fontWeight: "600", boxShadow: "0 2px 8px rgba(99,102,241,0.3)"
          }}>
          Apply →
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    fetch("https://job-board-production-681d.up.railway.app/api/jobs")
      .then(res => res.json())
      .then(data => { setJobs(data); setLoading(false) })
  }, [])

  const types = ["All", "Full-time", "Contract", "Part-time"]

  const filtered = jobs.filter(j => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "All" || j.type === filter
    return matchSearch && matchFilter
  })

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
        <button style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff", border: "none", borderRadius: "10px",
          padding: "9px 20px", fontSize: "13px", cursor: "pointer",
          fontWeight: "600", boxShadow: "0 2px 8px rgba(99,102,241,0.3)"
        }}>+ Post a Job</button>
      </div>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
        padding: "56px 32px", textAlign: "center"
      }}>
        <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#fff", marginBottom: "12px", lineHeight: 1.2 }}>
          Find your dream job
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "28px" }}>
          {loading ? "Loading..." : `${filtered.length} jobs waiting for you`}
        </p>
        <input
          type="text"
          placeholder="Search jobs, companies or locations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: "560px", padding: "14px 20px",
            fontSize: "15px", border: "none", borderRadius: "14px",
            outline: "none", boxSizing: "border-box",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)", fontFamily: "inherit"
          }}
        />
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", padding: "20px 32px 0", justifyContent: "center", flexWrap: "wrap" }}>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "7px 18px", borderRadius: "20px", fontSize: "13px",
              fontWeight: "600", cursor: "pointer", border: "1.5px solid",
              borderColor: filter === t ? "#6366f1" : "#e5e7eb",
              background: filter === t ? "#6366f1" : "#fff",
              color: filter === t ? "#fff" : "#6b7280",
              transition: "all 0.15s"
            }}
          >{t}</button>
        ))}
      </div>

      {/* Job list */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading
            ? <p style={{ color: "#6b7280", textAlign: "center", padding: "60px" }}>Loading jobs...</p>
            : filtered.length > 0
              ? filtered.map(job => <JobCard key={job.id} job={job} />)
              : <p style={{ color: "#6b7280", textAlign: "center", padding: "60px" }}>No jobs found.</p>
          }
        </div>
      </div>
    </div>
  )
}