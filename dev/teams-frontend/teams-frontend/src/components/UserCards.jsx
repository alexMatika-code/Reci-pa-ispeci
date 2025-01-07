import {useEffect, useState} from "react";
import Spinner from "./Spinner.jsx";
import {Row} from "react-bootstrap";
import UserCard from "./UserCard.jsx";

const UserCards = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsersInfo = async () => {
            try {
                const response = await fetch(`/api/people/info`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsersInfo();
    }, [reload]);

    return (
        <Row>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                users.length > 0 ? (
                    users.map((user) => (
                        <UserCard key={user.personId}
                                  personId={user.personId}
                                  image={user.image}
                                  firstname={user.firstName}
                                  lastname={user.lastName}
                                  username={user.username}
                                  email={user.email}
                                  role={user.role}
                                  reload={reload}
                                  setReload={setReload}/>
                        ))
                ) : (
                    <div className={"text-center color-dsg"}>Nema tih korisnika</div>
                )
            )}
        </Row>
    );
};

export default UserCards;