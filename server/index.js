const express = require("express")

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.use(express.json())

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Stripe",
        location: "Dublin, Ireland",
        type: "Full-time",
        salary: "€65,000 – €80,000",
        posted: "2 days ago",
        description: "We are looking for a talented Frontend Developer to join our team at Stripe.",
        requirements: ["2+ years of experience with React", "Strong understanding of HTML, CSS, JavaScript", "Experience with REST APIs"],
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "Shopify",
        location: "Remote",
        type: "Full-time",
        salary: "€70,000 – €90,000",
        posted: "1 day ago",
        description: "Join Shopify as a Backend Engineer and help power the platform that millions of merchants rely on.",
        requirements: ["3+ years of backend development experience", "Proficiency in Node.js or Python", "Experience with PostgreSQL"],
    },
    {
        id: 3,
        title: "React Developer",
        company: "HubSpot",
        location: "Dublin, Ireland",
        type: "Contract",
        salary: "€50,000 – €60,000",
        posted: "3 days ago",
        description: "HubSpot is looking for a React Developer on a contract basis.",
        requirements: ["Strong React and JavaScript skills", "Experience with component libraries", "Good communication skills"],
    },
    {
        id: 4,
        title: "Junior Software Engineer",
        company: "Intercom",
        location: "Dublin, Ireland",
        type: "Full-time",
        salary: "€45,000 – €55,000",
        posted: "Today",
        description: "Intercom is hiring a Junior Software Engineer to join our growing engineering team.",
        requirements: ["Some experience with JavaScript", "Eagerness to learn and grow", "Familiarity with Git"],
    },
]

app.get("/api/jobs", (req, res) => {
    res.json(jobs)
})

app.get("/api/jobs/:id", (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id))
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
})

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001")
})