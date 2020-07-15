import React, { useContext } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";
import UsersContext from "../../utils/UsersContext";

function ProfileHeader(props) {

    const { loggedIn, champions, handleModal } = useContext(UserContext);
    const { handleChampionSelect } = useContext(UsersContext);

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
                            <span className="stat-val">{props.rank === 0 ? "-" : props.rank}</span>
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
                    props.type === "otherUser" && props.champions && champions && champions.length > 0 && props.champions.length > 0 ? (
                        <button
                            className="uk-button secondary-btn"
                            onClick={() => {
                                handleChampionSelect(props.champions);
                                handleModal();
                            }}
                        >
                            Battle
                        </button>
                    ) : ""
                }
            </div>
        </section>
    );
}

export default ProfileHeader;