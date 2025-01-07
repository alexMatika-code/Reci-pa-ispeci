import {Button, Form, Modal} from "react-bootstrap";
import IngredientsEntry from "./IngredientsEntry.jsx";
import {useEffect, useRef, useState} from "react";
import TomSelect from "tom-select/base";
import Spinner from "./Spinner.jsx";

const IngredientsModal = ({ingredients, setIngredients, update, show, disableButtons, handleClose, handleSave}) => {
    const selectRef = useRef(null);
    const [allIngredients, setAllIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`/api/ingredients`);
                const data = await response.json();
                setAllIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const addIngredient = (ingredient) => {
        const ing = JSON.parse(ingredient);

        setIngredients(prevIngredients => {
            const ingredientNames = prevIngredients.map(ing => ing.name.trim());

            if (ingredientNames.includes(ing.name.trim())) {
                return prevIngredients; // Prevent duplicate
            }

            return [...prevIngredients, ing];
        });
    };

    const removeIngredient = (e, ingId) => {
        setIngredients(ingredients.filter(ingredient => ingredient.ingredientId !== ingId));
    }

    useEffect(() => {
        if (selectRef.current) {
            new TomSelect("#select-ing",{
                create: false,
                sortField: {
                    field: "text",
                    direction: "asc"
                },
                onChange: (value) => addIngredient(value)
            });
        }
    }, [update]);

    return (
        <Modal show={show}
               onHide={handleClose}
               size={"lg"}
               centered>

            <Modal.Header closeButton>
                <Modal.Title><span className={"bold color-lsg"}>Izmjeni popis sastojaka</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <Spinner loading={loading}/>
                ) : (
                    <>
                        <Form.Label><h5 className={"bold color-dsg"}>✏️ Odaberite sastojke</h5></Form.Label>
                        <div className={"d-flex mb-3"}>
                            <div className={"form-outline col-12"}>
                                <select ref={selectRef} id="select-ing" placeholder="Pretraži sastojke..." autoComplete="off">
                                    <option value="">Pretraži sastojke...</option>
                                    {allIngredients.map((ing) => (
                                        <option key={ing.ingredientId} value={JSON.stringify(ing)}>{ing.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            {ingredients.map((ingredient, index) =>
                                <IngredientsEntry text={ingredient.name}
                                                  ingId={ingredient.ingredientId}
                                                  key={index}
                                                  index={index}
                                                  clickFunction={removeIngredient}/>
                            )}
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={disableButtons}>
                    Zatvori
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={disableButtons}>
                    Spremi promjene
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default IngredientsModal;