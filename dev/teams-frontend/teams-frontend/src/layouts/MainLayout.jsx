import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "../Contexts.jsx";
import Navbar from "../components/Navbar.jsx";
import Spinner from "../components/Spinner.jsx";
import {ToastContainer} from "react-toastify";

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

    return (
        <AuthContext.Provider value={currentUser}>
            {loading ? (
                <Spinner loading={loading}/>
            ) : (
                <>
                    <Navbar />
                    {/*Ovdje se moze napravit provjera za prikaz auth pageova */}
                    <Outlet />
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