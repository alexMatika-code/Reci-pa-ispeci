import placeholder from "../assets/placeholder.png"

const RecipeCard = ({image, name, description}) => {
    return (
        <div className="recipe-card">
            {
                image != null  && (
                    <img src={image} alt={name} className="recipe-card-image"/>
                )
            }
            {
                image == null && (
                    <img src={placeholder} alt={name} className="recipe-card-image"/>
                )
            }
            <div className="recipe-card-overlay">
                {
                    name != null && (
                        <div className="recipe-name">{name}</div>
                    )
                }
                {
                    name == null && (
                        <div className="recipe-name">Naziv jela</div>
                    )
                }
                {
                    description != null && (
                        <div className="hover-text">{description}</div>
                    )
                }
                {
                    description == null && (
                        <div className="hover-text">Procedura pripeme recepta</div>
                    )
                }
            </div>
        </div>
    );
};


export default RecipeCard;
