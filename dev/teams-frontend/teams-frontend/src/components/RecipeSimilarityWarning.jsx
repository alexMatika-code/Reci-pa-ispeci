import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

const RecipeSimilarityWarning = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchAwaitingRecipes = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/recipes/checkSimilarity/${id}`);
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAwaitingRecipes();
    }, []);


    return (
        <div className={"w-100 mt-2"}>
            {loading ? (
                <Alert variant={"secondary"} className={"p-2"}>
                    🔍 Provjeravamo postoje li slični recepti...
                </Alert>
            ):(
                <div>
                    {recipes.length > 0 ? (
                        <Alert variant={"danger"} className={"p-2"}>
                            <span>🛑 Postoje slični recepti...</span>
                            {recipes.map((recipe, index) => (
                                <Link key={index} to={`/recipe/${recipe.recipeId}`}>{recipe.recipeId}, </Link>
                            ))}
                        </Alert>
                    ):(
                        <Alert variant={"success"} className={"p-2"}>
                            ✔️ Ne postoje slični recepti!
                        </Alert>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecipeSimilarityWarning;