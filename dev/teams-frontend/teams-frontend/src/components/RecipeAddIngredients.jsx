import {useState} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {BsBasket3Fill} from "react-icons/bs";
import IngredientsEntry from './IngredientsEntry';

const RecipeAddIngredients = ({ingredients, setIngredients}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ingredient, setIngredient] = useState('');

    const addIngredient = () => {
        if (ingredients.includes(ingredient)) {
            return;
        }

        if (ingredient.trim() !== "" || ingredient.trim().length === 0) {
            ingredients.push(ingredient);
            setIngredients(ingredients);
            setIngredient('');
        }
    }

    const onEnter = (e) => {
        if(e.key === 'Enter') {
            addIngredient();
        }
    }

    const removeIngredient = (e, text) => {
        setIngredients(ingredients.filter(ingredient => ingredient !== text));
    }

    return (
        <>
            <Button className="btn btn-success w-100 mb-3 d-flex justify-content-center align-items-center"
                    onClick={handleShow}>
                <BsBasket3Fill className={'mx-2 align-middle'}/>
                <div>Sastojci ({ingredients.length})</div>
            </Button>

            {/* Modal popup */}
            <Modal show={show}
                   onHide={handleClose}
                   size={"lg"}
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sastojci</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"d-flex mb-3"}>
                        <div className={"form-outline col-lg-9"}>
                            <Form.Control
                                   list="datalistOptions"
                                   id="ingredient"
                                   value={ingredient}
                                   onChange={(e) => setIngredient(e.target.value)}
                                   onKeyDown={(e) => onEnter(e)}
                                   placeholder="Pretraži sastojke..."/>
                            <datalist id="datalistOptions">
                                {/* ovo ce se dinamicki hvata s baze :) */}
                                <option value="Chocolate"></option>
                                <option value="Coconut"></option>
                                <option value="Mint"></option>
                                <option value="Strawberry"></option>
                                <option value="Vanilla"></option>
                            </datalist>
                        </div>
                        <div className={"col-lg-3 "}>
                            <Button className={"w-75 m-auto d-flex justify-content-center"}
                                    onClick={addIngredient}>
                                Dodaj
                            </Button>
                        </div>
                    </div>
                    <div>
                        {ingredients.map((ingredient, index) =>
                            <IngredientsEntry text={ingredient}
                                              key={index}
                                              index={index}
                                              clickFunction={removeIngredient}/>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zatvori
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Spremi promjene
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RecipeAddIngredients;
