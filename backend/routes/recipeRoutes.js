// backend/routes/recipeRoutes.js
import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, createRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

export default router;
