import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import "./pages.css";

function Homepage() {
    return (
        <div className="home-container">
            <Hero />
            <Features />
        </div>
    );
}

export default Homepage;