import logo from "../../assets/logo.png";
import {
    BsFillGearFill,
    BsBasket2Fill,
    BsClipboard2PlusFill,
    BsPersonCircle,
    BsClipboard2CheckFill,
    BsList
} from "react-icons/bs";
import {AuthContext} from "../../Contexts.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";

function Navbar() {
    const currentUser = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleMenuShow = () => {
        setShow(!show);
    }

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
        <>
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
                        <>
                            <div className={"nav-links align-items-center mr-16"}>
                                {currentUser.role === "ADMIN" ? (
                                    <BsFillGearFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                                    onClick={navigateToUserControl} />
                                ) : (<></>)}
                                {currentUser.role === "ADMIN" || currentUser.role === "CHEF" ? (
                                    <>
                                        <BsBasket2Fill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                                       onClick={navigateToIngredients} />
                                        <BsClipboard2CheckFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                                               onClick={navigateToApproveal} />
                                    </>
                                ) : (<></>)}
                                <BsClipboard2PlusFill className={"font-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                                      onClick={navigateToAddNew} />

                            </div>
                            <div className={"nav-mobile"}>
                                <BsList className={"font-2-2rem mx-2 cursor-pointer color-dsg clickable-icon"}
                                        onClick={handleMenuShow}/>
                            </div>
                        </>
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
            {currentUser ? (
                <div className={`${show ? "d-block" : "d-none"} d-md-none nav-mobile-menu shadow-sm w-100 text-white m-0 py-1 font-weight-600`}>
                    <p className={"font-1-4rem m-0 cursor-pointer d-flex align-items-center py-3 px-5"}
                       onClick={() => {
                           navigateToProfilePage();
                           setShow(false);
                       }}>
                        <BsPersonCircle className={"mr-10"}/>
                        <span>{currentUser.username || "username"}</span>
                    </p>
                    {currentUser.role === "ADMIN" ? (
                        <p className={"font-1-4rem m-0 cursor-pointer d-flex align-items-center py-3 px-5"}
                           onClick={() => {navigateToUserControl(); setShow(false);}}>
                            <BsFillGearFill className={"mr-10"}/>
                            <span>Kontrola korisnika</span>
                        </p>
                    ) : (<></>)}
                    {currentUser.role === "ADMIN" || currentUser.role === "CHEF"? (
                        <>
                            <p className={"font-1-4rem m-0 cursor-pointer d-flex align-items-center py-3 px-5"}
                               onClick={() => {
                                   navigateToIngredients();
                                   setShow(false);
                               }}>
                                <BsBasket2Fill className={"mr-10"}/>
                                <span>Kontrola sastojaka</span>
                            </p>
                            <p className={"font-1-4rem m-0 cursor-pointer d-flex align-items-center py-3 px-5"}
                               onClick={() => {
                                   navigateToApproveal();
                                   setShow(false);
                               }}>
                                <BsClipboard2CheckFill className={"mr-10"}/>
                                <span>Predlozeni recepti</span>
                            </p>
                        </>
                    ) : (<></>)}
                    <p className={`font-1-4rem m-0 cursor-pointer d-flex align-items-center py-3 px-5`}
                       onClick={() => {
                           navigateToAddNew();
                           setShow(false);
                       }}>
                        <BsClipboard2PlusFill className={"mr-10"}/>
                        <span>Novi recept</span>
                    </p>
                </div>
            ) : (<></>)}
        </>
    );
}

export default Navbar;
