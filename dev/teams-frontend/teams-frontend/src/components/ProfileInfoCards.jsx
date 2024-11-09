import {Badge, Card, Row} from "react-bootstrap";

const ProfileInfoCards = ({user}) => {
    return (
        <Row>
            <div className="col-xl-8 col-lg-12 mb-4">
                <Card className={"shadow-sm"}>
                    <Card.Body>
                        <Card.Title className="pb-2 font-weight-600">📖 Informacije o @{user.Username}...</Card.Title>
                        <Card.Text className="card-text">{user.About}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-xl-4 col-lg-12 mb-4">
                <Card className={"shadow-sm"}>
                    <Card.Body>
                        <Card.Title className="pb-2 font-weight-600">💖 Najdraži sastojci...</Card.Title>
                        <Card.Text>
                            {user.FavouriteIngredients.map((ingredient,index) =>
                                <Badge className={'py-2 px-3 m-1'} key={index}>{ingredient}</Badge>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Row>
    );
};

export default ProfileInfoCards;