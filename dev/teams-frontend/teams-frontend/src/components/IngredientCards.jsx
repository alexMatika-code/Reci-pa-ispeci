import IngredientCard from "./IngredientCard.jsx";
const IngredientCards = () => {
    return (
        <div className="responsive-width mx-auto">
            <div>
                <IngredientCard name={"Mrkva"}/>
                <IngredientCard name={"Mlijeko"}/>
                <IngredientCard name={"Pistacija"}/>
            </div>
        </div>
    );
};

export default IngredientCards;
