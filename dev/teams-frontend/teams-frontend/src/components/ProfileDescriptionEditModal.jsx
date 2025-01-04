import {Button, Form, Modal} from "react-bootstrap";

const ProfileDescriptionEditModal = ({description, setDescription, show, disable, handleSave, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={disable}>
                    Odustani
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={disable}>
                    Spremi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileDescriptionEditModal;