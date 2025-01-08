import {useContext} from "react";
import {AuthContext} from "../Contexts.jsx";
import AwaitingRecipes from "../components/AwaitingRecipes.jsx";

const ApproveRecipesPage = () => {
    const currentUser = useContext(AuthContext);
    const testing = true;

    return (
        <>
            {(currentUser && (currentUser.role === "ADMIN" || currentUser.role === "CHEF")) || testing ? (
                <div className="w-75 mx-auto pt-40">
                    <h5 className={"mb-4"}>Recepti za odobrenje</h5>
                    <AwaitingRecipes />
                </div>
            ) : (
                <div>
                    ne moze
                </div>
            )}
        </>
    );
};

export default ApproveRecipesPage;