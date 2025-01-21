import RecipeCard from "./RecipeCard.jsx";
import { useNavigate } from "react-router-dom";
import {Row} from "react-bootstrap";

const RecipeCards = ({ filteredRecipes }) => {
    const navigate = useNavigate();

    const navigateToRecipe = (recipe) => {
        navigate(`/recipe/${recipe.recipeId}`, { state: recipe });
    };

    return (
        // <div className="recipe-list">
        <Row>
            {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe, index) => (
                    <RecipeCard
                        onClick={() => navigateToRecipe(recipe)}
                        key={index}
                        image={recipe.imageBase64 ? `data:image/jpeg;base64,${recipe.imageBase64}` : null}
                        name={recipe.title}
                        timeToCook={recipe.timeToCook}
                        description={recipe.description}
                        waitingApproval={recipe.waitingApproval}
                        publicity={recipe.publicity}
                    />
                ))
            ) : (
                <p>Nema takvih recepata</p>
            )}
        </Row>
    );
};

export default RecipeCards;
