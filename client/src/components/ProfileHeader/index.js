import React, { useContext } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";

function ProfileHeader(props) {

    // Get authenticated user's info and event handlers for champion select modal and image upload modal from UserContext
    const { info, handleImageModal } = useContext(UserContext);
    

    // Get user's data values from props for rendering
    const { displayName, username, rank, wins, losses, image } = props;

    return (
        <section className="profile-header uk-section uk-flex uk-flex-bottom uk-flex-between uk-light">
            <div className="img-and-stats uk-flex uk-flex-middle">
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
                </div>
            </div>
        </section>
    );
}

export default ProfileHeader;