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

            <span className={"d-flex justify-content-center align-items-center pt-2 pb-sm-2 pb-3 color-lsg color-dsg-hover cursor-pointer"}
                 onClick={() => setShowMenu(!showMenu)}>
                <span className={"no-select text-center"}>Filtriranje</span>
                {showMenu ? (
                    <BsChevronUp className={"ml-4 font-1-2rem"}/>
                ) : (
                    <BsChevronDown className={"ml-4 font-1-2rem"}/>
                )}
            </span>

            <Row
                className={`${showMenu ? "d-flex" : "d-none"} w-60 mb-5 mx-auto justify-content-center align-items-center responsive-width`}>
                <div className={"col-xl-6 col-lg-7 col-sm-8 px-4"}>
                    <InputGroup>
                        <InputGroupText><BsClock/></InputGroupText>
                        <Form.Control type="text"
                                      placeholder="Dostupno vrijeme (minute)"
                                      className={"py-2"}
                                      value={timeToCook}
                                      onChange={(e) => setTimeToCook(e.target.value)}/>
                    </InputGroup>
                </div>
                <div className={"col-2 d-flex justify-content-center align-items-center pt-sm-0 pt-2"}>
                    <Button variant="success" className={"d-flex align-items-center font-1rem rounded-4 px-3"}
                            onClick={showModal}>
                        <BsBasket2Fill className={"mr-10"}/>
                        <span className={"font-weight-600"}>Sastojci</span>
                    </Button>
                </div>
            </Row>
        </div>

    );
}
export default SearchBar