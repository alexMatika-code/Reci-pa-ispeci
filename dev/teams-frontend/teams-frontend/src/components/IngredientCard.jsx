import {Card, CardBody} from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import IngredientCardDeleteModal from "./IngredientCardDeleteModal.jsx";
import {useRef, useState} from "react";
import IngredientCardEditModal from "./IngredientCardEditModal.jsx";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IngredientCard = ({ingredientName, id}) => {
    const [name, setName] = useState(ingredientName);
    const [nameEdit, setNameEdit] = useState(name);

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [disableButtons, setDisableButtons] = useState(false);

    const card = useRef()

    const handleShowDelete = () => setShowDelete(true);
    const handleShowEdit = () => setShowEdit(true);

    const deleteIngredient = async (id) => {
        try {
            setDisableButtons(true);
            const response = await fetch(`/api/ingredients/` + id, {method: 'DELETE'});
            if(response.ok) {
                toast.success("Sastojak izbrisan!");
                card.current.remove();
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error deleting ingredient:", error);
        } finally {
            setShowDelete(false);
            setDisableButtons(false);
        }
    };

    const editIngredient = async (id) => {
        try {
            setDisableButtons(true);
            const response = await fetch(`/api/ingredients/` + id, {
                method: "PUT",
                body: `{"name" : "${nameEdit}"}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Sastojak izmijenjen!");
                setName(nameEdit);
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
            console.log(`ID: ${id}, old: ${name}, new: ${nameEdit}`);
        } catch (error) {
            console.error("Error editing ingredient:", error);
        } finally {
            setShowEdit(false);
            setDisableButtons(false);
        }
    };

    return (
        <div ref={card}>
            <Card className={"mb-3 bg-white shadow-sm b-radius-5"}>
                <CardBody>
                    <h4 className={"m-0 px-2 bold color-dsg d-inline-block w-100 d-flex justify-content-between"}>
                        <span>{name}</span>
                        <span className={"d-flex align-items-center color-dsg"}>
                        <BsPencilSquare className={"mx-3 cursor-pointer clickable-icon"} onClick={handleShowEdit}/>
                        <BsXLg className={"cursor-pointer clickable-icon"} onClick={handleShowDelete} />
                    </span>
                    </h4>
                </CardBody>
            </Card>

            <IngredientCardDeleteModal show={showDelete}
                                       disable={disableButtons}
                                       handleDelete={() => deleteIngredient(id)}
                                       handleClose={() => setShowDelete(false)}
            />

            <IngredientCardEditModal name={nameEdit}
                                     setName={setNameEdit}
                                     show={showEdit}
                                     disable={disableButtons}
                                     handleEdit={() => editIngredient(id)}
                                     handleClose={() => setShowEdit(false)}
            />
        </div>
    );
};

export default IngredientCard;
