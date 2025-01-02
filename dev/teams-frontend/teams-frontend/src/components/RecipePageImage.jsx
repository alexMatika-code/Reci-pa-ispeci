
import placeholder from "../assets/placeholder.jpg";



const RecipePageImage = ({ recipe }) => {



    return (

            <div className={"m-3 mb-5 recipe-page-card b-radius-30 shadow-lg"}>
                <img
                    src={recipe.imageBase64 ? `data:image/jpeg;base64,${recipe.imageBase64}` : placeholder}
                    alt={recipe.title || "Naziv jela"}
                    className="recipe-page-card-image "
                />
                <div className="recipe-card-overlay">
                <span className={"recipe-name d-flex align-items-center"}>
                    <h4 className="mr-16 color-dsg">{recipe.title || "Naziv jela"}</h4>
                </span>

                </div>
            </div>


    )
        ;
};

export default RecipePageImage;
