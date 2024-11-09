import { useState } from "react";
import { Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import IngredientsEntry from "./IngredientsEntry.jsx";
import { BsFunnelFill } from "react-icons/bs";
import InputGroupText from "react-bootstrap/InputGroupText";

const FilterRecipes = ({ ingredients, setIngredients }) => {
    const [show, setShow] = useState(false);
    const [ingredient, setIngredient] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addIngredient = () => {
        if (ingredient.trim() && !ingredients.includes(ingredient)) {
            setIngredients([...ingredients, ingredient]);
            setIngredient(""); // Clear input
        }
    };

    const removeIngredient = (text) => {
        setIngredients(ingredients.filter((ing) => ing !== text));
    };

    const onEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addIngredient();
        }
    };

    return (
        <div>
            <BsFunnelFill className="filter-icon" onClick={handleShow} />
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Filtriraj</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex m-2 gap-2">
                        <div className="form-outline col-lg-8">
                            <Form.Control
                                list="datalistOptions"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="Filtriraj prema sastojcima..."
                            />
                            <datalist id="datalistOptions">
                                <option value="Chocolate" />
                                <option value="Coconut" />
                                <option value="Mint" />
                                <option value="Strawberry" />
                                <option value="Vanilla" />
                            </datalist>
                        </div>
                        <div className="col-lg-4">
                            <InputGroup>
                                <FormControl type="number" placeholder="Vrijeme pripreme" />
                                <InputGroupText>minuta</InputGroupText>
                            </InputGroup>
                        </div>
                    </div>
                    <div>
                        {ingredients.map((ing, index) => (
                            <IngredientsEntry
                                text={ing}
                                key={index}
                                clickFunction={() => removeIngredient(ing)}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zatvori
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Filtriraj
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FilterRecipes;
