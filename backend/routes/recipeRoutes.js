const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("❌ Error fetching recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new recipe
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    res.status(500).json({ message: "Error creating recipe" });
  }
});

// Update a recipe
router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    console.error("❌ Error updating recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a recipe
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    console.error("❌ Error deleting recipe:", error);
    res.status(500).json({ message: "Error deleting recipe" });
  }
});

module.exports = router;
