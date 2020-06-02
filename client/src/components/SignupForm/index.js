import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function SignupForm() {
    return (
        <form className="signup-form uk-flex uk-flex-column uk-flex-middle uk-height-1-1">
            <h2>Signup</h2>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: mail"></span>
                    <input className="uk-input" type="text" placeholder="champion201@email.com" />
                </div>
            </div>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" placeholder="champion201" />
                </div>
            </div>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" placeholder="******" />
                </div>
            </div>
            <div className="uk-margin-small">
                <button className="uk-button primary-btn">Sign up</button>
            </div>
            <p className="signup-login-text">
                Already have an account? <Link to="/login"><span>Log in here now.</span></Link>
            </p>
        </form>
    );
}

export default SignupForm;