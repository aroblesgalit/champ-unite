import React, { useEffect, useState } from "react";
import "./style.css";
// import { Link } from "react-router-dom";
import API from "../../utils/API";
import ChampionCard from "../ChampionCard";

function ProfileHeader(props) {

    const [user, setUser] = useState({});
    const [userChampions, setUserChampions] = useState([]);
    const [userChampionId, setUserChampionId] = useState("");
    const [otherChampionId, setOtherChampionId] = useState("");

    const [championSelected, setChampionSelected] = useState({
        selected: false,
        championId: ""
    });

    useEffect(() => {
        API.getUserData()
            .then(user => {
                setUser({
                    isLoggedIn: true,
                    champions: user.data.champions
                });
            })
            .catch(err => {
                setUser({
                    isLoggedIn: false
                });
            })
    }, []);

    function handleModal() {
        getUserChampions();
        chooseOtherChampion();
        // Get other users's champion and select an ID to use for the window.locaiton.replace
    }

    function handleBattle() {
        if (!userChampionId) {
            window.location.replace(`/battle/${user.champions[0]}/vs/${otherChampionId}`);
        } else {
            window.location.replace(`/battle/${userChampionId}/vs/${otherChampionId}`);
        }
    }

    function chooseOtherChampion() {
        if (props.champions && props.champions.length > 1) {
            const champId = Math.floor(Math.random() * props.champions.length);
            // console.log("chooseOtherChampion ran...", champId);
            setOtherChampionId(props.champions[champId]);
        } else {
            setOtherChampionId(props.champions[0]);
        }
    }

    async function getUserChampions() {
        if (user.champions && user.champions.length > 0) {
            const newArr = [];
            for (let i = 0; i < user.champions.length; i++) {
                let res = await API.getChampionById(user.champions[i])
                // res.data is the champion object
                newArr.push(res.data);
            }
            setUserChampions(newArr);
        }
    }

    function handleSelect(id) {
        setUserChampionId(id)
        // console.log("handleSelect ran...printing id of clicked champion...", id);
        setChampionSelected({
            selected: true,
            championId: id
        });
    }

    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right">
                <img className="uk-border-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
            </div>
            <div className="uk-flex uk-flex-bottom">
                <div className="uk-flex uk-flex-column uk-margin-large-right">
                    <h2>{props.displayName}</h2>
                    <div className="uk-flex">
                        <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                            <span className="stat-val">{props.rank}</span>
                            <span className="stat-label">Rank</span>
                        </div>
                        <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                            <span className="stat-val">{props.wins}</span>
                            <span className="stat-label">Wins</span>
                        </div>
                        <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                            <span className="stat-val">{props.losses}</span>
                            <span className="stat-label">Losses</span>
                        </div>
                    </div>
                </div>
                {
                    props.type === "otherUser" && props.champions && user.champions && user.champions.length > 0 && props.champions.length > 0 ? (
                        // <Link to="#" className="uk-button secondary-btn" onClick={handleBattle}>Battle</Link>
                        <button uk-toggle="target: #user-champions-modal" className="uk-button secondary-btn" onClick={handleModal}>Battle</button>
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
                            userChampions && userChampions.length > 0 ? (
                                userChampions.map(champion => {
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
                        <button className="uk-button secondary-btn" type="button" onClick={handleBattle}>Battle</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileHeader;