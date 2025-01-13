import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import {AuthContext} from "../Contexts.jsx";
import Spinner from "../components/Spinner.jsx";
import {Button, Container, Row} from "react-bootstrap";
import RecipePageImage from "../components/RecipePageImage.jsx";
import RecipePageTextBox from "../components/RecipePageTextBox.jsx";
import RecipeNameAndRating from "../components/RecipeNameAndRating.jsx";
import ProfileIcon from "../components/ProfileIcon.jsx";
import RecipeComment from "../components/RecipeComment.jsx";
import AddReviewForm from "../components/AddReviewForm.jsx";
import RecipePageIngredients from "../components/RecipePageIngredients.jsx";
import {toast} from "react-toastify";
import RecipeSimilarityWarning from "../components/RecipeSimilarityWarning.jsx";
import ErrorPage from "./ErrorPage.jsx";

const RecipePage = () => {
    const currentUser = useContext(AuthContext);
    const [disableButtons, setDisableButtons] = useState(false);
    const [loading, setLoading] = useState(true);
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log(recipeId)
                const res = await fetch(`/api/recipes/${recipeId}`);
                const data = await res.json();
                console.log('Recipe data:', data)
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

    const handleEditClick = () => {
        navigate(`/recipe/${recipeId}/edit`);
    };

    const handleReviewAdded = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/recipes/${recipeId}`);
            if (!res.ok) {
                throw new Error('Failed to refresh recipe data');
            }
            const data = await res.json();
            setRecipe(data);
        } catch (error) {
            console.error('Error refreshing recipe:', error);
        } finally {
            setLoading(false);
        }
    };

    const approve = async () => {
        try {
            setDisableButtons(true);
            const response = await fetch(`/api/chef/approve/${recipeId}`, {method: "PUT"})
            if(response.ok) {
                toast.success("Recept odobren!");
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error approving:", error);
        }
        finally {
            navigate('/recipe/approve');
            setDisableButtons(false);
        }
    }

    const reject = async () => {
        try {
            setDisableButtons(true);
            const response = await fetch(`/api/chef/reject/${recipeId}`, {method: "DELETE"})
            if(response.ok) {
                toast.success("Recept odbijen!");
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error rejecting:", error);
        }
        finally {
            navigate('/recipe/approve');
            setDisableButtons(false);
        }

        console.log("Curren user: " + currentUser.personId);
    }

    return (
        <div>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                recipe ? (
                    <div className={"justify-content-center align-items-center p-5 pt-80 pl-80"}>
                        {currentUser?.personId === recipe.userId && currentUser?.personId != null && (
                            <div className="w-100 hiding mb-4 p-3 d-flex justify-content-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleEditClick}
                                >
                                    Uredi Recept
                                </button>
                            </div>
                        )}
                        <Row className={"d-flex"}>
                            <Container className={"col-md-10 col-lg-4 col-xl-3"}>
                                <RecipePageImage recipe={recipe}/>
                                <ProfileIcon username={recipe.userName} />

                                {recipe.waitingApproval ? (
                                    <>
                                        <Button variant="success" className={"w-100 mt-4"} disabled={disableButtons} onClick={approve}>Prihvati</Button>
                                        <Button variant="danger" className={"w-100 mt-2"} disabled={disableButtons} onClick={reject}>Odbij</Button>
                                        <RecipeSimilarityWarning id={recipeId} />
                                    </>
                                ) : (<></>)}
                            </Container>

                            <Container className={"col-md-12 col-lg-7 col-xl-8"}>
                                <RecipeNameAndRating recipe={recipe}/>
                                <RecipePageTextBox header={"Opis:"} text={recipe.description}/>
                                <RecipePageIngredients recipeId={recipe.recipeId} />
                                <RecipePageTextBox header={"Postupak:"} text={recipe.procedure}/>

                                {/* Comments Section */}
                                <div className="mt-5">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="mb-0">Komentari</h4>
                                        {currentUser && currentUser.personId != recipe.userId && !showReviewForm && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setShowReviewForm(true)}
                                            >
                                                Dodaj Recenziju
                                            </button>
                                        )}
                                    </div>

                                    {showReviewForm && (
                                        <AddReviewForm
                                            recipeId={recipeId}
                                            onReviewAdded={handleReviewAdded}
                                            onCancel={() => setShowReviewForm(false)}
                                        />
                                    )}

                                    <div className="bg-white p-4 rounded shadow-sm">
                                        {recipe.ratings && recipe.ratings.length > 0 ? (
                                            recipe.ratings.map((rating, index) => (
                                                <RecipeComment
                                                    key={index}
                                                    rating={rating}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-muted text-center mb-0">
                                                Još nema komentara
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Container>
                        </Row>
                    </div>
                ) : (
                    <ErrorPage code={404} text={"Page not found :("} />
                )
            )}
        </div>
    );
};

export default RecipePage;