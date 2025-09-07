import dotenv from "dotenv";
import mongoose from "mongoose";
import Profile from "../models/profile.model.js";

dotenv.config();

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/candidate_playground";

const seed = async () => {
  try {
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ connected");

    // Remove old profile with same email
    await Profile.deleteMany({ email: "raj.sharma@example.com" });

    const doc = {
      name: "Raj Sharma",
      email: "rjsharma.rs967@gmail.com",
      education: [
        {
          school: "Regal college",
          degree: "Bachelor of computer application(BCA)",
          startYear: 2022,
          endYear: 2025,
          details: "CGPA: 8.2/10",
        },
      ],
      skills: [
        "javascript",
        "react",
        "nodejs",
        "mongodb",
        "express",
        "html",
        "css",
        "typescript",
      ],
      projects: [
        {
          title: "Food Ordering Website",
          description:
            "Full stack food ordering app with authentication, cart, orders and admin panel.",
          links: {
            github: "https://github.com/renchooz/foodies",
            demo: "https://melodious-marigold-cac143.netlify.app/",
          },
        },
        {
          title: "Car Booking",
          description:
            "Owner dashboard to list cars, add cars, bookings with Node.js + MongoDB",
          links: {
            github: "https://github.com/renchooz/travlee",
            demo: "https://spiffy-daifuku-34a3c8.netlify.app/",
          },
          
        },
         {
          title: "Online chatting platform",
          description:
            "Users can chat with each other it supports real time messaging due to socket io",
          links: {
            github: "https://github.com/renchooz/travlee",
            demo: "https://spiffy-daifuku-34a3c8.netlify.app/",
          },
        }
      ],
      work: [
        {
          company: "Code Desk Pvt Ltd",
          role: "Web Developer Intern",
          startDate: new Date("2024-03-01"),
          endDate: new Date("2024-09-01"),
          description: "My role was to create restful api and connect it with frontend and create attractive ui",
        },
      ],
      links: {
        github: "https://github.com/renchooz",
        linkedin: "https://www.linkedin.com/in/raj-sharma9975/",
        portfolio: "https://www.linkedin.com/in/raj-sharma9975/",
      },
    };

    const p = new Profile(doc);
    await p.save();
    console.log("✅ seeded", p._id.toString());
  } catch (err) {
    console.error("❌ seeding failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
