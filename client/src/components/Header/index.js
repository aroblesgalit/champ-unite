import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Header() {
    return (
        <header>
            <nav className="uk-navbar-container uk-navbar-transparent uk-light" uk-navbar="true">
                <div className="uk-navbar-left">
                    <Link className="uk-navbar-item uk-logo" to="/">ChampUnite</Link>
                    <ul className="uk-navbar-nav">
                        <li><Link to="">Ranking</Link></li>
                        <li><Link to="">Users</Link></li>
                        <li><Link to="">Champions</Link></li>
                    </ul>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;