import React from "react";
import HealthBar from "../components/HealthBar";
import ChampionCard from "../components/ChampionCard";

function Battle() {
    return (
        <section className="battle-container uk-flex uk-flex-column uk-flex-middle">
            <h2>BATTLE</h2>
            <div className="uk-flex uk-flex-middle uk-flex-between uk-width-expand">
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <HealthBar type="user" />
                    <ChampionCard />
                    <span className="battle-user-name">Username</span>
                </div>
                <div className="battle-vs">
                    <span>VS</span>
                </div>
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <HealthBar type="otherUser" />
                    <ChampionCard />
                    <span className="battle-user-name">Username</span>
                </div>
            </div>
            <button className="uk-button primary-btn">Start</button>
        </section>
    );
}

export default Battle;