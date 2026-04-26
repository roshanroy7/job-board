import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function JobCard({ job }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/job/${job.id}`)}
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        cursor: "pointer",
      }}>
      <div>
        <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "4px" }}>
          {job.title}
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>
          {job.company} · {job.location}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{
            fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
            background: "#eff6ff", color: "#1d4ed8", fontWeight: "500"
          }}>{job.type}</span>
          <span style={{
            fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
            background: "#f0fdf4", color: "#15803d", fontWeight: "500"
          }}>{job.salary}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px" }}>{job.posted}</p>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/job/${job.id}`) }}
          style={{
            background: "#111", color: "#fff", border: "none",
            borderRadius: "8px", padding: "8px 16px", fontSize: "13px",
            cursor: "pointer", fontWeight: "500"
          }}>Apply</button>
      </div>
    </div>
  )
}

export default function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/api/jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
  }, [])

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <div style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#111" }}>JobBoard</h1>
        <button style={{
          background: "#111", color: "#fff", border: "none", borderRadius: "8px",
          padding: "8px 16px", fontSize: "13px", cursor: "pointer"
        }}>Post a job</button>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 16px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>
          Find your next role
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          {loading ? "Loading..." : `${filtered.length} jobs available`}
        </p>
        <input
          type="text"
          placeholder="Search jobs, companies or locations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px", fontSize: "14px",
            border: "1px solid #e5e7eb", borderRadius: "10px",
            marginBottom: "20px", outline: "none", boxSizing: "border-box"
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading
            ? <p style={{ color: "#6b7280", textAlign: "center", padding: "40px" }}>Loading jobs...</p>
            : filtered.length > 0
              ? filtered.map(job => <JobCard key={job.id} job={job} />)
              : <p style={{ color: "#6b7280", textAlign: "center", padding: "40px" }}>No jobs found.</p>
          }
        </div>
      </div>
    </div>
  )
}