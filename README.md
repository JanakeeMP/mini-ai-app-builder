# Mini AI App Builder Portal + User App UI

## Overview
This project is a basic web portal built for an internship evaluation task. It allows users to describe an app idea, captures requirements using an AI API (Gemini AI API), and dynamically generates a simple mock UI (e.g., forms, menus, tabs) based on the extracted details like App Name, Entities, Roles, and Features.

Key Features:
- **Requirement Capture**: User inputs an app description; AI extracts structured data.
- **Dynamic Mock UI**: Generates non-functional UI elements (e.g., entity forms with inferred fields, role tabs, feature lists).
- **Tech Stack**:
  - Frontend: React with Vite 7.1.7, Bootstrap, Axios.
  - Backend: Node.js with Express, Mongoose for MongoDB, Gemini AI API for AI extraction.
  - Database: MongoDB Atlas.
  - Deployment: Google Cloud Run with a single Node.js instance serving the built frontend and handling API requests.
- **ES Modules**: Used throughout for modern JavaScript syntax (`"type": "module"` in package.json).

## Prerequisites

- Node.js v20.19+.
- Git.
- Free accounts:
  - MongoDB Atlas (for database).
  - Gemini AI API (https://ai.google.dev/gemini-api/docs for key).
  - Google Cloud
- Google Cloud SDK: Install via gcloud init and authenticate.
- Postman for testing backend locally.


## Installation

1. Clone the repository `git clone <repo-url>`.

2. **Backend Setup**:
- Navigate to backend: `cd backend`.
- Install dependencies: `npm install`.
- Create `.env` file (copy from `.env.example`):
- Note: Use MongoDB Atlas URI for production; local MongoDB can be swapped if needed.

3. **Frontend Setup**:
- Navigate to frontend: `cd frontend`.
- Install dependencies: `npm install`.

## Running Locally
1. Start the backend: `cd backend && npm start`
- Runs on `http://localhost:8000` (or your PORT).

2. Start the frontend (development mode with HMR):`cd frontend && npm run dev`
- Runs on `http://localhost:5173` (Vite default port).
- Proxy setup in `vite.config.js` handles API calls to backend.

3. Test the app:
- Open `http://localhost:5173`.
- Enter the example description: "I want an app to manage student courses and grades. Teachers add courses, students enrol, and admins manage reports."
- Expected output: Extracted requirements and mock UI (e.g., tabs for Teacher/Student/Admin, forms for Student/Course/Grade with inferred fields like Name, Email, Age).

4. Test backend endpoints with Postman:
- POST `http://localhost:8000/api/requirements` with body `{ "description": "your app desc" }`.

## Deployment to Google Cloud App Engine
1. **Install gcloud CLI**:
   - Download and install from [cloud.google.com/sdk](https://cloud.google.com/sdk).
   - Initialize and authenticate: `gcloud init` and set your project with `gcloud config set project YOUR_PROJECT_ID`.
   - Enable App Engine API: `gcloud services enable appengine.googleapis.com`.

2. **Build the Frontend**:
   - Navigate to the frontend directory: `cd frontend`.
   - Build the project: `npm run build`.
   - Move outputs the build to  `backend/dist`

3. **Configure Deployment**:
   - Navigate to the backend directory: `cd ../backend`.
   - Create a `prod-env.yaml` file in the `backend/` directory with the following content:
    ```yaml
    env_variables:
    MONGODB_ATLAS_URI: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    GEMINI_API_KEY: your_api_key_here
    ```
   - Create an `app.yaml` file in the `backend/` directory with the following content:
     ```yaml
     runtime: nodejs22 //your node version
     env_variables: - prod-env.yaml
     ```
## Usage
- Enter app description and submit.
- View extracted requirements and generated mock UI.

## Project Structure

    mini-ai-app-builder/
    ├── backend/                     # Node.js/Express server
    │   ├── src/
    │   │   ├── models/              # MongoDB schemas 
    │   │   ├── routes/              # API routes 
    │   │   ├── services/            # Business logic + AI integration 
    │   │   ├── utils/               # Helpers 
    │   │   └── server.js            # Main entry point for Express app
    │   ├── app.yaml                 # Deployment config
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── .env.example             # Environment variable template
    │
    ├── frontend/                    # React app (Vite-based)
    │   ├── src/
    │   │   ├── assets/              # Static files
    │   │   ├── components/          # Reusable UI components
    │   │   │   ├── RequirementForm.jsx
    │   │   │   ├── ExtractedInfo.jsx
    │   │   │   ├── EntityForm.jsx
    │   │   │   └── MockUI.jsx
    │   │   ├── services/            # API client (fetch from backend, axios)
    │   │   ├── App.jsx              # Main app container
    │   │   ├── App.css              
    │   │   ├── main.jsx             # React entry point
    │   │   └── index.css            # Global styles
    │   ├── vite.config.js           # Vite configuration
    │   ├── package.json
    │   ├── package-lock.json
    │   └── README.md                # Frontend-specific docs
    │
    ├── .gitignore                   # Ignore node_modules, .env, dist, etc.
    ├── README.md                    # Main project instructions

## Additional Work/Ideas
- **Enhancements**: Add AI-generated field validation, user authentication.

For questions or contributions, open an issue on GitHub.

© 2025 Janakee M Patabadige. Built for Internship Evaluation.