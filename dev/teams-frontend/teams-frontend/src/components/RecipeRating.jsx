import StarRating from "./StarRating.jsx";
import { BsClipboard2PulseFill } from "react-icons/bs";
import React, {useEffect} from "react";
import {Row} from "react-bootstrap";

const RecipeRating = ({ recipe }) => {
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
        <div className={"bg-white b-radius-30 shadow-sm ptb-10-20 text-center"}>
            <div>
                <Row className={'w-90 m-auto'}>
                    <div className={"col-md-10 col-lg-12 color-dsg column-gap"}>

                        <span className={"bold"}>{averageRating.toFixed(1) || '0'}</span>

                        <StarRating rating={averageRating}/>
                    </div>
                </Row>
            </div>
        </div>
    )
        ;
};

export default RecipeRating;