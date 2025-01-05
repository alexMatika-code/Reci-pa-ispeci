import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner.jsx";
import {Container, Row} from "react-bootstrap";
import RecipePageImage from "../components/RecipePageImage.jsx";
import RecipePageTextBox from "../components/RecipePageTextBox.jsx";
import RecipeNameAndRating from "../components/RecipeNameAndRating.jsx";


const RecipePage = () => {
    const [loading, setLoading] = useState(true);
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log(recipeId)
                const res = await fetch(`/api/recipes/${recipeId}`);
                const data = await res.json();
                console.log(data)
                setRecipe(data);

            } catch (error) {
                console.log(`Error fetching data - no recipe found - ${recipeId}`, error);
            } finally {
                setLoading(false);
            }
        };
        if (recipeId){
            setLoading(true);
            fetchRecipe();
        }
    }, [recipeId]);

    return (
        <div>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                recipe ? (
                    <div className={"justify-content-center align-items-center p-5 pt-80 pl-80"}>
                        <Row className={"d-flex"}>
                            {/* Recipe Info */}
                            <Container className={"col-md-10 col-lg-4 col-xl-3"}>
                                <RecipePageImage recipe={recipe}/>
                            </Container>

                            <Container className={"col-md-12 col-lg-7 col-xl-8"}>

                                <RecipeNameAndRating recipe={recipe}/>
                                <RecipePageTextBox header={"Opis:"} text = {recipe.description}/>
                                <RecipePageTextBox header={"Postupak:"} text = {recipe.procedure}></RecipePageTextBox>
                            </Container>
                        </Row>
                    </div>
                ) : (
                    <div>ne postoji</div>
                )
            )}
        </div>
    );
};

export default RecipePage;