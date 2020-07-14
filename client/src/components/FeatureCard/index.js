import React from "react";
import "./featureCard.css";

function FeatureCard({ title, description, img }) {
    return (
        <div className="uk-child-width-expand@s uk-text-left@s uk-text-center" uk-grid="true">
            <dv className="feature-img uk-width-1-3@m uk-width-1-2@s">
                <img src={img} alt={title} uk-img="true" />
            </dv>
            <div className="feature-text uk-flex uk-flex-column">
                <h4>{title}</h4>
                <p className="uk-margin-remove-top">{description}</p>
            </div>
        </div>
    )
}

export default FeatureCard;