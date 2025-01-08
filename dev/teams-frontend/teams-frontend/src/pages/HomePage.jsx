import {useState, useEffect} from "react";
import {BsChatDots, BsChatDotsFill} from "react-icons/bs";
import SearchBar from "../components/SearchBar.jsx";
import FilterRecipes from "../components/FilterRecipes.jsx";
import RecipeCards from "../components/RecipeCards.jsx";
import Spinner from "../components/Spinner.jsx";
import HomePageTab from "../components/HomePageTab.jsx";
// import axios from "axios";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [changeTab, setChangeTab] = useState(false);

    const [recipes, setRecipes] = useState([]);
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);

    const [size] = useState(10);
    const [loading, setLoading] = useState(true);
    const [loadingRecommended, setLoadingRecommended] = useState(true);

    const [ingredients, setIngredients] = useState([]);
    const [timeToCook, setTimeToCook] = useState("");


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
    }, [size]);

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
    }, [size]);



    return (
        <div>
            <div className={"search-bar-container"}>
                {/*<div className={"rounded-circle filter-div"}>*/}
                {/*    <FilterRecipes ingredients={ingredients}*/}
                {/*                   setIngredients={setIngredients}*/}
                {/*                   timeToCook={timeToCook}*/}
                {/*                   setTimeToCook={setTimeToCook}/>*/}
                {/*</div>*/}
                <SearchBar query={query} setQuery={setQuery}/>
            </div>

            <HomePageTab setShowRecommended={setChangeTab} showRecommended={changeTab} />

            {loading && loadingRecommended ? (
                <Spinner loading={loading}/>
            ) : (
                <div className={"max-w-92-5 mx-auto home-recipes-container"}>

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
