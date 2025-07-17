# Leaderboard Task

A full-stack leaderboard application built with Node.js and React. This project allows users to be selected from a list, have random points claimed for them, and displays a dynamically updated ranking on a leaderboard.

**Live Demo URL**: [https://leader-board-task-livid.vercel.app/](https://leader-board-task-livid.vercel.app/)

---

## Features

* **User Selection:** Select from a list of users fetched from the database.
* **Add New Users:** Dynamically add new users to the leaderboard from the UI.
* **Claim Points:** Award a random number of points (1-10) to the selected user with a button click.
* **Dynamic Leaderboard:** View a real-time ranked list of users based on total points.
* **Pagination:** The leaderboard is paginated to handle a large number of users efficiently.
* **Claim History:** A separate collection tracks the history of every point claim.

---

## Tech Stack

* **Frontend:**
    * React.js
    * Axios (for API requests)
    * CSS3
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB (with Mongoose)
    * CORS
* **Deployment:**
    * Backend hosted on Render.
    * Frontend hosted on Netlify / Vercel.

---

## How to Run Locally

To run this project on your local machine, follow these steps.

### Prerequisites

* Node.js and npm installed
* Git installed
* A MongoDB Atlas account and your connection string (MONGO_URI)

### 1. Clone the Repository

```bash
git clone [https://github.com/anoushka-10/LeaderBoard-Task.git](https://github.com/anoushka-10/LeaderBoard-Task.git)
cd your-repo-name
```

### 2. Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend folder and add your variables
touch .env
```

Your `backend/.env` file should look like this:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
REACT_APP_API_URL=http://localhost:5000

```bash
# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# The frontend does not require a .env file for local setup
# as the API URL is hardcoded for deployment.
```

```bash
# Start the frontend React app
npm start
```

The application should now be running, with the frontend on `http://localhost:3000` and the backend on `http://localhost:5000`.
