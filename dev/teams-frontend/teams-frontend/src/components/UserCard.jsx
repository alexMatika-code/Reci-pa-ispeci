import {Card} from "react-bootstrap";
import {BsArrowUpSquareFill, BsArrowDownSquareFill, BsEnvelopeFill} from "react-icons/bs";
import {toast} from "react-toastify";
import RoleBadge from "./RoleBadge.jsx";
import {useState} from "react";
import UserControlModal from "./UserControlModal.jsx";

const UserCard = ({personId, image, firstname, lastname, username, email, role, reload, setReload}) => {
    const [disableButtons, setDisableButtons] = useState(false);

    const [showPromote, setShowPromote] = useState(false);
    const handleClosePromote = () => setShowPromote(false);
    const handleShowPromote = () => setShowPromote(true);

    const [showDemote, setShowDemote] = useState(false);
    const handleCloseDemote = () => setShowDemote(false);
    const handleShowDemote = () => setShowDemote(true);


    const promote = async () => {
        try {
            setDisableButtons(true);
            const response = await fetch(`/api/people/promote`, {
                method: "PUT",
                body: JSON.stringify({personId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Korisnik promoviran!");
                setReload(!reload);
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error editing about:", error);
        }
        finally {
            handleClosePromote();
            setDisableButtons(false);
        }
    }

    const demote = async () => {
        try {
            setDisableButtons(true);
            const response = await fetch(`/api/people/demote`, {
                method: "PUT",
                body: JSON.stringify({personId}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Korisnik degradiran!");
                setReload(!reload);
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error editing about:", error);
        }
        finally {
            handleCloseDemote();
            setDisableButtons(false);
        }
    }

    return (
        <div className={"col-xl-4 col-lg-6 col-12 pb-4"}>
            <Card className={"shadow-sm"}>
                <Card.Body className={"d-flex"}>
                    <div className={""}>
                        <img className={"border border-4 rounded-circle max-w-85 min-w-85 shadow-sm"} src={image} alt={"slika"}/>
                    </div>
                    <div className={"w-100"}>
                        <h5 className={"d-flex justify-content-between align-items-center font-weight-600"}>
                            <span className={"color-dsg"}>{firstname} {lastname}</span>
                            <span className={"color-lsg d-flex"}>
                                {role !== "ADMIN" ? (
                                    <>
                                        <BsArrowUpSquareFill className={"ml-5 font-1-6rem clickable-icon"} onClick={handleShowPromote}/>
                                        <UserControlModal action={"Promoviraj"}
                                                          username={username}
                                                          disable={disableButtons}
                                                          show={showPromote}
                                                          handleClose={handleClosePromote}
                                                          handleSave={promote}/>
                                    </>
                                    ) : (<></>)}
                                {role !== "USER" ? (
                                    <>
                                        <BsArrowDownSquareFill className={"ml-10 font-1-6rem clickable-icon"} onClick={handleShowDemote}/>
                                        <UserControlModal action={"Degradiraj"}
                                                          username={username}
                                                          disable={disableButtons}
                                                          show={showDemote}
                                                          handleClose={handleCloseDemote}
                                                          handleSave={demote}/>
                                    </>
                                ) : (<></>)}
                            </span>
                        </h5>
                        <span className={"d-block color-lsg mb-8"}>@{username} <RoleBadge role={role}/></span>
                        <span className={"d-flex align-items-center color-dsg"}><BsEnvelopeFill className={"mr-5"} /> <span>{email}</span></span>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UserCard;