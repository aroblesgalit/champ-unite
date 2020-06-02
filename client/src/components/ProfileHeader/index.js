import React from "react";
import "./style.css";

function ProfileHeader() {
    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Avatar" />
            </div>
            <div className="uk-flex uk-flex-column">
                <h2>Username</h2>
                <div className="uk-flex">
                    <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                        <span className="stat-val">3rd</span>
                        <span className="stat-label">Rank</span>
                    </div>
                    <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                        <span className="stat-val">26</span>
                        <span className="stat-label">Wins</span>
                    </div>
                    <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                        <span className="stat-val">5</span>
                        <span className="stat-label">Losses</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileHeader;