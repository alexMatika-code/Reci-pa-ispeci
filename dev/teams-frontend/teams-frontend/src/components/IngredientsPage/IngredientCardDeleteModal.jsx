import {Button, Modal} from "react-bootstrap";

const IngredientCardDeleteModal = ({show, disable, handleDelete, handleClose}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><span className={"bold color-lsg"}>Izbriši sastojak</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className={"bold color-dsg"}>🛑 Jeste li sigurni?</h5>
                    <p className={"color-dsg"}>Brisanjem sastojaka postoji mogućnost utjecaja na velik broj recepata. 🧾</p>
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

export default IngredientCardDeleteModal;