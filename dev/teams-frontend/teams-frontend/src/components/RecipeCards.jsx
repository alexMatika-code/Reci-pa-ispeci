import RecipeCard from "./RecipeCard.jsx";
import {useNavigate} from "react-router-dom";

const RecipeCards = ({filteredRecipes}) => {

    const navigateToRecipe = (recipe) => {
        navigate(`/recipe/${recipe.recipe_id}`, {state: recipe});
    };
    const navigate = useNavigate();

    return (
        <div className="recipe-list">
            {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe, index) => (
                    <RecipeCard
                        onClick={() => navigateToRecipe(recipe)}
                        key={index}
                        image={recipe.image}
                        name={recipe.name}
                        description={recipe.description}
                    />
                ))
            ) : (
                <p>Nema takvih recepata</p>
            )}
        </div>
    )
}
export default RecipeCards;