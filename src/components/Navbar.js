import React from 'react'
import {Link, useNavigate} from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";
import useGoalsContext from "../hooks/useGoalsContext";

const Navbar = () => {
    const {user, dispach} = useAuthContext();
    const {dispach: goalsDispach} = useGoalsContext();
    const navigate = useNavigate();
    const toogleMenu = (e) => {
        const navMenu = document.querySelector("ul.nav-menu");
        const hamburger = document.querySelector(".hamburger");
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    }

    const goToHome = () => navigate("/");

    const handleLogout = () => {
        dispach({type: "LOGOUT"});
        localStorage.removeItem("user");
        goalsDispach({type: "CLEAR"});
    }

  return (
    <nav>
        <h1 className="home-link" onClick={goToHome}>Timely</h1>
        <ul className="nav-menu">
            {!user ? (
                <>
                    <li>
                        <Link to="/auth/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/auth/signup">Signup</Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/profile">
                            <img src={user?.profilePic} alt="profile pic" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/goals/add">
                            Add Goal
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log out</button>
                    </li>
                </>
            )}
        </ul>
        <div className="hamburger" onClick={toogleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    </nav>
    )
}

export default Navbar;
