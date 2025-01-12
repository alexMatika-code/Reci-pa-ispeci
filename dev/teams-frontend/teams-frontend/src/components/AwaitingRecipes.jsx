import {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import Spinner from "./Spinner.jsx";
import AwaitingRecipe from "./AwaitingRecipe.jsx";

const AwaitingRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAwaitingRecipes = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/chef/waitingApproval`);
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAwaitingRecipes();
    }, );

    return (
        <Row>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <AwaitingRecipe key={recipe.recipeId} title={recipe.title} description={recipe.description} id={recipe.recipeId} image={recipe.imageBase64}/>
                    ))
                ) : (
                    <div className={"text-center color-dsg"}>Nema tih recepata</div>
                )
            )}
        </Row>
    );
};

export default AwaitingRecipes;
