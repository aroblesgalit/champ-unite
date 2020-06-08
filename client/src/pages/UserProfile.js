import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ChampionCard from "../components/ChampionCard";
import API from "../utils/API";

function UserProfile() {

    const [championList, setChampionList] = useState([]);

    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUserData()
            .then(async(user) => {
                // console.log(user.data);
                const champions = await API.getChampionsByUserId(user.data.id);
                // console.log(champions.data);
                setChampionList(champions.data);
                setUser({
                    username: user.data.username,
                    rank: user.data.rank,
                    wins: user.data.wins,
                    losses: user.data.losses,
                    rank: user.data.rank
                });
            })
            .catch(err => {
                window.location.replace("/login");
                console.log("Something went wrong. You are now logged out...", err);
            })
    }, []);

    // async function loadChampionList () {
    //     console.log("loadChampionList() running...")
    //     if (champions && champions.length > 0) {
    //         console.log("loadChampionList() running...if conditional running...")
    //         const newData = [];
    //         for (let i = 0; i < champions.length; i++) {
    //            const championData = await API.getChampionById(champions[i]);
    //            console.log(championData);
    //            newData.push(championData);
    //         }
    //         setChampionList(newData);
    //     } else {
    //         console.log("champions is null");
    //     }
    // }

    // Go thru champions array and find each champion by id and create a new array with all data

    return (
        <div className="user-profile-container">
            <ProfileHeader 
                username={user.username} 
                rank={user.rank}
                wins={user.wins}
                losses={user.losses}
            />

            <div className="user-champions-container">
                <div className="uk-flex uk-flex-middle uk-flex-between">
                    <h3>My Champions</h3>
                    <div className="uk-flex">
                        <Link to="/champions" className="uk-button secondary-btn uk-margin-small-right">Search</Link>
                        <Link to="/create_champion" className="uk-button secondary-btn">Create</Link>
                    </div>
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
                                    type="user"
                                />
                            }) 
                        ) : <p>Search for Champions to add or create your own!</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfile;