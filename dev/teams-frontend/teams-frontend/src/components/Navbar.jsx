import logo from "../assets/logo.png";
import { BsFillGearFill, BsBasket2Fill } from "react-icons/bs";
import { BsClipboard2PlusFill } from "react-icons/bs";
import {BsPersonCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Navbar({currentUser}) {
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

    const navigateToIngredients = () => {
        navigate(`/ingredients`);
    }

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
        <div className={"navbar-container h-100 nav-custom d-flex justify-content-between"}>
            <span className={"d-flex align-items-center ml-16"}>
                <div className="nav-logo logo-navbar cursor-pointer" onClick={navigateToHome}>
                    <img src={logo} className={"w-100 h-100"} alt="logo"/>
                </div>

                <div className={"title-navbar"}>
                    Reci-Pa-Ispeci
                </div>
            </span>

            <span className={"d-flex align-items-center mr-16"}>
                {currentUser ? (
                    <div className={"nav-links align-items-center mr-16"}>
                        <BsBasket2Fill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                       onClick={navigateToIngredients} />
                        <BsFillGearFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"} />
                        <BsClipboard2PlusFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                              onClick={navigateToAddNew} />
                    </div>
                ) : ( <></> )}

                <div className={"d-flex align-items-center justify-content-end person-icon"}>
                    {currentUser ? (
                        <img src={currentUser.image}
                             alt={"nema"}
                             className={"cursor-pointer rounded-circle nav-profile"}
                             onClick={navigateToProfilePage}/>
                    ) : (
                        <BsPersonCircle
                            onClick={handleLoginClick}
                            className={"cursor-pointer color-dsg clickable-icon"}/>
                    )}
                </div>
            </span>
        </div>
    );
}

export default Navbar;
