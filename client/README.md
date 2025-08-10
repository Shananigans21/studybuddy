## StudBuddy — Your Smart Study Companion
## Project Overview
StudBuddy is a React-based web application designed to help students plan study sessions, track their progress, and reflect on their learning. The app includes secure login, session management, and a reflections feature for note-taking and review.

## How to Run This Project
## Prerequisites
Node.js (v16 or later recommended) and npm installed.
Access to the backend API running locally on http://localhost:5555 or update .env accordingly.

## Steps
1. Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>/client

2. Install dependencies
npm install

3. Start the React development server
npm start

4. Access the app
Open your browser and go to:
http://localhost:4000

## Additional Notes
The backend API base URL can be configured via .env using REACT_APP_API_BASE_URL (default is http://127.0.0.1:5555).
The Navbar dynamically changes links based on login state.
The "Plan a Session" button navigates to a create session form.
The "Reflections" page allows adding, editing, filtering, and deleting study reflections.
All protected routes will redirect unauthorized users to the login page.
Styling uses simple CSS to ensure quick loading and ease of maintenance.

## Troubleshooting
If you see errors about API endpoints, verify your backend is running on port 5555.

Clear localStorage if login state becomes inconsistent (localStorage.clear() in browser console).

Run npm audit fix if you encounter dependency warnings.

Feel free to reach out if you have questions or need help running the project!
