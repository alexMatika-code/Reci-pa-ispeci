import {Button, Form, Modal} from "react-bootstrap";

const ProfileDescriptionEditModal = ({desc, show, disable, handleEdit, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
                <Modal.Title><span className={"bold color-lsg"}>Izmjeni opis profila</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label><h5 className={"bold color-dsg"}>✏️ Informacije o tebi</h5></Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Opišite se! Što volite, što malo manje.. Sve nas zanima!"
                            as="textarea"
                            rows={3}
                            value={desc}
                            // onChange={(e) => setName(e.target.value)}
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
    );
};

export default ProfileDescriptionEditModal;