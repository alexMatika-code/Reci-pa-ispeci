import {Button, Form, Modal} from "react-bootstrap";

const IngredientCardEditModal = ({name, setName, show, disable, handleEdit, handleClose}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><span className={"bold color-lsg"}>Izmjeni sastojak</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><h5 className={"bold color-dsg"}>✏️ Naziv sastojka</h5></Form.Label>
                            <Form.Control
                                required
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
                    <Button variant="secondary" onClick={handleClose} disabled={disable}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleEdit} disabled={disable}>
                        Spremi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default IngredientCardEditModal;