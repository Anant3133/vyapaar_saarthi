🇮🇳 Vyapar Saarthi - A Unified Business Portal
Your Compass for Effortless Business Navigation in India.

<p align="center">
<a href="https://opensource.org/licenses/ISC">
<img src="https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge" alt="License: ISC">
</a>
<a href="https://reactjs.org/">
<img src="https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
</a>
<a href="https://nodejs.org/">
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</a>
<a href="https://expressjs.com/">
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
</a>
<a href="https://www.postgresql.org/">
<img src="https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</a>
<a href="https://tailwindcss.com/">
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
</a>
</p>

📖 About The Project
Vyapar Saarthi (व्यापार सारथी) is a transformative full-stack web application designed to solve a major challenge for Indian entrepreneurs: the fragmented, slow, and often frustrating process of interacting with various government portals. Our mission is to provide a single, streamlined, and user-friendly platform for business registrations, license applications, and compliance management.

By creating a unified dashboard for business owners and a verification portal for government employees, we aim to enhance transparency, reduce bureaucratic hurdles, and truly improve the Ease of Doing Business in India.

✨ Key Features
🏢 Unified Dashboard: A single point of access for businesses to manage all their registrations and licenses.

🔐 Secure Role-Based Access: Distinct and secure portals for Business Owners and Government Employees using JWT authentication.

📝 Simplified Application Process: Intuitive forms and workflows for submitting applications and uploading necessary documents.

🚀 Real-Time Status Tracking: Track the status of applications as they are reviewed by government officials.

📁 Centralized Document Hub: Securely upload, store, and manage all business-related documents.

🎨 Modern & Responsive UI: A clean, fast, and accessible user interface built with the latest frontend technologies.

🛠️ Tech Stack & Architecture
This project is a modern full-stack application with a clear separation between the frontend and backend.

[ Frontend (React + Vite) ] <--- (REST API) ---> [ Backend (Node.js + Express) ] <--- (ORM) ---> [ Database (PostgreSQL) ]

Frontend
Technology

Description

React

A JavaScript library for building user interfaces.

Vite

A next-generation frontend tooling for fast development.

TypeScript

Statically typed language for robust code.

Tailwind CSS

A utility-first CSS framework for rapid UI development.

Radix UI & shadcn/ui

A suite of accessible, unstyled UI components.

React Router

For declarative, client-side routing.

Supabase Client

For potential direct interactions with Supabase services.

Axios

Promise-based HTTP client for API communication.

Backend
Technology

Description

Node.js

JavaScript runtime environment for the server.

Express.js

A minimalist and flexible web application framework.

PostgreSQL

A powerful, open-source object-relational database.

Sequelize

A modern ORM for Node.js and PostgreSQL.

JSON Web Tokens (JWT)

For secure, stateless user authentication.

Bcrypt

For hashing user passwords securely.

Multer

Middleware for handling multipart/form-data (file uploads).

Express Validator

For powerful server-side data validation.

🚀 Getting Started
To get a local copy up and running, please follow these steps.

📋 Prerequisites
Ensure you have the following software installed on your machine:

Node.js (v18 or newer)

npm (comes with Node.js)

Git

PostgreSQL (a running instance)

⚙️ Installation & Setup
Clone the Repository

git clone https://github.com/your-username/vyapar-saarthi.git
cd vyapar-saarthi

Set Up the Backend

Navigate to the server directory and install dependencies:

cd server
npm install

Set up your PostgreSQL database:

-- Log in to psql and run:
CREATE DATABASE vyapar_saarthi_db;

Create an environment file by copying the example:

cp .env.example .env

Edit the .env file with your database credentials and a JWT secret:

# Server Configuration
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=vyapar_saarthi_db
DB_PORT=5432

# JWT Configuration
JWT_SECRET="a-very-strong-and-secret-key-that-is-long"
JWT_EXPIRES_IN="1d"

Set Up the Frontend

Navigate to the frontend directory (from the root) and install dependencies:

cd ../frontend
npm install

Create a local environment file by copying the example:

cp .env.example .env.local

Edit the .env.local file to point to your local backend server. Add your Supabase keys if you use it for other services (e.g., storage).

# URL for the backend API
VITE_API_BASE_URL="http://localhost:3001"

# Supabase keys (if needed for file storage, etc.)
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

▶️ Running the Application
You will need to run the frontend and backend in two separate terminal windows.

Start the Backend Server

In a terminal, navigate to the server directory and run:

# From ./vyapar-saarthi/server
npm run dev

Your backend API should now be running on http://localhost:3001.

Start the Frontend Application

In a second terminal, navigate to the frontend directory and run:

# From ./vyapar-saarthi/frontend
npm run dev

Your React application should now be running. Open your browser and go to the URL provided (usually http://localhost:5173).

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the ISC License. See LICENSE file for more information.

<p align="center">
<em>Made with ❤️ for a Digital India.</em>
</p>
