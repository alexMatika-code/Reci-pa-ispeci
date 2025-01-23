import IngredientCard from "./IngredientCard.jsx";
import Spinner from "../Utility/Spinner.jsx";
import {useEffect, useState} from "react";
import ErrorPage from "../../pages/ErrorPage.jsx";

const IngredientCards = () => {
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

    if(ingredients === undefined){
        return <ErrorPage code={500} text={"BE je jako spor :( - Molim vas, budite strpljivi s njime i osvježite stranicu..."} />
    }

return (
        <div className="responsive-width mx-auto">
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                ingredients.length > 0 ? (
                    ingredients.map((ingredient) => (
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
