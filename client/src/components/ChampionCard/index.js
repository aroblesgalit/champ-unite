import React from "react";
import "./style.css";

function ChampionCard(props) {

    function calcBarWidth(a) {
        return a * 1.8;
    }

    return (
        <div className="champion-card uk-card uk-position-relatve">
            {
                props.type === "search" ? (
                    <button className="add-btn uk-icon-button uk-position-absolute" uk-icon="plus"></button>
                ) : ""
            }
            <div className="champion-name-container uk-position-absolute uk-text-center">
                <span className="champion-name">{props.name}</span>
            </div>
            <div className="champion-img-container uk-card-media-top uk-margin-top">
                <img src={props.imageUrl} alt={props.name} />
            </div>
            <div className="uk-card-body">
                <p className="stats-header">STATS</p>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">STR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.str) + "px"}}></div><span className="stats-val">{props.str}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">PWR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.pwr) + "px"}}></div><span className="stats-val">{props.pwr}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">CBT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.cbt) + "px"}}></div><span className="stats-val">{props.cbt}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">INT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.int) + "px"}}></div><span className="stats-val">{props.int}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">SPD</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.spd) + "px"}}></div><span className="stats-val">{props.spd}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">DUR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.dur) + "px"}}></div><span className="stats-val">{props.dur}</span></div>
                </div>
            </div>
        </div>
    );
}

export default ChampionCard;