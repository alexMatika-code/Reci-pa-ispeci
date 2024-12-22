import {Card, CardBody} from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

const IngredientCard = ({name}) => {
    return (
        <Card className={"mb-3 bg-white shadow-sm b-radius-5"}>
            <CardBody>
                <h4 className={"m-0 px-2 bold color-dsg d-inline-block w-100 d-flex justify-content-between"}>
                    <span>{name}</span>
                    <span className={"d-flex align-items-center color-dsg"}>
                        <BsPencilSquare className={"mx-3 cursor-pointer clickable-icon"} />
                        <BsXLg className={"cursor-pointer clickable-icon"} />
                    </span>
                </h4>
            </CardBody>
        </Card>
    );
};

export default IngredientCard;
