import {Card} from "react-bootstrap";
import {BsArrowUpSquareFill, BsArrowDownSquareFill, BsEnvelopeFill} from "react-icons/bs";
import {toast} from "react-toastify";
import RoleBadge from "./RoleBadge.jsx";

const UserCard = ({image, firstname, lastname, username, email, role}) => {
    const promote = async () => {
        try {
            const response = await fetch(`/api/people/promote/${username}`, {
                method: "PUT",
                body: username,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Korisnik promoviran!");
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error editing about:", error);
        }
    }

    const demote = async () => {
        try {
            const response = await fetch(`/api/people/demote/${username}`, {
                method: "PUT",
                body: username,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok) {
                toast.success("Korisnik demotiran!");
            }
            else{
                toast.error("Ups! Dogodila se greška.");
            }
        } catch (error) {
            console.error("Error editing about:", error);
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
                                {role !== "ADMIN" ? <BsArrowUpSquareFill className={"ml-5 font-1-6rem clickable-icon"} onClick={promote}/> : (<></>)}
                                {role !== "USER" ? (<BsArrowDownSquareFill className={"ml-10 font-1-6rem clickable-icon"} onClick={demote}/>) : (<></>)}
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