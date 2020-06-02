import React from "react";
import SignupForm from "../components/SignupForm";
import "./pages.css";

function Signup() {
    return (
        <div className="signup-container uk-background-cover uk-flex uk-flex-center">
            <SignupForm />
        </div>
    );
}

export default Signup;