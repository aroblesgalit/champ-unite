import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ChampionCard from "../components/ChampionCard";
import UsersContext from "../utils/UsersContext";
import UserContext from "../utils/UserContext";

function OtherUserProfile() {

    // Get :username from html route
    const { username } = useParams();
    // Get list of users and event handler for selecting other user's champion form UsersContext
    const { list, handleChampionSelect } = useContext(UsersContext);

    // Get authenticated user's info and event handlers for champion select modal and image upload modal from UserContext
    const { info, handleModal } = useContext(UserContext);

    // Declare state for user's details
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        handleDetailUser();
    }, [])

    // Handle detail user using local storage
    function handleDetailUser() {
        // Check localStorage for stored data with Getter
        const storedData = JSON.parse(localStorage.getItem("userDetailData"));
        // If there is stored data, and its username is the same as the :username
        // then set user's detail to the stored data
        if (storedData && storedData.username === username) {
            setUserDetail(storedData);
            // Otherwise, find the user from the UsersContext list
            // then set user's detail to that user and store the details into local storage using Setter
        } else {
            const userRes = list.find(user => user.username === username);
            setUserDetail(userRes);
            localStorage.setItem("userDetailData", JSON.stringify(userRes));
        }
    };

    return (
        <div className="user-profile-container">
            <ProfileHeader
                displayName={userDetail.displayName}
                username={userDetail.username}
                rank={userDetail.rank}
                wins={userDetail.wins}
                losses={userDetail.losses}
                champions={userDetail.champions}
                image={userDetail.image}
                type="otherUser"
            />
            <div className="user-champions-container">
                <div className="user-champions-header uk-flex uk-flex-middle uk-flex-between">
                    <h3>Champions</h3>
                    {
                        userDetail.champions && info.champions && info.champions.length > 0 && userDetail.champions.length > 0 ? (
                            <button
                                className="uk-button secondary-btn"
                                onClick={() => {
                                    handleChampionSelect(userDetail.champions);
                                    handleModal();
                                }}
                            >
                                Battle
                            </button>
                        ) : ""
                    }
                </div>
                <div className="champions-list-container uk-position-relative uk-visible-toggle" tabIndex="-1" uk-slider="sets: true">
                    <div className="uk-flex uk-flex-nowrap uk-slider-items">
                        {
                            userDetail.champions && userDetail.champions.length > 0 ? (
                                userDetail.champions.map(champion => {
                                    return <ChampionCard
                                        key={champion._id || champion.image}
                                        id={champion._id}
                                        name={champion.name}
                                        image={champion.image}
                                        strength={champion.strength}
                                        power={champion.power}
                                        combat={champion.combat}
                                        intelligence={champion.intelligence}
                                        speed={champion.speed}
                                        durability={champion.durability}
                                        attack={champion.attack}
                                        defense={champion.defense}
                                        type="otherUser"
                                    />
                                })
                            ) : <p>This user has no champions yet.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherUserProfile;