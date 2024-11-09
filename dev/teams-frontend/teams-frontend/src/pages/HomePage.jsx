import {useState} from "react";
import {BsChatDots} from "react-icons/bs";
import {ChatBox} from "react-chatbox-component";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {BsFillXCircleFill} from "react-icons/bs";
import {BsChatDotsFill} from "react-icons/bs";
import Spagheti from "../assets/spaghetiCarbonara.jpeg";
import {useNavigate} from "react-router-dom";
import {BsFunnelFill} from "react-icons/bs";
import FilterRecipes from "../components/FilterRecipes.jsx";
import RecipeCards from "../components/RecipeCards.jsx";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();

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
            {showChat && (
                <div className="chat-box-container">
                    <div className="chat-box-header">
                        <button className="close-button" onClick={toggleChat}>
                            <BsFillXCircleFill/>
                        </button>
                    </div>
                    <ChatBox typingIndicator={true} user={user}/>
                </div>
            )}
        </div>
    );
};

export default HomePage;
