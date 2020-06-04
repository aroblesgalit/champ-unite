import React from "react";
import HealthBar from "../components/HealthBar";

function Battle() {
    return (
        <section className="battle-container uk-flex uk-flex-column uk-flex-middle">
            <h2>BATTLE</h2>
            <div className="uk-flex uk-flex-middle uk-flex-between uk-width-expand">
                <HealthBar type="user" />
                <HealthBar type="otherUser" />
            </div>
        </section>
    );
}

export default Battle;