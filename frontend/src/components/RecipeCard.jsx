import React from "react";
import Button from "./Button";

const RecipeCard = ({ recipe }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
        <img 
            src={recipe.imageURL} 
            alt={recipe.title} 
            className="w-full h-48 object-cover" 
        />
        <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{recipe.title}</h3>
            <p className="text-sm text-gray-500 mb-3">By: {recipe.author}</p>
            <Button primary={false} className="w-full">View Recipe</Button>
        </div>
    </div>
);

export default RecipeCard;
