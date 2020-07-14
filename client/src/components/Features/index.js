import React from "react";
import "./style.css";
import searchFeature from "../../images/search-feature.png";
import createFeature from "../../images/create-feature.png";
import selectFeature from "../../images/select-feature.png";
import battleFeature from "../../images/battle-feature.png";
import rankingFeature from "../../images/ranking-feature.png";
import FeatureCard from "../FeatureCard";

function Features() {

    const features = [
        {
            id: 1,
            title: "Search Champions",
            description: "Use the search feature to search for your favorite superheroes/champions from a list of over 700.",
            img: searchFeature
        },
        {
            id: 2,
            title: "Create a Champion",
            description: "You have the freedom to create your own champion. Just need a name and an image url. The powerstats will be randomly generated so test your luck! The attack and defense will be calculated based on the powerstats.",
            img: createFeature
        },
        {
            id: 3,
            title: "Select a Champion for Battle",
            description: "Select a user to battle from the Users Search page and then select one of your champions to go into battle.",
            img: selectFeature
        },
        {
            id: 4,
            title: "Battle Users",
            description: "Watch as you do a one-on-one battle against another user's champion. This is automatic and the champions take turns attacking one another. We take the attacker's Attack value, randomize a value from 1 up to the champion's Defense value in defense mode, and calculate the difference for the health damage.",
            img: battleFeature
        },
        {
            id: 5,
            title: "Make the Ranking",
            description: "Battle at least 20 times to get on the ranking with the bests.",
            img: rankingFeature
        }
    ];

    return (
        <section className="features-container uk-section uk-flex uk-flex-column uk-flex-middle">
            <h2>Features</h2>
            <div className="uk-margin-top">
                {
                    features.map(feature => {
                        return (
                            <FeatureCard 
                                key={feature.id}
                                title={feature.title}
                                description={feature.description}
                                img={feature.img}
                            />
                        )
                    })
                }
            </div>
        </section>
    );
}

export default Features;