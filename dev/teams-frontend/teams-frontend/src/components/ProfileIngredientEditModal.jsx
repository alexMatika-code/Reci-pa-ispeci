import {Button, Form, Modal} from "react-bootstrap";

const ProfileIngredientEditModal = ({ show, disable, handleEdit, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
                <Modal.Title><span className={"bold color-lsg"}>Izmjeni najdraže sastojke</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label><h5 className={"bold color-dsg"}>✏️ Odaberite sastojke</h5></Form.Label>

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={disable}>
                    Odustani
                </Button>
                <Button variant="primary" onClick={handleEdit} disabled={disable}>
                    Spremi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileIngredientEditModal;