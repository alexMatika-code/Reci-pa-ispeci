import placeholder from '../assets/placeholder.png'

const RecipeCard = () => {
    return (
        <div className={'card recipeCard border-0 rounded-0 m-5 p-1 '} style={{maxWidth: '18rem'}}>
            <img src={placeholder} className={'card-img'}/>
            <div className={'card-img-overlay p-0'}>
                <div className={'card-text position-absolute bottom-0 py-2 px-4 bg-white text-align-left'}>placeholder</div>
            </div>
        </div>
    );
};

export default RecipeCard;
