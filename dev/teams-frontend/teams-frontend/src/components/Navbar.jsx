import logo from "../assets/logo.png";
import { BsFillGearFill, BsBasket2Fill, BsClipboard2PlusFill, BsPersonCircle, BsClipboard2CheckFill  } from "react-icons/bs";
import {AuthContext} from "../Contexts.jsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";

function Navbar() {
    const currentUser = useContext(AuthContext);
    const navigate = useNavigate();

    const navigateToAddNew = () => {
        navigate(`/recipe/add`);
    };

    const navigateToUserControl = () => {
        navigate('/user-control');
    }

    const navigateToIngredients = () => {
        navigate(`/ingredients`);
    }

    const navigateToApproveal = () => {
        navigate(`/recipe/approve`);
    }

    const navigateToProfilePage = () => {
        navigate(`/profile/${currentUser.username}`);
    }

    const navigateToHome = () => {
        navigate(`/`);
    };

    const handleLoginClick = async () => {
        location.href="https://reci-pa-ispeci.onrender.com/api/oauth2/authorization/google"
    };

    return (
        <div className={"navbar-container h-100 nav-custom d-flex justify-content-between"}>
            <span className={"d-flex align-items-center ml-16"}>
                <div className="nav-logo cursor-pointer" onClick={navigateToHome}>
                    <img src={logo} className={"w-100 h-100"} alt="logo"/>
                </div>

                <div className={"cursor-pointer title-navbar"} onClick={navigateToHome}>
                    Reci-Pa-Ispeci
                </div>
            </span>

            <span className={"d-flex align-items-center mr-16"}>
                {currentUser ? (
                    // dodat provjeru za rolse
                    <div className={"nav-links align-items-center mr-16"}>
                        <BsFillGearFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                        onClick={navigateToUserControl} />
                        <BsBasket2Fill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                       onClick={navigateToIngredients} />
                        <BsClipboard2CheckFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                        onClick={navigateToApproveal} />
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
