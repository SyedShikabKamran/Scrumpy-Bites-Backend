const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http"); // Netlify adapter
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const Recipe = require("../models/recipe"); // Adjust path

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports.handler = serverless(app); // Export for Netlify
