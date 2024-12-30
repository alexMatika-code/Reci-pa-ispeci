import {Badge, Card, Row} from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import {useContext, useState} from "react";
import {AuthContext} from "../Contexts.jsx";
import ProfileDescriptionEditModal from "./ProfileDescriptionEditModal.jsx";
import ProfileIngredientEditModal from "./ProfileIngredientEditModal.jsx";

const ProfileInfoCards = ({user}) => {
    const currentUser = useContext(AuthContext);

    const [showDescEdit, setShowDescEdit] = useState(false);

    const [showIngEdit, setShowIngEdit] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);

    const handleShowDescEdit = () => setShowDescEdit(true);
    const handleShowIngEdit = () => setShowIngEdit(true);

    const editDesc = () => {

    }

    const editIng = () => {

    }

    return (
        <Row>
            <div className="col-xl-8 col-lg-12 mb-4">
                <Card className={"shadow-sm"}>
                    <Card.Body>
                        <Card.Title className="pb-2 font-weight-600 d-flex justify-content-between">
                            <span>📖 Informacije o @{user.username}...</span>
                            { user.personId === currentUser.personId ? (
                                <div>
                                    <BsPencilSquare className={"ml-5 font-1-4rem clickable-icon"}
                                                    onClick={handleShowDescEdit}/>
                                    <ProfileDescriptionEditModal desc={user.about}
                                                                 show={showDescEdit}
                                                                 disableButtons={disableButtons}
                                                                 handleEdit={() => editDesc()}
                                                                 handleClose={() => setShowDescEdit(false)} />
                                </div>
                            ) : (<></>)}
                        </Card.Title>
                        <Card.Text className="card-text">{user.about || ("Trenutno ne znamo ništa o @" + user.username + "...")}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-xl-4 col-lg-12 mb-4">
                <Card className={"shadow-sm"}>
                    <Card.Body>
                        <Card.Title className="pb-2 font-weight-600 d-flex justify-content-between">
                            <span>💖 Najdraži sastojci...</span>
                            { user.personId === currentUser.personId ? (
                                <div>
                                    <BsPencilSquare className={"ml-5 font-1-4rem clickable-icon"}
                                                    onClick={handleShowIngEdit}/>
                                    <ProfileIngredientEditModal show={showIngEdit}
                                                                disableButtons={disableButtons}
                                                                handleEdit={() => editIng()}
                                                                handleClose={() => setShowIngEdit(false)} />
                                </div>
                            ) : (<></>)}
                        </Card.Title>
                        <Card.Text>
                            {user.favoriteIngredients.length !== 0 ? (
                                user.favoriteIngredients.map((ingredient,index) =>
                                    <Badge className={'py-2 px-3 m-1'} key={index}>{ingredient.name}</Badge>
                                )
                            ) : (
                                <>@{user.username} još nema najdraže sastojke!</>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Row>
    );
};

export default ProfileInfoCards;