import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "../Contexts.jsx";
import Navbar from "../components/Navbar.jsx";
import Spinner from "../components/Spinner.jsx";
import {ToastContainer} from "react-toastify";
import ChatTab from '../components/ChatTab';
import ErrorPage from "../pages/ErrorPage.jsx";

const MainLayout = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(`/api/people/getAuthUser`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.error("Error fetching currentUser:", error);
            } finally {

                setLoading(false);
            }
        };
        fetchCurrentUser();
    }, [location.pathname]);

    if(currentUser === undefined){
        return <ErrorPage code={500} text={"BE server is slow :(. Please be patient with it, and refresh the page..."} />
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                <>
                    <Navbar />
                    <Outlet />
                    {currentUser && <ChatTab />}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        theme="colored"
                        transition: Slide
                    />
                </>
            )}
        </AuthContext.Provider>
    );
};

export default MainLayout;