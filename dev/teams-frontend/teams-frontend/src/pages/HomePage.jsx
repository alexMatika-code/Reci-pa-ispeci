import {useState, useEffect} from "react";
import {BsChatDots, BsChatDotsFill} from "react-icons/bs";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import FilterRecipes from "../components/FilterRecipes.jsx";
import RecipeCards from "../components/RecipeCards.jsx";
import Spinner from "../components/Spinner.jsx";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [size] = useState(10);
    const [loading, setLoading] = useState(true);


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

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
           <Navbar/>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                filteredRecipes.length !== 0 ? (
                    <div>
                        <div className={"search-bar-container"}>
                            <div className={"rounded-circle filter-div"}>
                                <FilterRecipes ingredients={ingredients} setIngredients={setIngredients}/>
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
                        <RecipeCards filteredRecipes={filteredRecipes}></RecipeCards>
                    </div>
                ) : (
                    <div>Greška</div>
                )
            )}
        </div>
    );

};

export default HomePage;
