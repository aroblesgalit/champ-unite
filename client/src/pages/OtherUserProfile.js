import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ChampionCard from "../components/ChampionCard";
import UsersContext from "../utils/UsersContext";

function OtherUserProfile() {

    // Get :username from html route
    const { username } = useParams();
    // Get list of users form UsersContext
    const { list } = useContext(UsersContext);

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
                <div className="uk-flex uk-flex-middle uk-flex-between">
                    <h3>Champions</h3>
                </div>
                <div className="champions-list-container uk-flex uk-flex-wrap">
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
    );
}

export default OtherUserProfile;