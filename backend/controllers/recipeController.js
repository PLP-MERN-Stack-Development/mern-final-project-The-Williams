// backend/controllers/recipeController.js
import Recipe from "../models/Recipe.js";

// GET /api/recipes?search=&tag=
export const getRecipes = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (tag) query.tags = tag;

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/recipes/:id
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/recipes  (protected)
export const createRecipe = async (req, res) => {
  try {
    const payload = { ...req.body, authorId: req.user._id };
    const recipe = new Recipe(payload);
    const saved = await recipe.save();

    // Emit via Socket.io if available
    const io = req.app.get("io");
    if (io) io.emit("newRecipe", saved);

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/recipes/:id  (protected; only owner)
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only author can update
    if (recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }

    Object.assign(recipe, req.body);
    const updated = await recipe.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/recipes/:id  (protected; only owner)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await recipe.remove();
    res.json({ message: "Recipe removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
