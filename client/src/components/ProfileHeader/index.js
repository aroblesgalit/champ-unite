import React, { useContext } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";
import UsersContext from "../../utils/UsersContext";

function ProfileHeader(props) {

    const { info, champions, handleModal, handleImageModal } = useContext(UserContext);
    const { handleChampionSelect } = useContext(UsersContext);

    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="pro-img-cont-wrapper">
                <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right uk-position-relative">
                    {
                        info.username === props.username ? (
                            <span
                                uk-icon="image"
                                className="uk-position-absolute uk-icon-button"
                                onClick={() => handleImageModal()}
                            />
                        ) : ""
                    }
                    <img src={props.image} alt="Avatar" />
                </div>
            </div>
            <div className="user-stats-wrapper uk-flex uk-flex-bottom">
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