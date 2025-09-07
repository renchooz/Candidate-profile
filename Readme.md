# Candidate Playground

**Candidate Playground** is a full-stack web application designed to showcase a candidate’s profile, projects, skills, education, and work experience. The app allows a user to **view, update, and manage their personal profile** in a stylish, easy-to-use interface.  

This project is built using **React, Tailwind CSS, Node.js, Express, and MongoDB**, with secure API practices including **Helmet, CORS, and rate limiting**.

---

## **Live Demo**

> *https://candidate-profile-1.onrender.com/*

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
   git clone <[repo_url](https://github.com/renchooz/Candidate-profile)>
   cd candidate-playground/backend

2. Install dependencies:
   npm install

3. Create a .env file in the backend root:
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


# Schema
import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    startYear: Number,
    endYear: Number,
    details: String,
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    links: {
      github: String,
      demo: String,
      other: String,
    },
  },
  { _id: false }
);

const WorkSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String,
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    education: [EducationSchema],
    skills: [{ type: String, index: true }],
    projects: [ProjectSchema],
    work: [WorkSchema],
    links: {
      github: String,
      linkedin: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

// Text index for search across name & project fields
ProfileSchema.index({
  name: "text",
  "projects.title": "text",
  "projects.description": "text",
});



## Resume: https://drive.google.com/file/d/1j9NQFsj8kB_AspRB4A-sRyb1oIp-ubQc
## NOTE: The website may take time to load because the database is hosted in render and it takes 30-40 seconds to load 

