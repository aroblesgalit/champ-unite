import React from "react";
import "./style.css";

function Footer() {
    return (
        <footer className="uk-height-small uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-width-expand uk-light">
            <div className="social-links uk-flex uk-flex-between">
                <a href="https://github.com/aroblesgalit" target="_blank" rel="noopener noreferrer"><span uk-icon="icon: github" className="uk-icon"></span></a>
                <a href="https://www.linkedin.com/in/aroblesgalit/" target="_blank" rel="noopener noreferrer"><span uk-icon="icon: linkedin" className="uk-icon"></span></a>
            </div>
            <p className="uk-text-small">© 2020 Alvin Galit</p>
        </footer>
    );
}

export default Footer;