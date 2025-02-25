const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const recipeRoutes = require("../routes/recipeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Root route to check if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log("Server.js executed!");
