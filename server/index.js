const express = require("express")
const { Pool } = require("pg")

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

app.use(express.json())

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
})

app.get("/api/jobs", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs")
        res.json(result.rows)
    } catch (err) {
        console.error("DB ERROR:", err.message)
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/jobs/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [req.params.id])
        if (result.rows.length === 0) return res.status(404).json({ message: "Job not found" })
        res.json(result.rows[0])
    } catch (err) {
        console.error("DB ERROR:", err.message)
        res.status(500).json({ error: err.message })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})