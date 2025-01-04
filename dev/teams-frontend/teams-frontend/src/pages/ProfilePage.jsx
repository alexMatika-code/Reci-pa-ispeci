import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Row, Container} from "react-bootstrap";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileInfoCards from "../components/ProfileInfoCards.jsx";
import Spinner from "../components/Spinner.jsx";
import RecipeCards from "../components/RecipeCards.jsx";

const ProfilePage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/people/profile/${username}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.log(`Error fetching data - no user named - ${username}`, error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            setLoading(true);
            fetchUser();
        }
    }, [username]);

    return (
        <div>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                user.length !== 0 ? (
                    <div className={"w-75 m-auto pt-80"}>
                        <Row className={"d-flex"}>
                            {/* User Info */}
                            <Container className={"col-md-12 col-lg-5 col-xl-3"}>
                                <ProfileCard user={user} />
                            </Container>

                            <Container className={"col-md-12 col-lg-7 col-xl-9"}>
                                {/* User Info and Favorites */}
                                <ProfileInfoCards user={user} />

                                {/* Recipes */}
                                <h5 className={"mt-3 ml-16 color-dsg font-weight-600"}>📔 Recepti korisnika</h5>
                                <RecipeCards filteredRecipes={user.recipes}></RecipeCards>
                            </Container>
                        </Row>
                    </div>
                ) : (
                    <div>ne postoji</div>
                )
            )}
        </div>
    );
};

export default ProfilePage;
