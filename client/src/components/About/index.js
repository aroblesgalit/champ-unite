import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

function About() {
    return (
        <section className="about-section uk-flex uk-flex-middle">
            <div className="hero-text uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical">
                <h1>ChampUnite</h1>
                <p>
                    Create your champion(s) now and test your luck on a one-on-one match against other champions.
                </p>
                <Link to="/signup" className="uk-button primary-btn">Sign up</Link>
            </div>
        </section>
    )
}

export default About;