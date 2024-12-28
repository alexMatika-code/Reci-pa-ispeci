import logo from "../assets/logo.png";
import { BsFillGearFill, BsBasket2Fill, BsClipboard2PlusFill, BsPersonCircle } from "react-icons/bs";
import {useNavigate} from "react-router-dom";

function Navbar({currentUser}) {
    const navigate = useNavigate();

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
