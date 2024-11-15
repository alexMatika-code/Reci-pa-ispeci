import { Row } from "react-bootstrap";
import placeholder from "../assets/placeholder.jpg";
import StarRating from "./StarRating.jsx";
import { BsClipboard2PulseFill } from "react-icons/bs";
import React, { useEffect } from "react";

const RecipePageCard = ({ recipe }) => {
    const [averageRating, setAverageRating] = React.useState(0);
    const [sumGrades, setSumGrades] = React.useState(0);

    useEffect(() => {
        if (recipe?.ratings && recipe.ratings.length > 0) {
            const total = recipe.ratings.reduce((sum, rat) => sum + rat.grade, 0);
            const average = total / recipe.ratings.length;

            // Update state
            setSumGrades(total);
            setAverageRating(average);
        }
    }, [recipe]);

    return (
        <div className={"text-center bg-white profile-card mb-4 shadow-sm"}>
            <img
                src={`data:image/png;base64,${recipe.imageBase64}`}
                alt="img"
                id={'recipeImg'}
                className={'border border-4 rounded-circle max-w-85 min-w-85 mt-3 shadow-sm'}
            />
            <h2 className={"mb-2 mt-4 color-dsg bold"}>{recipe.title}</h2>

            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="text-center">
                    <h4 className="bold">{recipe.ratings?.length || 0}</h4>
                    <span className="font-1-2rem">
                        <BsClipboard2PulseFill /> Recenzija
                    </span>
                </div>
            </div>

            <Row className={'w-75 m-auto mt-5'}>
                <div className={"mb-5 col-md-6 col-lg-12 color-dsg"}>
                    <div className={'mb-2 font-1-4rem'}>
                        <StarRating rating={averageRating} />
                    </div>
                    <div>
                        Prosječna ocjena: <span className={"bold"}>{averageRating.toFixed(1) || '0'}</span> od <span
                        className={"bold"}>5</span>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default RecipePageCard;
