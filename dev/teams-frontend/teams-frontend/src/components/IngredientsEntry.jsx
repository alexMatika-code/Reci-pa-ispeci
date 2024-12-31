import {Badge} from "react-bootstrap";
const IngredientsEntry = ({text, ingId, clickFunction}) => {
    return (
        <h4 className={"d-inline"}>
            <Badge bg="dark"
                   className={'bg-secondary py-2 px-3 m-1 ingredientEntry'}
                   onClick={(e) => clickFunction(e, ingId)}>
                {text}
            </Badge>
        </h4>
    );
};

export default IngredientsEntry;
