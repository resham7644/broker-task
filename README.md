# 👤 Customer Onboarding Workflow MVP – Neximprove Internship Task

This project simulates the onboarding flow for customs brokers who register importers/exporters. Built as a full-stack web application, it allows brokers to securely register customers and manage them via an interactive dashboard.

---

## 📐 Architecture Overview

Frontend (React + Tailwind)
- Axios API calls
Backend (Express.js + Node.js)
- PostgreSQL Client
Database (PostgreSQL)


- **Frontend**: Handles registration form, validation, and routing
- **Backend**: Exposes REST API for creating and fetching customers
- **Database**: Stores hashed passwords and customer details

---

## 🛡️ Security Highlights

- Passwords are hashed using **bcrypt** before storage
- Email and GSTIN are validated via regex on the frontend
- PostgreSQL enforces **unique constraints** on email and GSTIN
- No sensitive credentials are exposed (stored in `.env`)

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Security**: bcrypt, .env for secrets

---

## 🚀 Features

- Customer registration form (Name, Email, GSTIN, Type)
- Validation for email and 15-digit GSTIN
- Password auto-generation and hashing
- Redirect to dashboard after registration
- Dashboard shows full-width user cards
- Mobile-first responsive UI
- 🔍 **Search** by name, email, or GSTIN
- 🧭 **Filter** by Importer, Exporter, or All

---

## 📁 Project Structure

broker-task/
- ├── frontend/ → React UI with routing, API calls, Tailwind styling
- ├── backend/ → Express server with DB connection and routes
- ├── .env.example → Sample environment variables
- ├── README.md → Project guide and architecture explanation


---

## 🧪 How to Run Locally

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL credentials
node server.js

### 1. Frontend Setup

cd frontend
npm install
npm start

📬 Author
Resham
Web Developer Intern Applicant
GitHub: github.com/resham7644
Email: resham7644@gmail.com

