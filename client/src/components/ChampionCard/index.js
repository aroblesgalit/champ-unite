import React, { useContext } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";

function ChampionCard(props) {

    const { loggedIn } = useContext(UserContext);

    function calcBarWidth(a) {
        return a * 1.8;
    }

    return (
        <div className="champion-card uk-card uk-position-relatve">
            {
                props.type === "search" && loggedIn ? (
                    <button className="add-btn uk-icon-button uk-position-absolute" uk-icon="plus"></button>
                ) : ""
            }
            <div className="champion-name-container uk-position-absolute uk-text-center">
                <span className="champion-name">{props.name}</span>
            </div>
            <div className="champion-img-container uk-card-media-top uk-margin-top uk-position-relative">
                <div className="battle-stats-container uk-position-absolute">
                    <div className="battle-stats uk-flex uk-flex-column uk-flex-middle uk-margin-small-bottom">
                        <span className="battle-stats-val">{props.attack}</span><span className="battle-stats-label">ATK</span>
                    </div>
                    <div className="battle-stats uk-flex uk-flex-column uk-flex-middle">
                        <span className="battle-stats-val">{props.defense}</span><span className="battle-stats-label">DEF</span>
                    </div>
                </div>
                <img src={props.image} alt={props.name} />
            </div>
            <div className="uk-card-body">
                <p className="stats-header">STATS</p>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">STR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.strength) + "px" }}></div><span className="stats-val">{props.strength}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">PWR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.power) + "px" }}></div><span className="stats-val">{props.power}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">CBT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.combat) + "px" }}></div><span className="stats-val">{props.combat}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">INT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.intelligence) + "px" }}></div><span className="stats-val">{props.intelligence}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">SPD</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.speed) + "px" }}></div><span className="stats-val">{props.speed}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">DUR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.durability) + "px" }}></div><span className="stats-val">{props.durability}</span></div>
                </div>
            </div>
        </div>
    );
}

export default ChampionCard;