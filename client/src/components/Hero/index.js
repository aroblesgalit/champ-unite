import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Hero() {
    return (
        <div className="home-hero uk-inline uk-background-fixed uk-background-center uk-height-large uk-flex uk-flex-top uk-width-expand">
            <div className="hero-overlay uk-position-cover"></div>
            <div className="hero-text uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical">
                <h1>ChampUnite</h1>
                <p>
                    Create your champion(s) now and battle against other users on a one-one-one match.
                </p>
                <Link to="/signup" className="uk-button primary-btn">Sign up</Link>
            </div>
        </div>
    );
}

export default Hero;