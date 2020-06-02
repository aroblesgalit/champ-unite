import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function SignupForm() {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [signupFailed, setSignupFailed] = useState(false);
    const [missingFields, setMissingFields] = useState(false);

    function handleSignup(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (email && username && password) {
            API.signupUser({
                email: email,
                username: username,
                password: password
            })
                .then(function (res) {
                    window.location.replace("/");
                    console.log(res);
                    console.log("User signed up successfully!");
                })
                .catch(function (err) {
                    console.log(err);
                    console.log("Email:", emailRef.current.value, "- Username:", usernameRef.current.value, "- Password:", passwordRef.current.value)
                    console.log("Failed signup.");
                    setSignupFailed(true);
                });
        } else {
            setMissingFields(true);
        }
    };

    function handleAlertClose(err) {
        if (err === "signupFailed") {
            setSignupFailed(false);
        } else if (err === "missingFields") {
            setMissingFields(false);
        }
    };

    return (
        <form className="signup-form uk-flex uk-flex-column uk-flex-middle uk-height-1-1">
            <h2>Signup</h2>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: mail"></span>
                    <input className="uk-input" type="text" placeholder="champion201@email.com" ref={emailRef} />
                </div>
            </div>
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
            {signupFailed ? (
                <div className="uk-alert-danger uk-width-expand uk-text-small" uk-alert="true">
                    <button className="uk-alert-close" uk-close="true" onClick={() => handleAlertClose("signupFailed")}></button>
                    <p>Signup failed. Please try again.</p>
                </div>
            ) : ""}
            {missingFields ? (
                <div className="uk-alert-danger uk-width-expand uk-text-small" uk-alert="true">
                    <button className="uk-alert-close" uk-close="true" onClick={() => handleAlertClose("missingFields")}></button>
                    <p>Please fill in all the fields.</p>
                </div>
            ) : ""}
            <div className="uk-margin-small">
                <button className="uk-button primary-btn" type="submit" onClick={handleSignup}>Sign up</button>
            </div>
            <p className="signup-login-text">
                Already have an account? <Link to="/login"><span>Log in here now.</span></Link>
            </p>
        </form>
    );
}

export default SignupForm;