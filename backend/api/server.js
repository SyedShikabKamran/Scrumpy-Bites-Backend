require("dotenv").config({ path: "./.env" }); // Explicitly specify path
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http"); // Required for Netlify

const Recipe = require("./models/recipe");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Debugging: Check if MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1); // Exit if MongoDB URI is missing
}

// Connect to MongoDB with better error handling
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if connection fails
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// Use recipe routes
app.use("/api/recipes", recipeRoutes);

// Export for serverless function
module.exports = app;
module.exports.handler = serverless(app);
