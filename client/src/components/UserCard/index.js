import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import UserContext from "../../utils/UserContext";
import UsersContext from "../../utils/UsersContext";

function UserCard(props) {

    const { loggedIn, champions, handleModal } = useContext(UserContext);
    const { handleChampionSelect, handleDetailUser } = useContext(UsersContext);

    // function handleBattle(id1, id2) {
    //     window.location.replace(`/battle/${id1}/vs/${id2}`);
    // }

    return (
        <div className="user-card uk-card uk-flex uk-flex-column uk-flex-middle">
            <div className="user-info uk-flex uk-flex-middle">
                <div className="user-image uk-flex uk-flex-center uk-flex-middle uk-margin-small-right">
                    <img className="uk-border-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
                </div>
                <div className="uk-flex uk-flex-column uk-flex-center">
                    <h3>{props.displayName}</h3>
                    <div className="uk-flex">
                        <div className="user-info-container uk-flex uk-flex-column uk-flex-middle">
                            <p className="stat-val">{props.rank === 0 ? "-" : props.rank}</p>
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
            <div className="champions-avatars uk-flex uk-flex-around uk-margin-top">
                {
                    props.championsArr && props.championsArr.length > 0 ? (
                        props.championsArr.map(champion => {
                            return <div key={champion._id} className="user-card-champion-image" uk-tooltip={champion.name}>
                                <img src={champion.image} alt={champion.name} />
                            </div>
                        })
                    ) : ""
                }
            </div>
            <div className={loggedIn ? "user-card-links uk-flex uk-flex-between uk-child-width-1-2" : "user-card-links uk-flex uk-flex-center"} >
                <Link to={`/profile/${props.username}`} className="uk-link-reset">
                    <button
                        className="uk-button user-btn"
                        onClick={() => handleDetailUser(props.id)}
                    >
                        Profile
                    </button>
                </Link>
                {
                    loggedIn && champions.length > 0 && props.champions.length > 0 ? (
                        <React.Fragment>
                            <hr className="uk-divider-vertical" />
                            <button
                                // uk-toggle="target: #user-champions-modal"
                                className="uk-button user-btn"
                                onClick={() => {
                                    handleChampionSelect(props.champions);
                                    handleModal();
                                }}
                            >
                                Battle
                        </button>
                        </React.Fragment>
                    ) : ""
                }
            </div>
        </div>
    );
}

export default UserCard;