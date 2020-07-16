import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import ChampionCard from "../components/ChampionCard";
import { UsersConsumer } from "../utils/UsersContext";

function OtherUserProfile() {
    return (
        <UsersConsumer>
            {
                value => {
                    const { detailUser } = value;
                    return (
                        <div className="user-profile-container">
                            <ProfileHeader
                                displayName={detailUser.displayName}
                                username={detailUser.username}
                                rank={detailUser.rank}
                                wins={detailUser.wins}
                                losses={detailUser.losses}
                                champions={detailUser.champions}
                                image={detailUser.image}
                                type="otherUser"
                            />

                            <div className="user-champions-container">
                                <div className="uk-flex uk-flex-middle uk-flex-between">
                                    <h3>Champions</h3>
                                </div>
                                <div className="champions-list-container uk-flex uk-flex-wrap">
                                    {
                                        detailUser.championsArr && detailUser.championsArr.length > 0 ? (
                                            detailUser.championsArr.map(champion => {
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