import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import IngredientCards from "../components/IngredientCards.jsx";
import {useState} from "react";

const IngredientsPage = () => {
    const [query, setQuery] = useState("");

    return (
        <div>
            <Navbar/>
            <div className={"search-bar-container"}>
                <SearchBar query={query} setQuery={setQuery}/>
            </div>

            <IngredientCards />
        </div>
    );
};

export default IngredientsPage;