import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import Profile from "./models/profile.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// basic rate limit
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

// Health check
app.get("/health", (req, res) =>
  res.status(200).json({ status: "ok", ts: new Date() })
);

// Create profile
app.post("/profiles", async (req, res) => {
  try {
    const payload = req.body;
    const profile = new Profile(payload);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.get("/profiles", async (req, res) => {
  const { email } = req.query;
  try {
    if (email) {
      const p = await Profile.findOne({ email }).lean();
      if (!p) return res.status(404).json({ error: "Not found" });
      return res.json(p);
    }
    const list = await Profile.find().limit(100).lean();
    res.json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/profiles/:id", async (req, res) => {
  try {
    const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const MONGO = process.env.MONGO_URI;

mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server listening on", PORT));
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });
