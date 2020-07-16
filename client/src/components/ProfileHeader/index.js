import React, { useContext } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";
import UsersContext from "../../utils/UsersContext";

function ProfileHeader(props) {

    const { info, handleModal, handleImageModal } = useContext(UserContext);
    const { handleChampionSelect } = useContext(UsersContext);

    const { displayName, username, rank, wins, losses, champions, image, type } = props;

    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right uk-position-relative">
                {
                    info.username === username ? (
                        <span
                            uk-icon="image"
                            className="uk-position-absolute uk-icon-button"
                            onClick={() => handleImageModal()}
                        />
                    ) : ""
                }
                <img src={image} alt="Avatar" />
            </div>
            <div className="user-stats-wrapper uk-flex uk-flex-bottom">
                <div className="uk-flex uk-flex-column uk-margin-large-right">
                    <h2>{displayName}</h2>
                    <div className="uk-flex">
                        <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                            <span className="stat-val">{rank === 0 ? "-" : rank}</span>
                            <span className="stat-label">Rank</span>
                        </div>
                        <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                            <span className="stat-val">{wins}</span>
                            <span className="stat-label">Wins</span>
                        </div>
                        <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                            <span className="stat-val">{losses}</span>
                            <span className="stat-label">Losses</span>
                        </div>
                    </div>
                </div>
                {
                    type === "otherUser" && champions && info.champions && info.champions.length > 0 && champions.length > 0 ? (
                        <button
                            className="uk-button secondary-btn"
                            onClick={() => {
                                handleChampionSelect(champions);
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