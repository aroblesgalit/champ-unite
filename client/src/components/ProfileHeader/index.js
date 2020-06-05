import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function ProfileHeader(props) {

    const [user, setUser] = useState({});

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

    function handleBattle() {
        window.location.replace(`/battle/${user.champions[0]}/vs/${props.champions[0]}`);
    }

    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
            </div>
            <div className="uk-flex uk-flex-bottom">
                <div className="uk-flex uk-flex-column uk-margin-large-right">
                    <h2>{props.username}</h2>
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
                        <Link to="#" className="uk-button secondary-btn" onClick={handleBattle}>Battle</Link>
                    ) : ""
                }
            </div>

        </section>
    );
}

export default ProfileHeader;