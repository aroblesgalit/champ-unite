import React from "react";
import LoginForm from "../components/LoginForm";
import "./pages.css";

function Login() {
    return (
        <div className="login-container uk-background-cover uk-flex uk-flex-center">
            <LoginForm />
        </div>
    );
}

export default Login;