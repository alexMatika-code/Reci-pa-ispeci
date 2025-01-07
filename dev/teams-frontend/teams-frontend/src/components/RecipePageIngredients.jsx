import RecipePageTextBox from "./RecipePageTextBox.jsx";


const RecipePageIngredients = ({ ingredients }) => {
    const ingredientsList = ingredients && ingredients.length > 0 
        ? ingredients.map((ingredient) => (
            `• ${ingredient.name}`
        )).join('\n')
        : 'Nema navedenih sastojaka';

    return (
        <div className="mb-4">
                <RecipePageTextBox header={"Sastojci:"} text={ingredientsList}/>

        </div>
    );
};

export default RecipePageIngredients;