import StarRating from "./StarRating.jsx";
import React, {useEffect} from "react";
import {Row} from "react-bootstrap";

const RecipeNameAndRating = ({ recipe }) => {
    const [averageRating, setAverageRating] = React.useState(0);
    /*const [sumGrades, setSumGrades] = React.useState(0);*/

    useEffect(() => {
        if (recipe?.ratings && recipe.ratings.length > 0) {
            const total = recipe.ratings.reduce((sum, rat) => sum + rat.grade, 0);
           const average = total / recipe.ratings.length;

            // Update state
            /*setSumGrades(total);*/
            setAverageRating(average);
        }
    }, [recipe]);
    return (
        <div className={"bg-coral b-radius-10 shadow-sm ptb-10-20 text-center shadow-sm object-fit-contain"}>
            <h2 className={"bold text-white"}> {recipe.title ? recipe.title : 'Name'} </h2>
            <div>
                <Row className={'w-90 m-auto'}>
                    <div className={"col-md-10 col-lg-12 text-white d-flex align-items-center justify-content-center object-fit-contain"}>

                        <span className={"bold mr-5"}>{averageRating.toFixed(1) || '0'}</span>

                        <StarRating rating={averageRating}/>
                    </div>
                </Row>
            </div>
        </div>
    )
        ;
};

export default RecipeNameAndRating;