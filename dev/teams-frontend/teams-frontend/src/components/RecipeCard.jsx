import placeholder from "../assets/placeholder.jpg";

const RecipeCard = ({ image, name, timeToCook, description, onClick}) => {
    return (
        <div onClick={onClick} className="col-xl-3 col-lg-4 col-md-6 col-12">
            <div className="recipe-card">
                <img
                    src={image ? image : placeholder}
                    alt={name || "Naziv jela"}
                    className="recipe-card-image"
                />
                <div className="recipe-card-overlay">
                    <div className="recipe-name">
                        <div className="mr-16">{name || "Naziv jela"}</div>
                        <div className="font-0-8rem">{timeToCook}min</div>
                    </div>
                    <div className="hover-text">{description || "Procedura pripeme recepta"}</div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
