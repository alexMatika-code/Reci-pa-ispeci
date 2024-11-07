import {useState} from "react";
import {BsChatDots} from "react-icons/bs";
import {ChatBox} from "react-chatbox-component";
import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {BsFillXCircleFill} from "react-icons/bs";
import {BsChatDotsFill} from "react-icons/bs";
import RecipeCard from "../components/RecipeCard.jsx";
import Spagheti from "../assets/spaghetiCarbonara.jpeg";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(prev => !prev);
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
    ];

    return (
        <div>
            <Navbar/>
            <div className="search-bar-container">
                <SearchBar query={query} setQuery={setQuery}/>
                <div className="chat-icon-container">
                    {
                        showChat && (
                            <BsChatDotsFill className="chat-icon" onClick={toggleChat}/>
                        )
                    }
                    {
                        !showChat && (
                            <BsChatDots className="chat-icon" onClick={toggleChat}/>
                        )
                    }
                </div>
            </div>
            <div className="recipe-list">
                {recipes.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        image={recipe.image}
                        name={recipe.name}
                        description={recipe.description}
                    />
                    ))}
            </div>

            {showChat && (
                <div className="chat-box-container">
                    <div className="chat-box-header">
                        <button className="close-button" onClick={toggleChat}><BsFillXCircleFill/>
                        </button>
                    </div>
                    <ChatBox typingIndicator={true} user={user}/>
                </div>
            )}
        </div>
    );
};

export default HomePage;
