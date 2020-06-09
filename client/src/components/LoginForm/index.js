import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function LoginForm() {

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [loginFailed, setLoginFailed] = useState(false);

    function handleAlertClose() {
        setTimeout(() => {
            setLoginFailed(false);
        }, 3000);
    };

    function handleLogin(e) {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        API.loginUser({
            username: username,
            password: password
        })
            .then(function (res) {
                window.location.replace("/profile");
                // console.log("Login successful! Printing res...", res);
                console.log("You are now logged in.");
            })
            .catch(function (err) {
                console.log("Something went wrong during login...", err);
                setLoginFailed(true);
            });

        handleAlertClose();
    }

    return (
        <form className="login-form uk-flex uk-flex-column uk-flex-middle uk-height-1-1">
            <h2>Login</h2>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" placeholder="champion201" ref={usernameRef} />
                </div>
            </div>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" placeholder="******" ref={passwordRef} />
                </div>
            </div>
            {loginFailed ? (
                <p className="uk-text-small uk-text-danger uk-margin-remove uk-padding-remove uk-text-right">Login failed.</p>
            ) : ""}
            <div className="uk-margin-small">
                <button className="uk-button primary-btn" type="submit" onClick={handleLogin}>Log in</button>
            </div>
            <p className="signup-login-text">
                Don't have an account? <Link to="/signup"><span>Sign up here now.</span></Link>
            </p>
        </form>
    );
}

export default LoginForm;