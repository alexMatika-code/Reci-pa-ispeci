import styles from './Navbar.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../assets/logo.png";
// import {BsPersonCircle} from "react-icons/bs";

function Navbar() {

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
                        <div className="col-3">
                            <div style={{
                                width: '100%',
                                textAlign: 'center',
                                color: '#FF0037',
                                fontSize: 42,
                                fontFamily: 'Outfit',
                                fontWeight: '700',
                                wordWrap: 'break-word'
                            }}>Reci-Pa-Ispeci
                            </div>
                        </div>
                        {/*<BsPersonCircle className={"${styles.userIcon}"}/>*/}
                        {/*<div style={{width: '100%', height: '100%', position: 'relative'}}>*/}
                        {/*    <div style={{*/}
                        {/*        width: 43,*/}
                        {/*        height: 43,*/}
                        {/*        left: 0,*/}
                        {/*        top: 0,*/}
                        {/*        position: 'absolute',*/}
                        {/*        background: 'white',*/}
                        {/*        borderRadius: 9999*/}
                        {/*    }}/>*/}
                        {/*    <div style={{*/}
                        {/*        width: 43,*/}
                        {/*        height: 43,*/}
                        {/*        left: 0,*/}
                        {/*        top: 0,*/}
                        {/*        position: 'absolute',*/}
                        {/*        background: '#FF0037'*/}
                        {/*    }}></div>*/}
                        {/*</div>*/}
                    </div>
                </nav>

            </header>
        </div>

    )
        ;
}

export default Navbar;
