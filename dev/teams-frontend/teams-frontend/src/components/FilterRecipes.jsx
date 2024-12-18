import {useEffect, useState} from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import IngredientsEntry from "./IngredientsEntry.jsx";
import { BsFunnelFill } from "react-icons/bs";
import InputGroupText from "react-bootstrap/InputGroupText";

const FilterRecipes = ({ ingredients, setIngredients,timeToCook, setTimeToCook }) => {
    const [show, setShow] = useState(false);
    const [ingredient, setIngredient] = useState("");
    const [ingredientsFromDb, setIngredientsFromDb] = useState([]);
    const [tempTimeToCook, setTempTimeToCook] = useState(timeToCook);

    const handleClose = () => setShow(false);
    const filter = () => {
        setTimeToCook(tempTimeToCook);
        setShow(false);
    }

    const removeFilter = () =>  {
        setTempTimeToCook("");
        setTimeToCook("");
        handleClose();
    }
    const handleShow = () => setShow(true);

    const addIngredient = () => {
        if (ingredient.trim() && !ingredients.some((ing) => ing.name === ingredient)) {
            setIngredients([...ingredients, { name: ingredient }]);
            setIngredient("");
        }
    };

    useEffect(() => {

        const fetchIngredients = async() => {
        try{
            const response = await fetch(`/api/ingredients`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setIngredientsFromDb(data);
        }catch (error){
            console.error("Error fetching ingredients:", error);
        }
    }
    fetchIngredients();
    }, []);

    const removeIngredient = (text) => {
        setIngredients(ingredients.filter((ing) => ing.name !== text));
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
                                {ingredientsFromDb.map((ing) => (
                                    <option key={ing.ingredientId}
                                            value={ing.name}>
                                        {ing.name}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <div className="col-lg-4">
                            <InputGroup>
                                <Form.Control type="number"
                                              placeholder="Vrijeme pripreme"
                                              value={tempTimeToCook}
                                              onChange={(e) => setTempTimeToCook(e.target.value)}/>
                                <InputGroupText>minuta</InputGroupText>
                            </InputGroup>
                        </div>
                    </div>
                    <div>
                        {ingredients.map((ing, index) => (
                            <IngredientsEntry
                                text={ing.name}
                                key={index}
                                clickFunction={() => removeIngredient(ing.name)}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={removeFilter}>
                        Poništi
                    </Button>
                    <Button variant="primary" onClick={filter}>
                        Filtriraj
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FilterRecipes;
