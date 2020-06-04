import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function UserCard(props) {
    return (
        <div className="user-card uk-card">
            <div className="user-info uk-flex">
                <div className="user-image uk-flex uk-flex-center uk-flex-middle uk-margin-small-right">
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Avatar" />
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
            <div className="user-card-links uk-flex uk-flex-between">
                <Link to="#" className="uk-button secondary-btn">Profile</Link>
                <Link to="#" className="uk-button secondary-btn">Battle</Link>
            </div>
        </div>
    );
}

export default UserCard;