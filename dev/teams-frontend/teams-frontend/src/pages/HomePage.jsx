import {useState, useEffect} from "react";
import {BsChatDots, BsChatDotsFill} from "react-icons/bs";
import SearchBar from "../components/SearchBar.jsx";
import FilterRecipes from "../components/FilterRecipes.jsx";
import RecipeCards from "../components/RecipeCards.jsx";
import Spinner from "../components/Spinner.jsx";
// import axios from "axios";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [size] = useState(10);
    const [loading, setLoading] = useState(true);
    const [timeToCook, setTimeToCook] = useState("");

    const toggleChat = () => {
        setShowChat((prev) => !prev);
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
    }, [size]);

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesQuery = query
            ? recipe.title.toLowerCase().includes(query.toLowerCase())
            || recipe.description.toLowerCase().includes(query.toLowerCase())
            : true;
        // const matchesTime = timeToCook ? recipe.timeToCook <= parseInt(timeToCook, 10) : true;
        return matchesQuery;
    });

    return (
        <div>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                <div>
                    <div className={"search-bar-container"}>
                        <div className={"rounded-circle filter-div"}>
                            <FilterRecipes ingredients={ingredients}
                                           setIngredients={setIngredients}
                                           timeToCook={timeToCook}
                                           setTimeToCook={setTimeToCook}/>
                        </div>
                        <SearchBar query={query} setQuery={setQuery}/>
                        <div className={"chat-icon-container"}>
                            {showChat ? (
                                <BsChatDotsFill className={"chat-icon"} onClick={toggleChat}/>
                            ) : (
                                <BsChatDots className={"chat-icon"} onClick={toggleChat}/>
                            )}
                        </div>
                    </div>

                    <div className={"max-w-92-5 mx-auto home-recipes-container"}>
                        {filteredRecipes.length > 0 ? (
                            <RecipeCards filteredRecipes={filteredRecipes}/>
                        ) : (
                            <div className={"align-content-center no-recipes-message"}>Nema recepata za prikaz</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
