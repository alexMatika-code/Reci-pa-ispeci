import {Badge, Card, Row} from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import {useContext, useState} from "react";
import {AuthContext} from "../Contexts.jsx";
import ProfileDescriptionEditModal from "./ProfileDescriptionEditModal.jsx";
import IngredientsModal from "./IngredientsModal.jsx";
import {toast} from "react-toastify";

const ProfileInfoCards = ({user}) => {
    const currentUser = useContext(AuthContext);

    const [disableButtons, setDisableButtons] = useState(false);
    const [update, setUpdate] = useState(false);

    const [ingredients, setIngredients] = useState(user.favoriteIngredients);
    const [about, setAbout] = useState(user.about);

    const [showDescEdit, setShowDescEdit] = useState(false);
    const [showIngEdit, setShowIngEdit] = useState(false);

    const handleShowDescEdit = () => setShowDescEdit(true);
    const handleShowIngEdit = () => {
        setShowIngEdit(true);
        setUpdate(!update);
    }

    const editAbout = async () => {
        try {
            console.log(JSON.stringify(about))
            setDisableButtons(true);
            const response = await fetch(`/api/people/about`, {
                method: "PUT",
                body: about,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Opis izmijenjen!");
                user.about = about;
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error editing about:", error);
        } finally {
            setShowDescEdit(false);
            setDisableButtons(false);
        }
    }

    const editIng = async () => {
        try {
            const ingredientIds = ingredients.map(item => item.ingredientId);
            console.log(JSON.stringify(ingredientIds));
            setDisableButtons(true);
            const response = await fetch(`/api/people/favoriteIngredients`, {
                method: "PUT",
                body: JSON.stringify(ingredientIds),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Sastojci izmijenjeni!");
                user.favoriteIngredients = ingredients;
            }
            else{
                setIngredients(user.favoriteIngredients);
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error editing ingredients:", error);
        } finally {
            setShowIngEdit(false);
            setDisableButtons(false);
        }
    }

    return (
        <Row>
            <div className="col-xl-8 col-lg-12 mb-4">
                <Card className={"shadow-sm"}>
                    <Card.Body>
                        <Card.Title className="pb-2 font-weight-600 d-flex justify-content-between">
                            <span>📖 Informacije o @{user.username}...</span>
                            { currentUser && (user.personId === currentUser.personId) ? (
                                <div>
                                    <BsPencilSquare className={"ml-5 font-1-4rem clickable-icon"}
                                                    onClick={handleShowDescEdit}/>
                                    <ProfileDescriptionEditModal description={about}
                                                                 setDescription={setAbout}
                                                                 show={showDescEdit}
                                                                 disableButtons={disableButtons}
                                                                 handleSave={() => editAbout()}
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
                            { currentUser && (user.personId === currentUser.personId) ? (
                                <div>
                                    <BsPencilSquare className={"ml-5 font-1-4rem clickable-icon"}
                                                    onClick={handleShowIngEdit}/>
                                    <IngredientsModal show={showIngEdit}
                                                      update={update}
                                                      ingredients={ingredients}
                                                      setIngredients={setIngredients}
                                                      disableButtons={disableButtons}
                                                      handleSave={editIng}
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