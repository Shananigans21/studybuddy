## Backend README

## Overview
This backend API provides RESTful endpoints to support the StudBuddy app. It handles data related to user authentication, study sessions, reflections, and other core features.

## Features
User login and authentication (token-based)
CRUD endpoints for study sessions
CRUD endpoints for reflections
Data validation and error handling
CORS enabled to allow frontend requests
Connects to a database for persistence (e.g., SQLite, PostgreSQL)

## Setup Instructions
## Prerequisites
Node.js (v16 or higher) / Python 3.x (depending on your backend)
Package manager: npm / pip
Database (if applicable): SQLite/PostgreSQL/MySQL

## Installation
1. Clone the repository:
git clone <your-repo-url>
cd your-repo-folder/backend

2. Install dependencies:
Node.js / Express backend:
npm install

3. Python / Flask backend:
pip install -r requirements.txt

## Environment Variables
Create a .env file in the backend folder with the following variables:
PORT=5555
DATABASE_URL=<your-database-connection-string>
SECRET_KEY=<your-secret-key-for-authentication>

## Database Setup
flask db upgrade

## Running the Server
Start the backend server locally:
python run.py
The API will be accessible at http://localhost:5555.

## API Endpoints
POST /login - user login, returns auth token
GET /sessions - list all study sessions
POST /sessions - create a new study session
GET /reflections - list all reflections
POST /reflections - create a new reflection

## Troubleshooting
Make sure your database is running and accessible.
Check environment variables are set correctly.
Use Postman or similar tools to test API endpoints.
Review server logs for error details.



