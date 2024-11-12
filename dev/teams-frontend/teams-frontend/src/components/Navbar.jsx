import logo from "../assets/logo.png";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {BsPersonCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Navbar() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(`/api/people/getAuthUser`);
                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.error("Error fetching currentUser:", error);
            }
        };

        fetchCurrentUser();
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
        <div className={"navbar-container h-100"}>
            <header className="App-header">
                <nav className={"navbar"}>
                    <div className="row align-items-center pl-3">
                        <div className="col-1 logo-navbar cursor-pointer"
                             onClick={navigateToHome}>
                            <img src={logo} className={"w-100 h-100"} alt="logo"/>
                        </div>
                        <div className="col-8">
                            <div className={"title-navbar"}>Reci-Pa-Ispeci
                            </div>
                        </div>
                        {currentUser ? (
                            <div className={"col-2 d-flex plusic-navbar gap-2 align-items-center cursor-pointer"}
                                 onClick={navigateToAddNew}>
                                <BsFillPlusCircleFill className={""}/>
                                Novi recept
                            </div>
                        ) : (
                            <div className="col-2" style={{ visibility: "hidden" }}>
                                <BsFillPlusCircleFill className={""}/>
                                Novi recept
                            </div>
                        )}
                        <div className={"col-1 align-items-center d-flex person-icon"}>
                            {currentUser ? (
                                <img src={currentUser.image}
                                     alt={"nema"}
                                     className={"rounded-circle cursor-pointer person-icon"}
                                     onClick={navigateToProfilePage}
                                />
                            ) : (
                                <BsPersonCircle

                                    onClick={handleLoginClick}
                                    className={"cursor-pointer"}
                                />
                            )}
                        </div>
                    </div>
                </nav>

            </header>
        </div>

    )
        ;
}

export default Navbar;
