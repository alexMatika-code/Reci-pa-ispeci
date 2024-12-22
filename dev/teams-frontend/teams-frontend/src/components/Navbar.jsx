import logo from "../assets/logo.png";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {BsPersonCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Row} from "react-bootstrap";

function Navbar({currentUser, setCurrentUser}) {
    const navigate = useNavigate();

    useEffect(() => {
        // const fetchCurrentUser = async () => {
        //     try {
        //         const response = await fetch(`/api/people/getAuthUser`);
        //         const data = await response.json();
        //         setCurrentUser(data);
        //     } catch (error) {
        //         console.error("Error fetching currentUser:", error);
        //     }
        // };
        //
        // fetchCurrentUser();
    }, []);
    const navigateToAddNew = () => {
        navigate(`/recipe/add`);
    };
    const navigateToProfilePage = () => {
        navigate(`/profile/${currentUser.username}`);
    }

    const navigateToHome = () => {
        navigate(`/`);
    };

    const handleLoginClick = () => {
        location.href = "/api/login"
    }
    return (
        <div className={"navbar-container h-100 nav-custom d-flex justify-content-between px-5"}>
            <span className={"d-flex align-items-center"}>
                <div className="nav-logo logo-navbar cursor-pointer" onClick={navigateToHome}>
                    <img src={logo} className={"w-100 h-100"} alt="logo"/>
                </div>

                <div className={"title-navbar"}>
                    Reci-Pa-Ispeci
                </div>
            </span>

            <span className={"d-flex align-items-center"}>
                {currentUser ? (
                    <BsFillPlusCircleFill className={"font-1-8rem mx-4 cursor-pointer clickable-icon"} onClick={navigateToAddNew} />
                ) : ( <></> )}

                <div className={"d-flex align-items-center person-icon"}>
                    {currentUser ? (
                        <img src={currentUser.image}
                             alt={"nema"}
                             className={"rounded-circle cursor-pointer person-icon"}
                             onClick={navigateToProfilePage}/>
                    ) : (
                        <BsPersonCircle
                            onClick={handleLoginClick}
                            className={"cursor-pointer clickable-icon"}/>
                    )}
                </div>
            </span>
        </div>
    );
}

export default Navbar;
