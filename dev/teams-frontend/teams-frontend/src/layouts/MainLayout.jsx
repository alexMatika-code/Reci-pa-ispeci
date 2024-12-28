import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";

const MainLayout = () => {
    const [currentUser, setCurrentUser] = useState(null);
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
            }
        };
        fetchCurrentUser();
    }, [location.pathname]);

    return (
        <>
            <Navbar currentUser={currentUser} />
            {/* Ovdje se moze napravit provjera za prikaz auth pageova */}
            <Outlet />
        </>
    );
};

export default MainLayout;