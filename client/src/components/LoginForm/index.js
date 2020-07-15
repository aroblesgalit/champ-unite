import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { UserConsumer } from "../../utils/UserContext";

function LoginForm() {

    const usernameRef = useRef();
    const passwordRef = useRef();

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
            <UserConsumer>
                {
                    value => {
                        return (
                            <React.Fragment>
                                {
                                    value.loginFailed ? (
                                        <p className="uk-text-small uk-text-danger uk-margin-remove uk-padding-remove uk-text-right">Login failed.</p>
                                    ) : ""
                                }
                                <div className="uk-margin-small">
                                    <button className="uk-button primary-btn" type="submit" onClick={(e) => value.handleLogin(e, usernameRef.current.value.toLowerCase(), passwordRef.current.value)}>Log in</button>
                                </div>
                                <p className="signup-login-text">
                                    Don't have an account? <Link to="/signup"><span>Sign up here now.</span></Link>
                                </p>
                            </React.Fragment>
                        )
                    }
                }
            </UserConsumer>

        </form>
    );
}

export default LoginForm;