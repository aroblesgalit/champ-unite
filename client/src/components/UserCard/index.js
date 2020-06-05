import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function UserCard(props) {

    const [user, setUser] = useState({});

    const [otherUserChampion, setOtherUserChampion] = useState({});

    useEffect(() => {
        API.getUserData()
            .then(user => {
                // console.log(user.data);
                setUser({
                    isLoggedIn: true,
                    champions: user.data.champions
                });
                if (props.champions && props.champions.length > 0) {
                    console.log("useEffect running in UserCard...printing props.champions[0]", props.champions[0]);
                    setOtherUserChampion(props.champions[0]);
                }
            })
            .catch(err => {
                console.log(err);
                setUser({
                    isLoggedIn: false
                })
            });
    }, [setUser, setOtherUserChampion]);

    function handleBattle(e, opponent) {
        e.preventDefault();

        window.location.replace(`/battle/${user.champions[0]}/vs/${opponent}`);
    };

    return (
        <div className="user-card uk-card">
            <div className="user-info uk-flex">
                <div className="user-image uk-flex uk-flex-center uk-flex-middle uk-margin-small-right">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
                </div>
                <div className="uk-flex uk-flex-column">
                    <h3>{props.username}</h3>
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
            <div className={user.isLoggedIn ? "user-card-links uk-flex uk-flex-between" : "user-card-links uk-flex uk-flex-center"} >
                <Link to={`/profile/${props.username}`} className="uk-button secondary-btn">Profile</Link>
                {
                    user.isLoggedIn && props.champions && props.champions.length > 0 && user.champions.length > 0 ? (
                        <button uk-toggle="target: #modal-overflow" className="uk-button secondary-btn">Battle</button>
                    ) : ""
                }
            </div>

            <div id="modal-overflow" uk-modal="true">
                <div className="uk-modal-dialog">
                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title">My Champions</h2>
                    </div>
                    <div className="uk-modal-body" uk-overflow-auto="true">
                        <p>Select one of your champions to go into battle.</p>
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button secondary-btn uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                        <button className="uk-button secondary-btn" type="button" onClick={(e, opponent) => handleBattle(e, otherUserChampion)}>Battle</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;