import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import UserContext from "../utils/UserContext";
import ChampionCard from "../components/ChampionCard";

function UserProfile() {

    const { champions } = useContext(UserContext);

    return (
        <div className="user-profile-container">
            <ProfileHeader />

            <div className="user-champions-container">
                <div className="uk-flex uk-flex-middle uk-flex-between">
                    <h3>My Champions</h3>
                    <div className="uk-flex">
                        <Link to="/champions" className="uk-button secondary-btn uk-margin-small-right">Search</Link>
                        <button className="uk-button secondary-btn">Create</button>
                    </div>
                </div>
                <div className="champions-list-container uk-flex uk-flex-wrap">
                    {
                        champions && champions.length > 0 ? (
                            champions.map(champion => {
                                return <ChampionCard
                                    key={champion._id || champion.image}
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