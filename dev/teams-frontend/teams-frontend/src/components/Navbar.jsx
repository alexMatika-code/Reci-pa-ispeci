import styles from './Navbar.module.css';
import logo from "../assets/logo.png";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {BsPersonCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    const navigateToAddNew = () => {
        navigate(`/recipe/add`);
    }

    const navigateToEditProfile = () => {
        navigate(`/profile/edit`);
    };
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#E3FCF9',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}>
            <header className="App-header">
                <nav className={`${styles.navbar}`}>
                    <div className="row align-items-center pl-3">
                        <div className="col-1">
                            <img src={logo} className={`${styles.logo}`} alt="logo"/>
                        </div>
                        <div className="col-8">
                            <div style={{
                                width: '100%',
                                textAlign: 'left',
                                color: '#FF0037',
                                fontSize: 42,
                                fontFamily: 'Outfit',
                                fontWeight: '700',
                                wordWrap: 'break-word'
                            }}>Reci-Pa-Ispeci
                            </div>
                        </div>
                        <div className={"col-2 d-flex plusic-navbar gap-2 align-items-center"}
                             style={{
                                 fontSize: 23,
                                 cursor: "pointer"
                             }}
                             onClick={navigateToAddNew}>
                            <BsFillPlusCircleFill className={""}/>
                            Novi recept
                        </div>
                        <div className={"col-1 align-items-center d-flex"}
                             style={{
                                 fontSize: 50,
                                 cursor: "pointer"
                             }}
                        onClick={navigateToEditProfile}>
                            <BsPersonCircle/>
                        </div>
                    </div>
                </nav>

            </header>
        </div>

    )
        ;
}

export default Navbar;
