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
                <div className="nav-left uk-navbar-left">
                    <Link className="uk-navbar-item uk-logo" to="/">ChampUnite</Link>
                    <ul className="uk-navbar-nav">
                        <li><Link to="/Ranking">Ranking</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/champions">Champions</Link></li>
                    </ul>
                </div>
                <div className="nav-right-large uk-navbar-right">
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
                <div className="nav-right-small uk-navbar-right uk-margin-top uk-margin-right">
                    <button className="nav-small-icon uk-button uk-button-default" type="button" uk-toggle="target: #nav-small"><span uk-icon="icon: menu"></span></button>
                    <div id="nav-small" uk-offcanvas="flip: true; overlay: true">
                        <div className="nav-bar-small uk-offcanvas-bar uk-flex uk-flex-column">
                            <button class="uk-offcanvas-close" type="button" uk-close="true"></button>
                            {
                                user.isLoggedIn ? (
                                    <ul className="uk-nav uk-nav-primary uk-nav-center">
                                        <li><Link to="/Ranking">Ranking</Link></li>
                                        <li><Link to="/users">Users</Link></li>
                                        <li><Link to="/champions">Champions</Link></li>
                                        <li><Link to="/profile">Profile</Link></li>
                                        <li><Link to="/login" onClick={handleLogout} >Logout</Link></li>
                                    </ul>
                                ) : (
                                        <ul className="uk-nav uk-nav-primary uk-nav-center">
                                            <li><Link to="/Ranking">Ranking</Link></li>
                                            <li><Link to="/users">Users</Link></li>
                                            <li><Link to="/champions">Champions</Link></li>
                                            <li><Link to="/login">Login</Link></li>
                                        </ul>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;