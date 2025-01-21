import {useContext} from "react";
import {AuthContext} from "../Contexts.jsx";
import UserCards from "../components/UserControlPage/UserCards.jsx";
import ErrorPage from "./ErrorPage.jsx";

const UserControlPage = () => {
    const currentUser = useContext(AuthContext);

    return (
        <>
            {(currentUser && currentUser.role === "ADMIN") ? (
                <div className="w-75 mx-auto pt-40">
                    <h5 className={"mb-4"}>Kontrola korisnika</h5>
                    <UserCards />
                </div>
            ) : (
                <div>
                    <ErrorPage code={401} text={"Unauthorized :("} />
                </div>
            )}
        </>
    );
};

export default UserControlPage;