import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import "./pages.css";

function Homepage() {
    return (
        <div className="home-container">
            <Hero />
            <About />
            <Features />
        </div>
    );
}

export default Homepage;