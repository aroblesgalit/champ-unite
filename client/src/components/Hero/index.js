import React from "react";
import "./style.css";

function Hero() {
    return (
        <div className="home-hero uk-inline uk-background-fixed uk-background-center-center uk-height-large uk-flex uk-flex-top uk-width-expand">
            <div className="hero-overlay uk-position-cover"></div>
            <div className="hero-text uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical">
                <h1 uk-parallax="opacity: 0,1; y: -100,0; scale: 2,1; viewport: 0.5;">ChampUnite</h1>
                <p uk-parallax="opacity: 0,1; y: 100,0; scale: 0.5,1; viewport: 0.5;">
                    Create your champion(s) now and battle against other users on a one-to-one match.
                </p>
                <button className="uk-button uk-button-primary" uk-parallax="opacity: 0,1; y: -200,0; scale: 0.5,1; viewport: 0.5;">Sign up</button>
            </div>
        </div>
    );
}

export default Hero;