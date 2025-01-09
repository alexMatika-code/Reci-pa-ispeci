import { BsSearch, BsClock, BsBasket2Fill, BsFillSendFill } from "react-icons/bs";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";


const SearchBar = ({showModal, setQuery, query, setTimeToCook, timeToCook, search}) => {
    return (
        <Row className={"w-60 mx-auto py-5 d-flex justify-content-center align-items-center"}>
            <div className={"col-7"}>
                <InputGroup>
                    <InputGroupText><BsSearch /></InputGroupText>
                    <Form.Control type="text"
                                  placeholder="U potrazi za dobrim jelom..."
                                  className={"py-2"}
                                  value={query}
                                  onChange={(e) => setQuery(e.target.value)}/>
                </InputGroup>
            </div>
            <div className={"col-3"}>
                <InputGroup>
                    <InputGroupText><BsClock /></InputGroupText>
                    <Form.Control type="text"
                                  placeholder="Dostupno vrijeme (minute)"
                                  className={"py-2"}
                                  value={timeToCook}
                                  onChange={(e) => setTimeToCook(e.target.value)}/>
                </InputGroup>
            </div>
            <div className={"col-1"}>
                <Button variant="danger" className={"rounded-circle searchbar-button d-flex align-items-center"} onClick={showModal}>
                    <BsBasket2Fill className={"font-2rem"}/>
                </Button>
            </div>

            <div className={"col-1"}>
                <Button variant="success"
                        className={"rounded-circle searchbar-button d-flex align-items-center"} onClick={search}>
                    <BsFillSendFill className={"font-2rem"}/>
                </Button>
            </div>
        </Row>
    );
}
export default SearchBar