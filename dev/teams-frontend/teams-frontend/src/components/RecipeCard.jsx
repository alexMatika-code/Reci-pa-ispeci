import placeholder from "../assets/placeholder.jpg";

const RecipeCard = ({ image, name, description, onClick}) => {
    return (
        <div onClick={onClick} className="recipe-card">
            <img
                src={image ? image : placeholder}
                alt={name || "Naziv jela"}
                className="recipe-card-image"
            />
            <div className="recipe-card-overlay">
                <div className="recipe-name">{name || "Naziv jela"}</div>
                <div className="hover-text">{description || "Procedura pripeme recepta"}</div>
            </div>
        </div>
    );
};

export default RecipeCard;
