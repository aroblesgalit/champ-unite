import React from "react";
import "./style.css";

function ProfileHeader(props) {

    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
            </div>
            <div className="uk-flex uk-flex-column">
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
        </section>
    );
}

export default ProfileHeader;