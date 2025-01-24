import {useState, useEffect} from "react";
import SearchBar from "../components/HomePage/SearchBar.jsx";
import RecipeCards from "../components/Utility/RecipeCards/RecipeCards.jsx";
import Spinner from "../components/Utility/Spinner.jsx";
import HomePageTab from "../components/HomePage/HomePageTab.jsx";
import IngredientsModal from "../components/Utility/IngredientsModal/IngredientsModal.jsx";
import ErrorPage from "./ErrorPage.jsx";

const HomePage = () => {
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);

    const [changeTab, setChangeTab] = useState(false);

    const [recipes, setRecipes] = useState([]);
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingRecommended, setLoadingRecommended] = useState(true);

    const [query, setQuery] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [timeToCook, setTimeToCook] = useState("");

    const handleShow = () => {
        setShow(true);
        setUpdate(!update);
    }

    const search = async () => {
        const base = 'api/recipes/public';
        const data = {
            query: query,
            timeToCook: timeToCook,
            ingredients: ingredients
        };

        const url = buildRequestUrl(base, data);
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setRecipes(data.content);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    }

    const buildRequestUrl = (baseUrl, data) => {
        let url = `${baseUrl}?searchText=${encodeURIComponent(data.query)}&maxTimeToCook=${data.timeToCook}&page=0&size=10`;

        // Add each ingredientId as a query parameter
        data.ingredients.forEach(ingredient => {
            url += `&ingredientIds=${ingredient.ingredientId}`;
        });

        return url;
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`/api/recipes/public?page=0&size=12`);
                const data = await response.json();
                setRecipes(data.content);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    useEffect(() => {
        const fetchRecommendedRecipes = async () => {
            try {
                const response = await fetch(`/api/recipes/recommended`);
                const data = await response.json();
                setRecommendedRecipes(data.content);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoadingRecommended(false);
            }
        };
        fetchRecommendedRecipes();
    }, []);

    if(recipes === undefined || recommendedRecipes === undefined){
        return <ErrorPage code={500} text={"BE je jako spor :( - Molim vas, budite strpljivi s njime i osvježite stranicu..."} />
    }

    return (
        <div>
            <SearchBar showModal={handleShow} query={query} setQuery={setQuery} timeToCook={timeToCook} setTimeToCook={setTimeToCook} search={search}/>
            <HomePageTab setShowRecommended={setChangeTab} showRecommended={changeTab} />
            <IngredientsModal ingredients={ingredients}
                              setIngredients={setIngredients}
                              show={show}
                              disableButtons={false}
                              update={update}
                              handleSave={() => setShow(false)}
                              handleClose={() => setShow(false)} />

            {loading || loadingRecommended ? (
                <Spinner loading={loading}/>
            ) : (
                <div className={"max-w-80 mx-auto"}>

                    {changeTab ? (
                        <>
                            {recommendedRecipes.length > 0 ? (
                                <RecipeCards filteredRecipes={recommendedRecipes}/>
                            ) : (
                                <div className={"align-content-center no-recipes-message"}>Nema recepata za prikaz</div>
                            )}
                        </>
                    ):(
                        <>
                            {recipes.length > 0 ? (
                                <RecipeCards filteredRecipes={recipes}/>
                            ) : (
                                <div className={"align-content-center no-recipes-message"}>Nema recepata za prikaz</div>
                            )}
                        </>
                    )}

                </div>
            )}
        </div>
    );
};

export default HomePage;
