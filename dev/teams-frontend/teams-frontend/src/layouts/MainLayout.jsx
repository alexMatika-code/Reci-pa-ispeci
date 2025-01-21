import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "../Contexts.jsx";
import Navbar from "../components/Utility/Navbar.jsx";
import Spinner from "../components/Utility/Spinner.jsx";
import {ToastContainer} from "react-toastify";
import ChatTab from '../components/Chat/ChatTab.jsx';
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

    if(currentUser === undefined) {
        if (currentUser.username === undefined) {
            return <ErrorPage code={500}
                          text={"BE je jako spor :( - Molim vas, budite strpljivi s njime i osvježite stranicu..."}/>
        }
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