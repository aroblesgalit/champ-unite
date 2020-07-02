import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import ChampionCard from "../ChampionCard";

function UserCard(props) {

    const { displayName, username, rank, wins, losses, champions, champArr, loggedUser, loggedUserChampions } = props;

    const [championSelected, setChampionSelected] = useState({
        selected: false,
        championId: ""
    });
    const [otherId, setOtherId] = useState("");

    // useEffect(() => {
        
    // }, []);

    // Choose the other user's champion by random
    function chooseOtherChampion(champions) {
        console.log("Battle button clicked...chooseOtherChampion is running...printing champions", champions);
        if (champions.length > 1) {
            const index = Math.floor(Math.random() * champions.length);
            setOtherId(champions[index]);
            console.log("champions.length > 1...printing champion id...", champions[index]);
        } else {
            setOtherId(champions[0]);
            console.log("champions.length = 1...printing champion id...", champions[0]);
        }
        console.log("Battle button clicked...printing otherId...", otherId);
    }

    function handleSelect(id) {
        setChampionSelected({
            selected: true,
            championId: id
        });
    }

    function handleBattle(id1, id2) {
        if (id1) {
            window.location.replace(`/battle/${id1}/vs/${id2}`);
        } else {
            window.location.replace(`/battle/${loggedUser.champions[0]}/vs/${id2}`);
        } 
        // else if (id1) {
        //     window.location.replace(`/battle/${id1}/vs/${props.champions[0]}`);
        // } else {
        //     window.location.replace(`/battle/${user.champions[0]}/vs/${props.champions[0]}`);
        // }
    }

    return (
        <div className="user-card uk-card">
            <div className="user-info uk-flex">
                <div className="user-image uk-flex uk-flex-center uk-flex-middle uk-margin-small-right">
                    <img className="uk-border-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
                </div>
                <div className="uk-flex uk-flex-column">
                    <h3>{displayName}</h3>
                    <div className="uk-flex">
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{rank}</p>
                            <p className="stat-label">R</p>
                        </div>
                        <hr className="uk-divider-vertical uk-margin-small-left uk-margin-small-right" />
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{wins}</p>
                            <p className="stat-label">W</p>
                        </div>
                        <hr className="uk-divider-vertical uk-margin-small-left uk-margin-small-right" />
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{losses}</p>
                            <p className="stat-label">L</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="uk-flex uk-flex-around uk-margin-top">
                {
                    champArr ? (
                        champArr.map(champion => {
                            return <div key={champion._id} className="user-card-champion-image" uk-tooltip={champion.name}>
                                <img src={champion.image} alt={champion.name} />
                            </div>
                        })
                    ) : "No Champions"
                }
            </div>
            <div className={loggedUser.isLoggedIn ? "user-card-links uk-flex uk-flex-between" : "user-card-links uk-flex uk-flex-center"} >
                <Link to={`/profile/${username}`} className="uk-button secondary-btn">Profile</Link>
                {
                    loggedUser.isLoggedIn && champions && loggedUser.champions ? (
                        <button 
                            uk-toggle="target: #user-champions-modal" 
                            className="uk-button secondary-btn"
                            onClick={() => chooseOtherChampion(champions)}
                        >
                            Battle
                        </button>
                    ) : ""
                }
            </div>

            <div id="user-champions-modal" uk-modal="true">
                <div className="user-champions-modal-wrapper uk-modal-dialog">
                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">My Champions</h2>
                        <p>Select one of your champions to go into battle.</p>
                    </div>
                    <div className="uk-modal-body uk-flex uk-width-1-1">
                        {
                            loggedUser.champions && loggedUser.champions.length > 0 ? (
                                loggedUserChampions.map(champion => {
                                    return <ChampionCard
                                        key={champion._id || champion.image}
                                        id={champion._id}
                                        name={champion.name}
                                        image={champion.image}
                                        strength={champion.strength}
                                        power={champion.power}
                                        combat={champion.combat}
                                        intelligence={champion.intelligence}
                                        speed={champion.speed}
                                        durability={champion.durability}
                                        attack={champion.attack}
                                        defense={champion.defense}
                                        type="battle"
                                        handleSelect={() => handleSelect(champion._id)}
                                        selected={championSelected.selected}
                                        selectedId={championSelected.championId}
                                    />
                                })
                            ) : <p>Search for Champions to add or create your own!</p>
                        }
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button secondary-btn uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                        <button
                            className="uk-button secondary-btn"
                            type="button"
                            onClick={() => handleBattle(championSelected.championId, otherId)}
                        >
                            Battle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;