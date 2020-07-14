import React from "react";
import "./style.css";
import battleScene from "../../images/battle-scene.gif";

function Hero() {
    return (
        <div className="home-hero uk-width-expand uk-flex uk-flex-center">
            <img src={battleScene} alt="Battle scene." />
        </div>
    );
}

export default Hero;