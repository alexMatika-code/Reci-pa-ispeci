import placeholder from "../../assets/placeholder.jpg";

const RecipePageImage = ({ recipe }) => {
    return (
        <div className={"mb-3 bg-white p-1 text-center b-radius-30 shadow-sm"}>
            <img
                src={recipe.imageBase64 ? `data:image/jpeg;base64,${recipe.imageBase64}` : placeholder}
                alt={recipe.title || "Naziv jela"}
                className="w-100 b-radius-30"
            />
        </div>
    );
};

export default RecipePageImage;
