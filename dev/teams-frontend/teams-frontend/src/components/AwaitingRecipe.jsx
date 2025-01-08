import {Button, Card} from "react-bootstrap";
import placeholder from "../assets/placeholder.jpg"
import {useNavigate} from "react-router-dom";

const AwaitingRecipe = ({id, title, description, image}) => {
    const navigate = useNavigate();

    const navigateToRecipe = () => {
        navigate(`/recipe/${id}`);
    }

    return (
        <div className={"col-xl-3 col-lg-4 col-md-6 col-12 pb-4"}>
            <Card className={"shadow-sm"}>
                <Card.Img variant="top" src={image ? `data:image/jpeg;base64,${image}` : placeholder} className={"rounded-4 p-2"}/>
                <Card.Body>
                    <Card.Title><span className={"bold color-dsg"}>{title || "Naziv recepta"}</span></Card.Title>
                    <Card.Text className={"color-lsg"}>
                        {description || "Opis recepeta"}
                    </Card.Text>
                    <Button variant="primary" onClick={navigateToRecipe}>Pregledaj</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AwaitingRecipe;
