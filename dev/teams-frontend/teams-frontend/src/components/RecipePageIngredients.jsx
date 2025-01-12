import RecipePageTextBox from "./RecipePageTextBox.jsx";
import {useEffect, useState} from "react";


const RecipePageIngredients = ({ recipeId }) => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    //console.log(recipeId);
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                //console.log(recipeId)
                const res = await fetch(`/api/ingredients/recipe/${recipeId}`);
                const data = await res.json();
                //console.log(data)
                setIngredients(data);

            } catch (error) {
                console.log(`Error fetching data - no ingredients found - ${recipeId}`, error);
            } finally {
                setLoading(false);
            }
        };
        if (recipeId){
            setLoading(true);
            fetchIngredients();
        }
    }, [recipeId]);
    //console.log(recipeId);
    //console.log(ingredients);
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