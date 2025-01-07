import {Button, Modal} from "react-bootstrap";

const UserControlModal = ({action, username, disable, show, handleClose, handleSave}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{action} @{username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sigurno želite ovo napraviti?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={disable}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={disable}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserControlModal;
