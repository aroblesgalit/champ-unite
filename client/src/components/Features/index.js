import React from "react";
import "./style.css";
import searchFeature from "../../images/search-feature.png";
import createFeature from "../../images/create-feature.png";
import selectFeature from "../../images/select-feature.png";
import battleFeature from "../../images/battle-feature.png";
import rankingFeature from "../../images/ranking-feature.png";
import usersFeature from "../../images/users-feature.png";
import FeatureCard from "../FeatureCard";

function Features() {

    const features = [
        {
            title: "Search Champions",
            description: "Use the search feature to search for your favorite superheroes/champions from a list of over 700.",
            img: searchFeature
        },
        {
            title: "Create a Champion",
            description: "Can't find your favorite champion? Create one! Just need a name and an image url. Then test your luck and roll the dice for the attack and defense!",
            img: createFeature
        },
        {
            title: "Search Users",
            description: "Browse through the Users page and check out other users and their champions. Go to their profile or battle their champions.",
            img: usersFeature
        },
        {
            title: "Select a Champion for Battle",
            description: "You have the option to select one of your champions to go into battle with.",
            img: selectFeature
        },
        {
            title: "Battle Users",
            description: "Watch as you do a one-on-one battle against another user's champion. This is automatic and the champions take turns attacking one another. We take the attacker's Attack value, randomize a value from 1 up to the champion's Defense value in defense mode, and calculate the difference for the health damage.",
            img: battleFeature
        },
        {
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
                    features.map((feature, index) => {
                        return (
                            <FeatureCard 
                                key={index}
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