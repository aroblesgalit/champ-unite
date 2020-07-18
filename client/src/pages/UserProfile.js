import React from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ChampionCard from "../components/ChampionCard";
import { UserConsumer } from "../utils/UserContext";

function UserProfile() {
    return (
        <UserConsumer>
            {
                value => {
                    const { info } = value;
                    return (
                        <div className="user-profile-container">
                            <ProfileHeader
                                displayName={info.displayName}
                                username={info.username}
                                rank={info.rank}
                                wins={info.wins}
                                losses={info.losses}
                                image={info.image}
                            />

                            <div className="user-champions-container">
                                <div className="uk-flex uk-flex-middle uk-flex-between">
                                    <h3>My Champions</h3>
                                    <Link to="/create_champion" className="uk-button secondary-btn">Create</Link>
                                </div>
                                <div className="champions-list-container uk-position-relative uk-visible-toggle" tabIndex="-1" uk-slider="sets: true">
                                    <div className="uk-flex uk-flex-nowrap uk-slider-items">
                                        {
                                            info.champions && info.champions.length > 0 ? (
                                                info.champions.map(champion => {
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
                        </div>
                    )
                }
            }
        </UserConsumer>
    );
}

export default UserProfile;