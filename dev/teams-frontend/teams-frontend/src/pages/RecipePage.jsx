import Navbar from "../components/Navbar.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner.jsx";
import {Container, Row} from "react-bootstrap";
import RecipePageCard from "../components/RecipePageCard.jsx";


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
            <Navbar/>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                recipe ? (
                    <div className={"w-75 m-auto pt-80"}>
                        <Row className={"d-flex"}>
                            {/* Recipe Info */}
                            <Container className={"col-md-12 col-lg-5 col-xl-3"}>
                                <RecipePageCard recipe={recipe}/>
                            </Container>

                            <Container className={"col-md-12 col-lg-7 col-xl-9"}>

                                <h5 className={"mt-3 ml-16 color-dsg font-weight-600"}>Opis: {recipe.description}</h5>
                                <h5 className={"mt-3 ml-16 color-dsg font-weight-600"}>Postupak pripreme</h5>
                                <p className={"mt-3 ml-16 color-dsg"}>
                                    {recipe.procedure}
                                </p>
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