import RecipePageTextBox from "./RecipePageTextBox.jsx";
import {useEffect, useState} from "react";

const RecipePageIngredients = ({ recipeId }) => {
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const res = await fetch(`/api/ingredients/recipe/${recipeId}`);
                const data = await res.json();
                setIngredients(data);

            } catch (error) {
                console.log(`Error fetching data - no ingredients found - ${recipeId}`, error);
            }
        };
        if (recipeId){
            fetchIngredients();
        }
    }, [recipeId]);

    const ingredientsList = ingredients && ingredients.length > 0
        ? ingredients.map((ingredient) => (
            `• ${ingredient.name}`
        )).join(' ')
        : 'Nema navedenih sastojaka';

    return (
        <div className="mb-4">
            <RecipePageTextBox header={"Sastojci:"} text={ingredientsList}/>
        </div>
    );
};

export default RecipePageIngredients;