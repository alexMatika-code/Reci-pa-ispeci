import { BsSearch, BsClock, BsBasket2Fill, BsChevronDown, BsChevronUp } from "react-icons/bs";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import {useState} from "react";


const SearchBar = ({showModal, setQuery, query, setTimeToCook, timeToCook, search}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={"mb-4"}>
            <div className={"mx-auto mt-5 col-xl-5 col-lg-6 col-sm-8 col-10"}>
                <div
                    className={"search-bar-container d-flex justify-content-center align-items-center rounded-5 p-2 shadow-sm"}>
                    <input type="text"
                           placeholder="U potrazi za dobrim jelom..."
                           className={"p-2 px-4 border-0 w-100 color-dsg search-input font-1-1rem font-sm-1rem font-weight-600"}
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}/>
                    <div className={"p-2 search-icon cursor-pointer"} onClick={search}>
                        <BsSearch className={"font-1-8rem color-dsg"}/>
                    </div>
                </div>
            </div>

            <span className={"d-flex justify-content-center pt-2 pb-sm-3 pb-3 color-lsg"}>
                <span className={"cursor-pointer color-dsg-hover d-flex align-items-center"} onClick={() => setShowMenu(!showMenu)}>
                    <span className={"no-select"}>Filtriranje</span>
                    {showMenu ? (
                        <BsChevronUp className={"ml-4 font-1-2rem"}/>
                    ) : (
                        <BsChevronDown className={"ml-4 font-1-2rem"}/>
                    )}
                </span>
            </span>

            <Row className={`menu-container ${showMenu ? "show" : "hide"} mb-5 mx-auto justify-content-center align-items-center responsive-width`}>
                <div className={"col-lg-6 col-10"}>
                    <div className={"search-bar-container d-flex justify-content-center align-items-center rounded-5 p-2 shadow-sm"}>
                        <input type="text"
                               placeholder="Dostupno vrijeme (minute)"
                               className={"p-2 px-4 border-0 w-100 color-dsg search-input font-1-1rem font-sm-1rem font-weight-600"}
                               value={timeToCook}
                               onChange={(e) => setTimeToCook(e.target.value)}/>
                        <div className={"p-2 search-icon"}>
                            <BsClock className={"font-1-8rem color-dsg"}/>
                        </div>
                    </div>
                </div>
                <div className={"col-lg-4 col-10 d-flex justify-content-center align-items-center pt-lg-0 pt-3"}>
                    <div
                        className={"w-100 search-bar-container d-flex justify-content-center align-items-center rounded-5 p-2 shadow-sm"}>
                        <div className={"p-2 search-icon border-0 cursor-pointer"} onClick={showModal}>
                            <BsBasket2Fill className={"font-1-8rem color-coral"}/>
                        </div>
                        <div className={"p-2 px-4 border-0 w-100 color-lsg search-input font-1-1rem font-sm-1rem font-weight-600"}>
                            Sastojci
                        </div>
                    </div>
                </div>
            </Row>
        </div>

    );
}
export default SearchBar