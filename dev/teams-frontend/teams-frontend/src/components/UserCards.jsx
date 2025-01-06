import {useEffect, useState} from "react";
import Spinner from "./Spinner.jsx";
import {Row} from "react-bootstrap";
import UserCard from "./UserCard.jsx";

const UserCards = () => {
    const [users, setUsers] = useState([]);
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
        // fetchUsersInfo();
    }, []);

    return (
        <Row>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                // users.length > 0 ? (
                //     users.map((user) => (
                //         <></>
                //         ))
                // ) : (
                //     <div className={"text-center color-dsg"}>Nema tih korisnika</div>
                // )
                <>
                    <UserCard image={"https://lh3.googleusercontent.com/a/ACg8ocKsStY3vGgrPtADEg2Kf4vsiMtJedQyXj4gdNYRvWSdO5YJIgY=s96-c"}
                              firstname={"Matija"}
                              lastname={"Lovrekovic"}
                              username={"mlovreko123"}
                              email={"mlovreko123@gmail.com"}
                              role={"USER"}/>
                    <UserCard image={"https://lh3.googleusercontent.com/a/ACg8ocL9rheQXXU31i0SwroLSR7LjMs1tVTt96BgnnTUIoYkQR13iA=s96-c"}
                              firstname={"Robert"}
                              lastname={"C. Jones"}
                              username={"robinjojoni"}
                              email={"robertcjones@gmail.com"}
                              role={"CHEF"}/>
                    <UserCard image={"https://lh3.googleusercontent.com/a/ACg8ocICfRlH_kqk3zOTy7TC_bN-UxsJobqu1_oTvjq2ISd7aCMbYQ=s96-c"}
                              firstname={"Anthony"}
                              lastname={"Yao"}
                              username={"YaoBaoAnt"}
                              email={"anthonyoay@gmail.com"}
                              role={"ADMIN"}/>
                </>

            )}
        </Row>
    );
};

export default UserCards;