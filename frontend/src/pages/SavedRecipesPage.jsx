import React from "react";
import RecipeCard from "../components/RecipeCard";

const SavedRecipesPage = ({ savedRecipes }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900">Your Saved Recipes</h2>
            <p className="text-gray-600">These are the recipes you've marked as favorites.</p>

            {savedRecipes.length === 0 ? (
                <div className="p-10 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <p className="text-lg text-gray-500">You haven't saved any recipes yet!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {savedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
                </div>
            )}
        </div>
    );
};

export default SavedRecipesPage;
