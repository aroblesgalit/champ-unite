import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function UserCard(props) {

    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUserData()
            .then(user => {
                // console.log(user.data);
                setUser({
                    isLoggedIn: true,
                    champions: user.data.champions
                });
            })
            .catch(err => {
                console.log(err);
                setUser({
                    isLoggedIn: false
                })
            });
    }, []);

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
            <div className={ user.isLoggedIn ? "user-card-links uk-flex uk-flex-between" : "user-card-links uk-flex uk-flex-center" } >
                <Link to={`/profile/${props.username}`} className="uk-button secondary-btn">Profile</Link>
                {
                    user.isLoggedIn && props.champions.length > 0 && user.champions.length > 0 ? (
                        <Link to="#" className="uk-button secondary-btn">Battle</Link>
                    ) : ""
                }
            </div>
        </div>
    );
}

export default UserCard;