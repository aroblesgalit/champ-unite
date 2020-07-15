import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import ChampionCard from "../ChampionCard";
import { UserConsumer } from "../../utils/UserContext";

function UserCard(props) {

    const [user, setUser] = useState({});
    const [userChampions, setUserChampions] = useState([]);
    const [otherChampions, setOtherChampions] = useState([]);
    const [otherChampionId, setOtherChampionId] = useState(props.champions[0]);
    const [pageLoaded, setPageLoaded] = useState(false);

    const [championSelected, setChampionSelected] = useState({
        selected: false,
        championId: ""
    });

    useEffect(() => {
        chooseOtherChampion();
        getOtherChampions();
        // getUserChampions();
        API.getUserData()
            .then(user => {
                // console.log(user.data);
                setUser({
                    isLoggedIn: true,
                    champions: user.data.champions
                });

                // Get user's champions
                if (user.data.champions && user.data.champions.length > 0) {
                    // console.log("getUserChampions() is running...this is in the if statement...printing user.champions: ", user.champions);
                    const newArr = [];
                    for (let i = 0; i < user.data.champions.length; i++) {
                        // console.log("getUserChampions() is running...this is in the for-loop...printing user.champions[i]: ", user.champions[i]);
                        API.getChampionById(user.data.champions[i])
                            .then(res => {
                                // res.data is the champion object
                                newArr.push(res.data);
                                setUserChampions(newArr);
                                // console.log("getChampionById() running from useEffect...printing newArr...", newArr);
                            })
                            .catch(err => {
                                console.log("Something went wrong while fetching the user's champions from useEffect...", err);
                            })
                        // console.log("newArr: ", newArr)
                    }
                }
            })
            .catch(err => {
                console.log(err);
                setUser({
                    isLoggedIn: false
                })
            });
    }, []);

    function handleSelect(id) {
        setChampionSelected({
            selected: true,
            championId: id
        });
        // console.log("handleSelect ran...printing id of clicked champion...", id);
    }

    function handleBattle(id1, id2) {
        // if (!id1 || !id2 || !userId || !otherId) {
        //     window.location.replace(`/battle/${userId}/vs/${otherId}`);
        // } else {
        window.location.replace(`/battle/${id1}/vs/${id2}`);
        // }
    }

    // function handleModal() {
    //     chooseOtherChampion();
    //     // Get other users's champion and select an ID to use for the window.locaiton.replace
    // }

    // async function getUserChampions() {
    //     if (user.champions && user.champions.length > 0) {
    //         // console.log("getUserChampions() is running...this is in the if statement...printing user.champions: ", user.champions);
    //         const newArr = [];
    //         for (let i = 0; i < user.champions.length; i++) {
    //             // console.log("getUserChampions() is running...this is in the for-loop...printing user.champions[i]: ", user.champions[i]);
    //             let res = await API.getChampionById(user.champions[i])
    //             // res.data is the champion object
    //             newArr.push(res.data);
    //             // console.log("newArr: ", newArr)
    //         }
    //         setUserChampions(newArr);
    //     }
    // }

    async function getOtherChampions() {
        if (props.champions && props.champions.length > 0) {
            // console.log("getOtherChampions() is running...this is the if statement...printing props.champions: ", props.champions);
            const newArr = [];
            for (let i = 0; i < props.champions.length; i++) {
                // console.log("getOtherChampions() is running...this is in the for-loop...printing props.champions[i]: ", props.champions[i]);
                let res = await API.getChampionById(props.champions[i]);
                newArr.push(res.data);
            }
            setOtherChampions(newArr);
            setPageLoaded(true);
            // console.log("getOtherChampions() is running...printing newArr...", newArr);
        }
    }

    function chooseOtherChampion() {
        if (props.champions && props.champions.length > 0) {
            const champIndex = Math.floor(Math.random() * props.champions.length);
            // console.log("chooseOtherChampion ran...printing user and champion id...", props.username, props.champions[champIndex]);
            setOtherChampionId(props.champions[champIndex]);
        }
    }

    return (
        <div className="user-card uk-card">
            <div className="user-info uk-flex">
                <div className="user-image uk-flex uk-flex-center uk-flex-middle uk-margin-small-right">
                    <img className="uk-border-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
                </div>
                <div className="uk-flex uk-flex-column">
                    <h3>{props.displayName}</h3>
                    <div className="uk-flex">
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{props.rank}</p>
                            <p className="stat-label">R</p>
                        </div>
                        <hr className="uk-divider-vertical uk-margin-small-left uk-margin-small-right" />
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{props.wins}</p>
                            <p className="stat-label">W</p>
                        </div>
                        <hr className="uk-divider-vertical uk-margin-small-left uk-margin-small-right" />
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{props.losses}</p>
                            <p className="stat-label">L</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="uk-flex uk-flex-around uk-margin-top">
                {
                    otherChampions && otherChampions.length > 0 ? (
                        otherChampions.map(champion => {
                            return <div key={champion._id} className="user-card-champion-image" uk-tooltip={champion.name}>
                                <img src={champion.image} alt={champion.name} />
                            </div>
                        })
                    ) : "No Champions"
                }
            </div>
            <div className={user.isLoggedIn ? "user-card-links uk-flex uk-flex-between" : "user-card-links uk-flex uk-flex-center"} >
                <Link to={`/profile/${props.username}`} className="uk-button secondary-btn">Profile</Link>
                {
                    user.isLoggedIn && props.champions && props.champions.length > 0 && user.champions.length > 0 && pageLoaded ? (
                        <button uk-toggle="target: #user-champions-modal" className="uk-button secondary-btn">Battle</button>
                    ) : ""
                }
            </div>
            <UserConsumer>
                {
                    value => {
                        console.log("Console logging value.champions...", value.champions)
                        return (
                            <div id="user-champions-modal" uk-modal="true">
                                <div className="user-champions-modal-wrapper uk-modal-dialog">
                                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                                    <div className="uk-modal-header">
                                        <h2 className="uk-modal-title">My Champions</h2>
                                        <p>Select one of your champions to go into battle.</p>
                                    </div>
                                    <div className="uk-modal-body uk-flex uk-width-1-1">
                                        {
                                            value.champions && value.champions.length > 0 ? (
                                                value.champions.map(champion => {
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
                                                        handleSelect={() => value.handleSelect(champion._id)}
                                                        selected={value.championSelected}
                                                        selectedId={value.selectedId}
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
                                            onClick={() => handleBattle(value.selectedId, otherChampionId)}
                                        >
                                            Battle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        </div>
    );
}

export default UserCard;