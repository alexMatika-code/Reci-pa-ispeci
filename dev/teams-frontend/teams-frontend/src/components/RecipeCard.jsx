import placeholder from "../assets/placeholder.jpg";

const RecipeCard = ({ image, name, timeToCook, description, onClick}) => {
    return (
        <div onClick={onClick} className="col-xl-3 col-lg-4 col-md-6 col-12">
            <div className={"m-3 mb-5 recipe-card shadow-sm"}>
                <img
                    src={image ? image : placeholder}
                    alt={name || "Naziv jela"}
                    className="recipe-card-image"
                />
                <div className="recipe-card-overlay">
                <span className={"recipe-name d-flex align-items-center"}>
                    <div className="mr-16 color-dsg">{name || "Naziv jela"}</div>
                    <div className="font-0-8rem color-lsg">{timeToCook}min</div>
                </span>

                    <div className="hover-text">{description || "Procedura pripeme recepta"}</div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
