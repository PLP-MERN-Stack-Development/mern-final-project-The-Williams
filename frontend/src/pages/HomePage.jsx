import React, { useState, useMemo } from "react";
import RecipeCard from "../components/RecipeCard";

const HomePage = ({ recipes, userId }) => {
    const [search, setSearch] = useState('');
    const [tagFilter, setTagFilter] = useState('');

    const filteredRecipes = useMemo(() => {
    return (recipes || []).filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
        const matchesTag = tagFilter
            ? recipe.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
            : true;
        return matchesSearch && matchesTag;
    });
}, [recipes, search, tagFilter]);

    return (
        <div className="space-y-8">
            <header className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 items-center">
                <h1 className="text-3xl font-bold text-gray-900 flex-1">
                    Discover Delicious Recipes
                </h1>
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg grow focus:ring-orange-500 focus:border-orange-500"
                />
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">All Tags</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Quick">Quick</option>
                  <option value="Spicy">Spicy</option>
                </select>
            </header>

            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Featured Recipes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                   <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 py-10">
                    No recipes found matching your criteria.
                  </p>
                )}
              </div>
            </section>
        </div>

    );
};

export default HomePage;
