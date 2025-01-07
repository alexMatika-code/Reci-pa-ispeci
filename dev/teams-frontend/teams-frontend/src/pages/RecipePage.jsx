import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner.jsx";
import {Container, Row} from "react-bootstrap";
import RecipePageImage from "../components/RecipePageImage.jsx";
import RecipePageTextBox from "../components/RecipePageTextBox.jsx";
import RecipeNameAndRating from "../components/RecipeNameAndRating.jsx";
import ProfileIcon from "../components/ProfileIcon.jsx";
import RecipeComment from "../components/RecipeComment.jsx";
import AddReviewForm from "../components/AddReviewForm.jsx";
import RecipeIngredients from "../components/RecipeIngredients.jsx";

const RecipePage = () => {
    const [loading, setLoading] = useState(true);
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        // Fetch current user
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('/api/auth/current');
                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

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

    return (
        <div>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                recipe ? (
                    <div className={"justify-content-center align-items-center p-5 pt-80 pl-80"}>
                        {currentUser?.id === recipe.userId && currentUser?.id != null && (
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
                                <ProfileIcon authorId={recipe.userId} />
                            </Container>

                            <Container className={"col-md-12 col-lg-7 col-xl-8"}>
                                <RecipeNameAndRating recipe={recipe}/>
                                <RecipePageTextBox header={"Opis:"} text={recipe.description}/>
                                <RecipeIngredients ingredients={recipe.ingredients} />
                                <RecipePageTextBox header={"Postupak:"} text={recipe.procedure}/>
                                
                                {/* Comments Section */}
                                <div className="mt-5">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="mb-0">Komentari</h4>
                                        {currentUser && currentUser.id !== recipe.userId && !showReviewForm && (
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
                    <div>ne postoji</div>
                )
            )}
        </div>
    );
};

export default RecipePage;