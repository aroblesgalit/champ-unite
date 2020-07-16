import React, { useState, useContext } from "react";
import "./style.css";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";

function ChampionCard(props) {

    const { loggedIn, info, handleDelete } = useContext(UserContext);

    const [maxReached, setMaxReached] = useState(false);
    const [championAdded, setChampionAdded] = useState(false);

    function calcBarWidth(a) {
        return a * .8;
    }

    async function handleAdd() {
        try {
            if (info.champions.length < 3) {
                setChampionAdded(true);
                // console.log("Running conditional champions.length < 3...", champions.length);
                if (props.nullStats) {
                    // Function to calculate attack and defense based on powerstats
                    function calcBattleStat(a, b, c) {
                        return ((a + b + c) / 30).toFixed();
                    }
                    // Function to generate a random value from 1 - 100
                    function generateStat() {
                        return Math.floor((Math.random() * 100) + 1);
                    }
                    // Store relevant data
                    const strength = generateStat();
                    const power = generateStat();
                    const combat = generateStat();
                    const intelligence = generateStat();
                    const speed = generateStat();
                    const durability = generateStat();
                    // Calculate attack and defense
                    const attack = calcBattleStat(strength, power, combat);
                    const defense = calcBattleStat(intelligence, speed, durability);

                    const newUserChampion = await API.addChampion({
                        user: info.id,
                        name: props.name,
                        image: props.image,
                        strength: strength,
                        power: power,
                        combat: combat,
                        intelligence: intelligence,
                        speed: speed,
                        durability: durability,
                        attack: attack,
                        defense: defense,
                        nullStats: props.nullStats
                    })
                    // Update user's champions array
                    await API.updateUserChampions(info.id, newUserChampion.data._id);
                    window.location.reload(false);
                } else {
                    const newUserChampion = await API.addChampion({
                        user: info.id,
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
                    })
                    // Update user's champions array
                    await API.updateUserChampions(info.id, newUserChampion.data._id);
                    window.location.reload(false);
                }

            } else {
                console.log("You've reached the max number of champions on your list! Please make room if you'd like to add another.");
                setMaxReached(true);
                // After 3 seconds, setMaxReached backto false to close the alert
                setTimeout(function () {
                    setMaxReached(false);
                }, 4000);
            }
        } catch (err) {
            console.log("Add failed: ", err)
        }
    }

    // function handleDelete() {
    //     API.removeChampion(props.id)
    //         .then(res => {
    //             console.log(res);
    //             window.location.reload(false);
    //         })
    //         .catch(err => console.log(err));
    //     // Remove from champions list in User model
    //     API.removeChampionFromUser(info.id, props.id)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // }

    return (
        <div className="champion-card uk-card uk-position-relatve" style={props.selected && props.selectedId === props.id ? { border: "2px solid #221D54" } : { border: "" }} >
            {
                maxReached ? (
                    <div className="max-reached-alert uk-alert-danger uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                        <p>You've reached the max of 3 champions! Please make room if you'd like to add another.</p>
                    </div>
                ) : ""
            }
            {
                championAdded ? (
                    <div className="champion-added-alert uk-alert-success uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                        <p>{props.name} successfuly added to your list!</p>
                    </div>
                ) : ""
            }
            {
                props.type === "search" && loggedIn ? (
                    <button className="add-btn uk-icon-button uk-position-absolute" uk-icon="plus" onClick={handleAdd}></button>
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