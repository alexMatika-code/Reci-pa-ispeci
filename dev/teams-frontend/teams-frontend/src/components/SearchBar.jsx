import { BsSearch, BsClock, BsBasket2Fill, BsFillSendFill } from "react-icons/bs";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";


const SearchBar = ({showModal, setQuery, query, setTimeToCook, timeToCook, search}) => {
    return (
        <Row className={"w-60 mx-auto py-5 d-flex justify-content-center align-items-center responsive-width"}>
            <div className={"col-xl-7 col-lg-6 col-sm-12 mb-2"}>
                <InputGroup>
                    <InputGroupText><BsSearch /></InputGroupText>
                    <Form.Control type="text"
                                  placeholder="U potrazi za dobrim jelom..."
                                  className={"py-2"}
                                  value={query}
                                  onChange={(e) => setQuery(e.target.value)}/>
                </InputGroup>
            </div>
            <div className={"col-xl-3 col-lg-4 col-sm-12 mb-2"}>
                <InputGroup>
                    <InputGroupText><BsClock /></InputGroupText>
                    <Form.Control type="text"
                                  placeholder="Dostupno vrijeme (minute)"
                                  className={"py-2"}
                                  value={timeToCook}
                                  onChange={(e) => setTimeToCook(e.target.value)}/>
                </InputGroup>
            </div>
            <div className={"col-md-2 px-20 d-flex justify-content-center align-items-center"}>
                <Button variant="danger" className={"rounded-circle searchbar-button d-flex align-items-center m-3"} onClick={showModal}>
                    <BsBasket2Fill className={"font-2rem"}/>
                </Button>
                <Button variant="success"
                        className={"rounded-circle searchbar-button d-flex align-items-center m-3"} onClick={search}>
                    <BsFillSendFill className={"font-2rem"}/>
                </Button>
            </div>
        </Row>
    );
}
export default SearchBar