# Candidate Playground

**Candidate Playground** is a full-stack web application designed to showcase a candidate’s profile, projects, skills, education, and work experience. The app allows a user to **view, update, and manage their personal profile** in a stylish, easy-to-use interface.  

This project is built using **React, Tailwind CSS, Node.js, Express, and MongoDB**, with secure API practices including **Helmet, CORS, and rate limiting**.

---

## **Live Demo**

> *Optional: Add frontend deployment link here if hosted*

---

## **Features**

- View your personal profile
- Update all profile fields except email
- Display and manage:
  - Skills  
  - Education  
  - Projects (with GitHub, demo, other links)  
  - Work experience  
  - Portfolio links
- Search and filter projects by skill
- Aggregated skill statistics
- Secure backend with CORS, Helmet, and rate limiting
- Environment variable configuration for flexibility

---

## **Tech Stack**

- **Frontend:** React, Tailwind CSS, Axios  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Security:** Helmet, CORS, Rate Limiting  
- **Environment:** dotenv

---

## **Getting Started**

### **Backend Setup**

1. Clone the repository and navigate to backend:
   ```bash
   git clone <repo_url>
   cd candidate-playground/backend

2. Install dependencies:
   npm install

3.Create a .env file in the backend root:
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/candidate_playground  

4. Start the backend server:
   npm run dev


## Frontend Setup

1. Navigate to the frontend folder:
   cd ../frontend

2. Install dependencies:
   npm install

3. npm start   


## NOTE: The website may take time to load because the database is hosted in render and it takes 30-40 seconds to load 

