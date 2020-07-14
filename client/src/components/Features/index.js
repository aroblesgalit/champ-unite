import React from "react";
import "./style.css";
import searchFeature from "../../images/search-feature.png";
import createFeature from "../../images/create-feature.png";
import selectFeature from "../../images/select-feature.png";
import battleFeature from "../../images/battle-feature.png";
import rankingFeature from "../../images/ranking-feature.png";

function Features() {
    return (
        <section className="features-container uk-section uk-flex uk-flex-column uk-flex-middle">
            <h2>Features</h2>
            <div className="uk-margin-top">
                <div className="uk-child-width-expand@s uk-text-left@s uk-text-center" uk-grid="true">
                    <img className="feature-img uk-width-1-3@m uk-width-1-2@s" src={searchFeature} alt="Search feature" uk-img="true" />
                    <div className="feature-text uk-flex uk-flex-column">
                        <h4>Search Champions</h4>
                        <p className="uk-margin-remove-top">Use the search feature to search for your 
                        favorite superheroes/champions from a list of over 700.</p>
                    </div>
                </div>
                <div className="uk-child-width-expand@s uk-text-left@s uk-text-center" uk-grid="true">
                    <img className="feature-img uk-width-1-3@m uk-width-1-2@s" src={createFeature} alt="Create feature" uk-img="true" />
                    <div className="feature-text uk-flex uk-flex-column">
                        <h4>Create a Champion</h4>
                        <p className="uk-margin-remove-top">You have the freedom to create your own champion. 
                        Just need a name and an image url. The powerstats will be randomly generated so test your 
                        luck! The attack and defense will be calculated based on the powerstats.</p>
                    </div>
                </div>
                <div className="uk-child-width-expand@s uk-text-left@s uk-text-center" uk-grid="true">
                    <img className="feature-img uk-width-1-3@m uk-width-1-2@s" src={selectFeature} alt="Select feature" uk-img="true" />
                    <div className="feature-text uk-flex uk-flex-column">
                        <h4>Select a Champion for Battle</h4>
                        <p className="uk-margin-remove-top">Select a user to battle from the Users Search page and 
                        then select one of your champions to go into battle.</p>
                    </div>
                </div>
                <div className="uk-child-width-expand@s uk-text-left@s uk-text-center" uk-grid="true">
                    <img className="feature-img uk-width-1-3@m uk-width-1-2@s" src={battleFeature} alt="Battle feature" uk-img="true" />
                    <div className="feature-text uk-flex uk-flex-column">
                        <h4>Battle Users</h4>
                        <p className="uk-margin-remove-top">Watch as you do a one-on-one battle against another user's 
                        champion. This is automatic and the champions take turns attacking one another. We take 
                        the attacker's Attack value, randomize a value from 1 up to the champion's Defense value 
                        in defense mode, and calculate the difference for the health damage.</p>
                    </div>
                </div>
                <div className="uk-child-width-expand@s uk-text-left@s uk-text-center" uk-grid="true">
                    <img className="feature-img uk-width-1-3@m uk-width-1-2@s" src={rankingFeature} alt="Ranking feature" uk-img="true" />
                    <div className="feature-text uk-flex uk-flex-column">
                        <h4>Make the Ranking</h4>
                        <p className="uk-margin-remove-top">Battle at least 20 times to get on the ranking with the bests.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;