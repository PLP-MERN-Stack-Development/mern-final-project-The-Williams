import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Button from "../components/Button";

const CreateRecipePage = () => {
    const { userId } = useContext(AuthContext);
    const [recipeData, setRecipeData] = useState({
        title: '', description: '', prepTime: '', cookTime: '', servings: '',
        ingredients: [{ name: '', quantity: '' }], instructions: [''], tags: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData(prev => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = recipeData.ingredients.map((ing, i) =>
            i === index ? { ...ing, [field]: value } : ing
        );
        setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = recipeData.instructions.map((inst, i) =>
            i === index ? value : inst
        );
        setRecipeData(prev => ({ ...prev, instructions: newInstructions }));
    };

    const addIngredient = () => setRecipeData(prev => ({ ...prev, ingredients: [...prev.ingredients, { name: '', quantity: '' }] }));
    const addInstruction = () => setRecipeData(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const user = auth.currentUser;
        if (!user) {
            setStatus('You must be logged in to submit a recipe.');
            console.error("No logged-in user");
            return;
        }

        const recipeToSave = {
            ...recipeData,
            prepTime: parseInt(recipeData.prepTime) || 0,
            cookTime: parseInt(recipeData.cookTime) || 0,
            servings: parseInt(recipeData.servings) || 0,
            tags: recipeData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            authorId: user.uid,

        };

        try {
            if (db) {
                const recipeCollection = collection(db, 'artifacts', 'default-app-id', 'public', 'data', 'recipes');
                await addDoc(recipeCollection, recipeToSave);
                setStatus('Recipe created successfully!');
                setRecipeData({
                    title: '', description: '', prepTime: '', cookTime: '', servings: '',
                    ingredients: [{ name: '', quantity: '' }], instructions: [''], tags: '',
                });
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus(`Submission failed: ${error.message}`);
        }
    };

    const InputField = ({ label, name, type = 'text', value, onChange }) => (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
        </div>
    );

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Submit Your Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField label="Recipe Title" name="title" value={recipeData.title} onChange={handleChange} />
                <InputField label="Description" name="description" value={recipeData.description} onChange={handleChange} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField label="Prep Time (mins)" name="prepTime" type="number" value={recipeData.prepTime} onChange={handleChange} />
                    <InputField label="Cook Time (mins)" name="cookTime" type="number" value={recipeData.cookTime} onChange={handleChange} />
                    <InputField label="Servings" name="servings" type="number" value={recipeData.servings} onChange={handleChange} />
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
                    {recipeData.ingredients.map((ing, index) => (
                        <div key={index} className="flex gap-3 mb-2">
                            <input type="text" placeholder="Ingredient Name" value={ing.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} className="w-1/2 p-2 border border-gray-300 rounded-lg" required />
                            <input type="text" placeholder="Quantity" value={ing.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} className="w-1/2 p-2 border border-gray-300 rounded-lg" required />
                        </div>
                    ))}
                    <Button type="button" onClick={addIngredient} primary={false} className="mt-2 text-xs">+ Add Ingredient</Button>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h3>
                    {recipeData.instructions.map((inst, index) => (
                        <div key={index} className="flex gap-3 mb-2">
                            <span className="p-2 bg-gray-100 rounded-l-lg font-mono text-sm border border-gray-300">Step {index + 1}</span>
                            <input type="text" placeholder="Instruction step" value={inst} onChange={(e) => handleInstructionChange(index, e.target.value)} className="grow p-2 border border-gray-300 rounded-r-lg" required />
                        </div>
                    ))}
                    <Button type="button" onClick={addInstruction} primary={false} className="mt-2 text-xs">+ Add Step</Button>
                </div>

                <InputField label="Tags (Comma Separated)" name="tags" value={recipeData.tags} onChange={handleChange} />

                <Button type="submit" primary={true} className="w-full mt-6">Submit Recipe</Button>
                {status && <div className={`p-3 rounded-lg text-center ${status.includes('failed') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{status}</div>}
            </form>
        </div>
    );
};

export default CreateRecipePage;
