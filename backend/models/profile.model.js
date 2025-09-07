// models/profile.model.js
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

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
