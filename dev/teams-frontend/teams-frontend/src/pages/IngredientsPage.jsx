import Navbar from "../components/Navbar.jsx";
import IngredientCards from "../components/IngredientCards.jsx";
import {Button, Form, Row} from "react-bootstrap";
import {useState} from "react";

const IngredientsPage = () => {
    const [seed, setSeed] = useState(1);
    const [ingredientName, setIngredientName] = useState("");

    const reset = () => {
        setSeed(Math.random());
    }

    const addIngredient = async (name) => {
        try {
            await fetch(`/api/ingredients`, {
                method: "POST",
                body: JSON.stringify({name}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.error("Error adding ingredient:", error);
        } finally {
            setIngredientName("");
            reset();
        }
    }

    return (
        <div>
            <Navbar/>
            <div className={"responsive-width mx-auto mt-100"}>
                <h5 className={"my-3 color-dsg"}>Popis sastojaka</h5>
                <div>
                    <Row className={"d-flex mb-5"}>
                        <div className={"col-xl-10 col-lg-9 col-8"}>
                            <Form.Control className={"bg-white shadow-sm b-radius-5 px-4 py-3"}
                                          size="lg"
                                          type="text"
                                          placeholder="Unesi naziv sastojka..."
                                          value={ingredientName}
                                          onChange={(e) => setIngredientName(e.target.value)}/>
                        </div>
                        <div className={"col-xl-2 col-lg-3 col-4 px-2"}>
                            <Button className={"w-100 h-100 shadow-sm"} onClick={() => addIngredient(ingredientName)}>
                                <h5 className={"bold m-0"}>Dodaj</h5>
                            </Button>
                        </div>
                    </Row>
                </div>
            </div>
            <IngredientCards search={ingredientName} limit={6} key={seed}/>
        </div>
    );
};

export default IngredientsPage;