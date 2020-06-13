import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import { useParams } from "react-router-dom";
import ChampionCard from "../components/ChampionCard";
import API from "../utils/API";

function OtherUserProfile() {

    const { username } = useParams();
    // Get user's data based on username from the html route
    const [otherUser, setOtherUser] = useState({});
    const [championList, setChampionList] = useState([]);

    useEffect(() => {
        // console.log("useEffect in OtherUserProfile.js running...Printing username...", username);
        API.getUserByUsername(username)
            .then(async (userDB) => {
                // console.log(userDB.data[0]);
                const champions = await API.getChampionsByUserId(userDB.data[0]._id);
                setChampionList(champions.data);
                setOtherUser({
                    displayName: userDB.data[0].displayName,
                    username: userDB.data[0].username,
                    rank: userDB.data[0].rank,
                    wins: userDB.data[0].wins,
                    losses: userDB.data[0].losses,
                    champions: userDB.data[0].champions
                });
            })
            .catch(err => console.log(err));
    }, [username]);

    return (
        <div className="user-profile-container">
            <ProfileHeader
                displayName={otherUser.displayName}
                username={username}
                rank={otherUser.rank}
                wins={otherUser.wins}
                losses={otherUser.losses}
                champions={otherUser.champions}
                type="otherUser"
            />

            <div className="user-champions-container">
                <div className="uk-flex uk-flex-middle uk-flex-between">
                    <h3>Champions</h3>
                </div>
                <div className="champions-list-container uk-flex uk-flex-wrap">
                    {
                        championList && championList.length > 0 ? (
                            championList.map(champion => {
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