import {Button, Form, Modal} from "react-bootstrap";

const IngredientCardEditModal = ({name, setName, show, handleEdit, handleClose}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><span className={"bold color-lsg"}>Izmjeni sastojak</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><h5 className={"bold color-dsg"}>✏️ Naziv sastojka</h5></Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Unesite novo sastojka..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Spremi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default IngredientCardEditModal;