import {useState} from "react";
import {BsChatDots, BsChatDotsFill, BsFillXCircleFill} from "react-icons/bs";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Spagheti from "../assets/spaghetiCarbonara.jpeg";
import FilterRecipes from "../components/FilterRecipes.jsx";
import RecipeCards from "../components/RecipeCards.jsx";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [showChat, setShowChat] = useState(false);

    const [ingredients, setIngredients] = useState([]);

    const toggleChat = () => {
        setShowChat((prev) => !prev);
    };


    const user = {
        uid: "123",
    };

    const recipes = [
        {
            name: 'Spaghetti Carbonara',
            image: Spagheti,
            description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.'
        },
        {
            name: 'Chicken Alfredo',
            image: Spagheti,
            description: 'A creamy pasta dish with grilled chicken and a rich Alfredo sauce.'
        },
        {
            name: 'Borger',
            image: Spagheti,
            description: 'A creamy pasta dish with grilled chicken and a rich Alfredo sauce.'
        },
        {
            name: 'Manestra',
            image: Spagheti,
            description: 'A creamy pasta dish with grilled chicken and a rich Alfredo sauce.'
        },
        {
            name: 'Mlinci',
            image: Spagheti,
            description: 'A creamy pasta dish with grilled chicken and a rich Alfredo sauce.'
        },
        {
            name: 'Peka',
            image: Spagheti,
            description: 'A creamy pasta dish with grilled chicken and a rich Alfredo sauce.'
        },
        {
            name: 'Rostilj',
            image: Spagheti,
            description: 'A creamy pasta dish with grilled chicken and a rich Alfredo sauce.'
        },

    ];

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <Navbar/>
            <div className="search-bar-container">
                <div className={"rounded-circle filter-div"}>
                    <FilterRecipes ingredients={ingredients} setIngredients={setIngredients}></FilterRecipes>
                </div>
                <SearchBar query={query} setQuery={setQuery}/>
                <div className="chat-icon-container">
                    {showChat ? (
                        <BsChatDotsFill className="chat-icon" onClick={toggleChat}/>
                    ) : (
                        <BsChatDots className="chat-icon" onClick={toggleChat}/>
                    )}
                </div>
            </div>
            <RecipeCards filteredRecipes={filteredRecipes}></RecipeCards>
        </div>
    );
};

export default HomePage;
