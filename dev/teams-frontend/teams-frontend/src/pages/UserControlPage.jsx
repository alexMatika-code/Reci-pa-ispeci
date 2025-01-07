import {useContext} from "react";
import {AuthContext} from "../Contexts.jsx";
import UserCards from "../components/UserCards.jsx";

const UserControlPage = () => {
    const currentUser = useContext(AuthContext);
    const testing = true;

    return (
        <>
            {(currentUser && currentUser.role === "ADMIN") || testing ? (
                <div className="w-75 mx-auto pt-40">
                    <h5 className={"mb-4"}>Kontrola korisnika</h5>
                    <UserCards />
                </div>
            ) : (
                <div>
                ne moze
                </div>
            )}
        </>
    );
};

export default UserControlPage;