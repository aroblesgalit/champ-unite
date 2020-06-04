import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import { useParams } from "react-router-dom";
import ChampionCard from "../components/ChampionCard";
import API from "../utils/API";

function OtherUserProfile() {

    const { username } = useParams();
    // Get user's data based on username from the html route
    const [user, setUser] = useState({});
    const [championList, setChampionList] = useState([]);

    useEffect(() => {
        // console.log("useEffect in OtherUserProfile.js running...Printing username...", username);
        API.getUserByUsername(username)
            .then(async (userDB) => {
                // console.log(userDB.data[0]);
                const champions = await API.getChampionsByUserId(userDB.data[0]._id);
                setChampionList(champions.data);
                setUser({
                    username: userDB.data[0].username,
                    rank: userDB.data[0].rank,
                    wins: userDB.data[0].wins,
                    losses: userDB.data[0].losses
                });
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="user-profile-container">
            <ProfileHeader
                username={username}
                rank={user.rank}
                wins={user.wins}
                losses={user.losses}
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