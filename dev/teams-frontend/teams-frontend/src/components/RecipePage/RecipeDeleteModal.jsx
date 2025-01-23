import {Button, Modal} from "react-bootstrap";

const RecipeDeleteModal = ({show, disable, handleDelete, handleClose}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><span className={"bold color-lsg"}>Izbriši recept</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className={"bold color-dsg"}>🛑 Jeste li sigurni?</h5>
                    <p className={"color-dsg"}>Ako obrišete recept nećete ga moći vratiti!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete} disabled={disable}>
                        Izbriši
                    </Button>
                    <Button variant="secondary" onClick={handleClose} disabled={disable}>
                        Odustani
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RecipeDeleteModal;