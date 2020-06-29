import React from "react";
import "./pages.css";

function Credits() {
    return (
        <div className="home-container uk-background-cover uk-flex uk-flex-column uk-flex-middle">
            <h2 className="uk-margin-top">Credits</h2>
            <div className="uk-flex uk-flex-column uk-flex-middle">
                <a className="uk-text-small" href="https://superheroapi.com/index.html">Superhero API</a>
                <a className="uk-text-small" href="https://www.freepik.com/free-photos-vectors/sport">Battle page background created by starline</a>
                <a className="uk-text-small" href="https://freesound.org/people/theojt/sounds/510953/">Cinematic Battle Song by theojt</a>
                <a className="uk-text-small" href="https://freesound.org/people/qubodup/sounds/442903/">Slash sound by qubodup</a>
            </div>
        </div>
    );
}

export default Credits;