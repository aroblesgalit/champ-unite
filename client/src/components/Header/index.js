import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function Header() {

    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUserData()
            .then(user => {
                setUser({
                    isLoggedIn: true
                });
            })
            .catch(err => {
                console.log(err);
                setUser({
                    isLoggedIn: false
                });
            })
    }, []);

    function handleLogout() {
        API.logoutUser()
            .then(() => {
                console.log("User logged out.");
                setUser({
                    isLoggedIn: false
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <header>
            <nav className="uk-navbar-container uk-navbar-transparent uk-light" uk-navbar="true">
                <div className="uk-navbar-left">
                    <Link className="uk-navbar-item uk-logo" to="/">ChampUnite</Link>
                    <ul className="uk-navbar-nav">
                        <li><Link to="">Ranking</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/champions">Champions</Link></li>
                    </ul>
                </div>
                <div className="uk-navbar-right">
                    {
                        user.isLoggedIn ? (
                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/login" onClick={handleLogout} >Logout</Link>
                                </li>
                            </ul>
                        ) : (
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>
                            )
                    }
                </div>
            </nav>
        </header>
    );
}

export default Header;