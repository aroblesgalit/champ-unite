import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";

function ProfileHeader() {

    const { username, rank, wins, losses, champions } = useContext(UserContext);

    // const [userData, setUserData] = useState({});

    // useEffect(() => {
    //     loadUser();
    // }, []);

    // function loadUser() {
    //     API.getUserData()
    //         .then(res => {
    //             console.log(res.data);
    //             setUserData({
    //                 username: res.data.username,
    //                 rank: res.data.rank,
    //                 wins: res.data.wins,
    //                 losses: res.data.losses,
    //                 champions: res.data.champions
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    return (
        <section className="profile-header uk-section uk-flex uk-flex-middle uk-light">
            <div className="profile-img-container uk-flex uk-flex-center uk-flex-middle uk-margin-right">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Avatar" />
            </div>
            <div className="uk-flex uk-flex-column">
                <h2>{username}</h2>
                <div className="uk-flex">
                    <div className="user-stats uk-flex uk-flex-column uk-flex-middle">
                        <span className="stat-val">{rank}</span>
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
        </section>
    );
}

export default ProfileHeader;