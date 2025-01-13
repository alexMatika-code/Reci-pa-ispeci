import {useState} from "react";
import {Button} from "react-bootstrap";
import {BsBasket3Fill} from "react-icons/bs";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import IngredientsModal from "./IngredientsModal.jsx";

const RecipeAddIngredients = ({ingredients, setIngredients}) => {
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setUpdate(!update);
    }

    return (
        <>
            <Button className="btn btn-success w-100 mb-3 d-flex justify-content-center align-items-center"
                    onClick={handleShow}>
                <BsBasket3Fill className={'mx-2 align-middle'}/>
                <div>Sastojci ({ingredients.length})</div>
            </Button>

            <IngredientsModal show={show}
                              handleClose={handleClose}
                              handleSave={() => {setShow(false);}}
                              update={update}
                              ingredients={ingredients}
                              setIngredients={setIngredients}/>
        </>
    );
};

export default RecipeAddIngredients;
