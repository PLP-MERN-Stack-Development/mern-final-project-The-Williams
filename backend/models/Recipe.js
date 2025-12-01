// backend/models/Recipe.js
import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    prepTime: { type: Number, default: 0 },
    cookTime: { type: Number, default: 0 },
    servings: { type: Number, default: 1 },
    ingredients: [ingredientSchema],
    instructions: [{ type: String }],
    tags: [{ type: String }],
    imageURL: { type: String, default: "" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    avgRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
