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

    // const selectRef = useRef(null);

    // const addIngredient = (ingredient) => {
    //     const ing = JSON.parse(ingredient);
    //
    //     const ingredientNames = ingredients.map(ing => ing.name.trim());
    //     if (ingredientNames.includes(ing.name.trim())) {
    //         return;
    //     }
    //
    //     setIngredients(prevIngredients => [...prevIngredients, ing]);
    // }

    // const removeIngredient = (e, ingId) => {
    //     setIngredients(ingredients.filter(ingredient => ingredient.ingredientId !== ingId));
    // }

    // useEffect(() => {
    //     if (selectRef.current) {
    //         new TomSelect("#select-ing",{
    //             create: false,
    //             sortField: {
    //                 field: "text",
    //                 direction: "asc"
    //             },
    //             onChange: (value) => addIngredient(value)
    //         });
    //     }
    // }, [update]);

    return (
        <>
            <Button className="btn btn-success w-100 mb-3 d-flex justify-content-center align-items-center"
                    onClick={handleShow}>
                <BsBasket3Fill className={'mx-2 align-middle'}/>
                <div>Sastojci ({ingredients.length})</div>
            </Button>

            {/*<IngredientsModal show={show}*/}
            {/*                  handleClose={handleClose}*/}
            {/*                  handleSave={() => {setShow(false);}}*/}
            {/*                  update={update}*/}
            {/*                  ingredients={ingredients}*/}
            {/*                  setIngredients={setIngredients}/>*/}



                {/* Modal popup */}
                {/*<Modal show={show}*/}
                {/*       onHide={handleClose}*/}
                {/*       size={"lg"}*/}
                {/*       centered>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Sastojci</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        <div className={"d-flex mb-3"}>*/}
                {/*            <div className={"form-outline col-12"}>*/}
                {/*                <select ref={selectRef} id="select-ing" placeholder="Pretraži sastojke..." autoComplete="off">*/}
                {/*                    <option value="">Pretraži sastojke...</option>*/}
                {/*                    {allIngredients.map((ing) => (*/}
                {/*                        <option key={ing.ingredientId} value={JSON.stringify(ing)}>{ing.name}</option>*/}
                {/*                    ))}*/}
                {/*                </select>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            {ingredients.map((ingredient, index) =>*/}
                {/*                <IngredientsEntry text={ingredient.name}*/}
                {/*                                  ingId={ingredient.ingredientId}*/}
                {/*                                  key={index}*/}
                {/*                                  index={index}*/}
                {/*                                  clickFunction={removeIngredient}/>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    </Modal.Body>*/}
                {/*    <Modal.Footer>*/}
                {/*        <Button variant="secondary" onClick={handleClose}>*/}
                {/*            Zatvori*/}
                {/*        </Button>*/}
                {/*        <Button variant="primary" onClick={handleClose}>*/}
                {/*            Spremi promjene*/}
                {/*        </Button>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
        </>
    );
};

export default RecipeAddIngredients;
