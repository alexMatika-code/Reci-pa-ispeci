import {useContext} from "react";
import {AuthContext} from "../Contexts.jsx";
import AwaitingRecipes from "../components/AwaitingRecipes.jsx";
import ErrorPage from "./ErrorPage.jsx";

const ApproveRecipesPage = () => {
    const currentUser = useContext(AuthContext);

    return (
        <>
            {(currentUser && (currentUser.role === "ADMIN" || currentUser.role === "CHEF")) ? (
                <div className="w-75 mx-auto pt-40">
                    <h5 className={"mb-4"}>Recepti za odobrenje</h5>
                    <AwaitingRecipes />
                </div>
            ) : (
                <div>
                    <ErrorPage code={401} text={"Unauthorized :("} />
                </div>
            )}
        </>
    );
};

export default ApproveRecipesPage;