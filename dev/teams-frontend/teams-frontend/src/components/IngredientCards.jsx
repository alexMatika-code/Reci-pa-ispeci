import IngredientCard from "./IngredientCard.jsx";

const IngredientCards = () => {
    return (
        <div className="w-50 mx-auto">
            <IngredientCard name={"Mrkva"}/>
            <IngredientCard name={"Mlijeko"}/>
            <IngredientCard name={"Pistacija"}/>
        </div>
    );
};

export default IngredientCards;
