import {Card, CardBody} from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

const IngredientCard = ({name}) => {
    return (
        <Card className={"mb-3 bg-white shadow-sm b-radius-5 cursor-pointer "}>
            <CardBody className={"px-3 py-2 ingredient-card"}>
                <h5 className={"m-0 bold color-dsg d-inline-block w-100 d-flex align-items-center"}>
                    {name}
                    <BsPencilSquare className={"color-dsg mx-2 edit-icon"} />
                    <BsXLg className={"color-dsg edit-icon"} />
                </h5>
            </CardBody>
        </Card>
    );
};

export default IngredientCard;
