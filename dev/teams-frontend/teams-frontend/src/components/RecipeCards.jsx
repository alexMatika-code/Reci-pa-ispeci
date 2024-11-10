import RecipeCard from "./RecipeCard.jsx";
import { useNavigate } from "react-router-dom";

const RecipeCards = ({ filteredRecipes }) => {
    const navigate = useNavigate();

    const navigateToRecipe = (recipe) => {
        navigate(`/recipe/${recipe.recipe_id}`, { state: recipe });
    };

    return (
        <div className="recipe-list">
            {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe, index) => (
                    <RecipeCard
                        onClick={() => navigateToRecipe(recipe)}
                        key={index}
                        image={recipe.imageBase64 ? `data:image/jpeg;base64,${recipe.imageBase64}` : null}
                        name={recipe.title}
                        description={recipe.description}
                    />
                ))
            ) : (
                <p>Nema takvih recepata</p>
            )}
        </div>
    );
};

export default RecipeCards;
