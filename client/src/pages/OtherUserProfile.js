import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ChampionCard from "../components/ChampionCard";
import UsersContext, { UsersConsumer } from "../utils/UsersContext";

function OtherUserProfile() {

    const { username } = useParams();
    const { list } = useContext(UsersContext);

    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        handleDetailUser();
    }, [])

    function handleDetailUser() {
        const storedData = JSON.parse(localStorage.getItem("userDetailData"));
        // console.log("localData from localStorage...", storedData);
        if (storedData && storedData.username === username) {
            // console.log("localData exists...");
            setUserDetail(storedData);
        } else {
            // console.log("localData DOES NOT exists...");
            const userRes = list.find(user => user.username === username);
            setUserDetail(userRes);
            // console.log("userRes...", userRes);
            // Setter
            localStorage.setItem("userDetailData", JSON.stringify(userRes));
        }
    };

    return (
        <UsersConsumer>
            {
                value => {
                    const { detailUser } = value;
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
                    )
                }
            }
        </UsersConsumer>
    );
}

export default OtherUserProfile;