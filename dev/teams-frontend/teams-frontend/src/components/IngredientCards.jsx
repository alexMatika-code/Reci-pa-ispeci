import IngredientCard from "./IngredientCard.jsx";
import Spinner from "../components/Spinner.jsx";
import {useEffect, useState} from "react";

const IngredientCards = ({ search, limit }) => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`/api/ingredients`);
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);

return (
        <div className="responsive-width mx-auto">
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                ingredients.length > 0 ? (
                    ingredients
                    // .filter((ingredient) => (
                    //     ingredient.name.toLowerCase().includes(search.toLowerCase())
                    // ))
                    // .slice(0, limit)
                    .map((ingredient) => (
                        <IngredientCard ingredientName={ingredient.name} id={ingredient.ingredientId} key={ingredient.ingredientId}/>
                    ))
                ) : (
                    <div className={"text-center color-dsg"}>Nema tih sastojaka</div>
                )
            )}
        </div>
    );
};

export default IngredientCards;
