import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function SignupForm() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    // const emailRef = useRef();
    const confirmPasswordRef = useRef();

    const [signupFailed, setSignupFailed] = useState(false);
    const [missingFields, setMissingFields] = useState(false);
    const [passNotMatch, setPassNotMatch] = useState(false);
    const [shortPass, setShortPass] = useState(false);

    function handleSignup(e) {
        e.preventDefault();

        const displayName = usernameRef.current.value;
        const username = displayName.toLowerCase();
        // const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (username && password && confirmPassword) {
            if (password.length >= 6) {
                if (password === confirmPassword) {
                    API.signupUser({
                        displayName: displayName,
                        username: username,
                        password: password
                        // email: email
                    })
                        .then(function (res) {
                            console.log("User is signed up...", res);
                            window.location.replace("/profile");
                        })
                        .catch(function (err) {
                            console.log("Failed signup...", err);
                            setSignupFailed(true);
                        });
                } else {
                    setPassNotMatch(true);
                }
            } else {
                setShortPass(true);
            }
        } else {
            setMissingFields(true);
        }
        handleAlertClose();
    };

    function handleAlertClose() {
        setTimeout(() => {
            setSignupFailed(false);
            setMissingFields(false);
            setPassNotMatch(false);
            setShortPass(false);
        }, 3000);
    };

    return (
        <form className="signup-form uk-flex uk-flex-column uk-flex-middle uk-height-1-1">
            <h2>Signup</h2>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" placeholder="champion201" ref={usernameRef} />
                </div>
                {signupFailed ? (
                        <p className="uk-text-small uk-text-danger uk-margin-remove uk-padding-remove uk-text-right">Username is taken.</p>
                ) : ""}
            </div>
            {
                // <div className="uk-margin-small uk-width-expand">
                //     <div className="uk-inline uk-width-expand">
                //         <span className="uk-form-icon" uk-icon="icon: mail"></span>
                //         <input className="uk-input" type="text" placeholder="champion201@email.com" ref={emailRef} />
                //     </div>
                // </div>
            }
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" placeholder="password" ref={passwordRef} />
                </div>
                {shortPass ? (
                    <p className="uk-text-small uk-text-danger uk-margin-remove uk-padding-remove uk-text-right">Password too short.</p>
                ) : ""}
            </div>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" placeholder="confirm password" ref={confirmPasswordRef} />
                </div>
                {passNotMatch ? (
                    <p className="uk-text-small uk-text-danger uk-margin-remove uk-padding-remove uk-text-right">Password doesn't match.</p>
                ) : ""}
            </div>
            {missingFields ? (
                <p className="uk-text-small uk-text-danger uk-margin-remove uk-padding-remove uk-text-right">Empty field(s).</p>
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