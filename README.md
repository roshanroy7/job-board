# JobBoard 

A full-stack job board web application where users can browse, search, and apply for jobs.

**Live Demo:** https://job-board-ashen-one.vercel.app

---

## What I Built

A complete web application with:
- A **frontend** (what users see) built with React
- A **backend** (the server) built with Node.js and Express
- A **database** (where data is stored) using PostgreSQL
- Both deployed live on the internet

---

## Tech Stack

| Part | Technology | What it does |
|------|-----------|--------------|
| Frontend | React | Builds the UI that users interact with |
| Routing | React Router | Handles navigation between pages |
| Backend | Node.js + Express | Server that handles API requests |
| Database | PostgreSQL | Stores all job data permanently |
| Frontend Deploy | Vercel | Hosts the React app live |
| Backend Deploy | Railway | Hosts the Node.js server and database live |

---

## Features

- Browse all job listings
- Search jobs by title, company, or location
- Filter jobs by type (Full-time, Contract, Part-time)
- Click any job to see full details
- Responsive design that works on mobile and desktop

---

## Project Structure

| File/Folder | Purpose |
|-------------|---------|
| `src/App.jsx` | Main page — job listings and search |
| `src/JobDetail.jsx` | Individual job detail page |
| `src/main.jsx` | Entry point — sets up routing |
| `server/index.js` | Express server and API routes |
| `server/package.json` | Backend dependencies |
| `package.json` | Frontend dependencies |

---

## How It Works

### Frontend (React)
The frontend is built with **React** — a JavaScript library for building user interfaces.

- `App.jsx` — The home page. When it loads, it uses `useEffect` (a React hook that runs code when the page loads) to fetch jobs from the backend API. It stores the jobs in `useState` (React's way of remembering data) and displays them as cards.
- `JobDetail.jsx` — When you click a job card, React Router navigates to `/job/1` (or whichever ID). This page fetches that specific job from the API and displays the full details.
- `main.jsx` — Sets up React Router so the app knows which component to show for which URL.

### Backend (Node.js + Express)
The backend is a **REST API** — a server that responds to requests with data.

- When the frontend visits `/api/jobs`, the server queries the database and returns all jobs as JSON.
- When the frontend visits `/api/jobs/1`, the server returns just that one job.
- **CORS** is enabled so the frontend (on a different domain) is allowed to talk to the backend.

### Database (PostgreSQL)
The database stores all job data in a table called `jobs`.

| Column | Type | Example |
|--------|------|---------|
| id | number | 1 |
| title | text | "Frontend Developer" |
| company | text | "Stripe" |
| location | text | "Dublin, Ireland" |
| type | text | "Full-time" |
| salary | text | "€65,000 – €80,000" |
| description | text | "We are looking for..." |
| requirements | text array | ["React", "JavaScript"] |

---

## Key Concepts I Used

### useEffect
```jsx
useEffect(() => {
  fetch("https://api.../api/jobs")
    .then(res => res.json())
    .then(data => setJobs(data))
}, [])
```
Runs code after the page loads. The empty `[]` means run only once. Here it fetches jobs from the API when the page first opens.

### useState
```jsx
const [jobs, setJobs] = useState([])
```
Lets React remember data. `jobs` holds the list. `setJobs` updates it. When it updates, the page automatically re-renders.

### REST API
```javascript
app.get("/api/jobs", async (req, res) => {
  const result = await pool.query("SELECT * FROM jobs")
  res.json(result.rows)
})
```
When something visits `/api/jobs`, the server runs a SQL query and sends the results back as JSON.

### React Router
```jsx
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/job/:id" element={<JobDetail />} />
</Routes>
```
Decides which page to show based on the URL.

---

## Running Locally

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
node index.js
```

---

## What I Learned

- How to build a React app with components, state, and hooks
- How to use React Router for multi-page navigation
- How to build a REST API with Node.js and Express
- How to connect a server to a PostgreSQL database
- How to deploy a full-stack app with Vercel and Railway
- How Git and GitHub work for version control

---

## Author

**Roshan Roy** — [@roshanroy7]
(https://github.com/roshanroy7) 
