import { useState } from "react"

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Stripe",
    location: "Dublin, Ireland",
    type: "Full-time",
    salary: "€65,000 – €80,000",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Shopify",
    location: "Remote",
    type: "Full-time",
    salary: "€70,000 – €90,000",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "React Developer",
    company: "HubSpot",
    location: "Dublin, Ireland",
    type: "Contract",
    salary: "€50,000 – €60,000",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Junior Software Engineer",
    company: "Intercom",
    location: "Dublin, Ireland",
    type: "Full-time",
    salary: "€45,000 – €55,000",
    posted: "Today",
  },
]

function JobCard({ job }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "20px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "16px",
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
        <button style={{
          background: "#111", color: "#fff", border: "none",
          borderRadius: "8px", padding: "8px 16px", fontSize: "13px",
          cursor: "pointer", fontWeight: "500"
        }}>Apply</button>
      </div>
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState("")

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
          {filtered.length} jobs available
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
          {filtered.length > 0
            ? filtered.map(job => <JobCard key={job.id} job={job} />)
            : <p style={{ color: "#6b7280", textAlign: "center", padding: "40px" }}>No jobs found.</p>
          }
        </div>
      </div>
    </div>
  )
}