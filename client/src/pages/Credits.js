import React from "react";
import "./pages.css";

function Credits() {
    return (
        <div className="home-container uk-background-cover uk-flex uk-flex-column uk-flex-middle">
            <h2 className="uk-margin-top">Credits</h2>
            <div className="uk-flex uk-flex-column uk-flex-middle">
                <a className="uk-text-small" href="https://superheroapi.com/index.html" target="_blank" rel="noopener noreferrer">Superhero API</a>
                <a className="uk-text-small" href="https://www.freepik.com/free-photos-vectors/sport" target="_blank" rel="noopener noreferrer">Battle page background created by starline</a>
                <a className="uk-text-small" href="https://www.freepik.com/free-photos-vectors/gold" target="_blank" rel="noopener noreferrer">Gold vector created by freepik</a>
                <a className="uk-text-small" href="https://freesound.org/people/theojt/sounds/510953/" target="_blank" rel="noopener noreferrer">Cinematic Battle Song by theojt</a>
                <a className="uk-text-small" href="https://freesound.org/people/qubodup/sounds/442903/" target="_blank" rel="noopener noreferrer">Slash sound by qubodup</a>
            </div>
        </div>
    );
}

export default Credits;