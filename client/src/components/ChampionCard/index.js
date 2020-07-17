import React, { useContext } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";

function ChampionCard(props) {

    // Get value for loggedIn and event handlers for deleting and adding a champion
    const { loggedIn, handleDelete, handleAdd } = useContext(UserContext);

    // Calculate width of bar for the stats
    function calcBarWidth(a) {
        return a * .8;
    };

    return (
        <div className="champion-card uk-card uk-position-relatve" style={props.selected && props.selectedId === props.id ? { border: "2px solid #221D54" } : { border: "" }} >
            {
                props.type === "search" && loggedIn ? (
                    <button
                        className="add-btn uk-icon-button uk-position-absolute"
                        uk-icon="plus"
                        onClick={() => handleAdd({
                            name: props.name,
                            image: props.image,
                            strength: props.strength,
                            power: props.power,
                            combat: props.combat,
                            intelligence: props.intelligence,
                            speed: props.speed,
                            durability: props.durability,
                            attack: props.attack,
                            defense: props.defense,
                            nullStats: props.nullStats
                        })}
                    >
                    </button>
                ) : ""
            }
            {
                props.type === "user" && loggedIn ? (
                    <button className="delete-btn uk-icon-button uk-position-absolute" uk-icon="close" onClick={() => handleDelete(props.id)}></button>
                ) : ""
            }
            {
                props.type === "battle" && loggedIn ? (
                    <button className="select-btn uk-icon-button uk-position-absolute" uk-icon="check" onClick={props.handleSelect}></button>
                ) : ""
            }
            <div className="champion-name-container uk-position-absolute uk-text-center" style={props.selected && props.selectedId === props.id ? { border: "1px solid #221D54" } : { border: "" }} >
                <span className="champion-name" >{props.name}</span>
            </div>
            <div className="champion-img-container uk-card-media-top uk-margin-top uk-position-relative uk-flex uk-flex-center uk-flex-top">
                <div className="battle-stats-container uk-position-absolute">
                    <div className="battle-stats battle-stats-atk uk-flex uk-flex-column uk-flex-middle uk-margin-small-bottom">
                        <span className="battle-stats-val">{props.attack}</span><span className="battle-stats-label">ATK</span>
                    </div>
                    <div className="battle-stats battle-stats-def uk-flex uk-flex-column uk-flex-middle">
                        <span className="battle-stats-val">{props.defense}</span><span className="battle-stats-label">DEF</span>
                    </div>
                </div>
                <img src={props.image} alt={props.name} />
            </div>
            <div className="uk-card-body">
                <p className="stats-header uk-flex uk-flex-middle">STATS {props.nullStats ? (<span className="null-icon" uk-icon="icon: ban; ratio: .8;" uk-tooltip="title: Stats are randomized on add.; pos: right"></span>) : ""}
                </p>
                <div className="stat-row uk-flex uk-flex-middle">
                    <span className="stats-label">STR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.strength) + "%" }}></div><span className="stats-val">{props.strength}</span></div>
                </div>
                <div className="stat-row uk-flex uk-flex-middle">
                    <span className="stats-label">PWR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.power) + "%" }}></div><span className="stats-val">{props.power}</span></div>
                </div>
                <div className="stat-row uk-flex uk-flex-middle">
                    <span className="stats-label">CBT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.combat) + "%" }}></div><span className="stats-val">{props.combat}</span></div>
                </div>
                <div className="stat-row uk-flex uk-flex-middle">
                    <span className="stats-label">INT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.intelligence) + "%" }}></div><span className="stats-val">{props.intelligence}</span></div>
                </div>
                <div className="stat-row uk-flex uk-flex-middle">
                    <span className="stats-label">SPD</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.speed) + "%" }}></div><span className="stats-val">{props.speed}</span></div>
                </div>
                <div className="stat-row uk-flex uk-flex-middle">
                    <span className="stats-label">DUR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{ width: calcBarWidth(props.durability) + "%" }}></div><span className="stats-val">{props.durability}</span></div>
                </div>
            </div>
        </div>
    );
}

export default ChampionCard;