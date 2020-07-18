import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./champSelectModal.css";
import ChampionCard from "../ChampionCard";
import { UserConsumer } from "../../utils/UserContext"
import UsersContext from "../../utils/UsersContext";

function ChampSelectModal() {

    // Get the other user's selected champion's id from the UsersContext
    // Pass it to the link route on the battle button
    const { champId } = useContext(UsersContext);

    return (
        <UserConsumer>
            {
                value => {
                    const { handleModal, handleBattleMode, champModalOpen, handleSelect, championSelected, info, selectedId } = value;
                    return (
                        champModalOpen ? (
                            <div className="user-champions-modal-wrapper uk-flex uk-flex-middle uk-flex-center">
                                <div className="user-champions-modal">
                                    <div className="user-champions-modal-header">
                                        <p>Select one of your champions to go into battle.</p>
                                    </div>
                                    <div className="user-champions-modal-body uk-position-relative uk-visible-toggle" tabIndex="-1" uk-slider="sets: true">
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
                                                            type="battle"
                                                            handleSelect={() => handleSelect(champion._id)}
                                                            selected={championSelected}
                                                            selectedId={selectedId}
                                                        />
                                                    })
                                                ) : <p>Search for Champions to add or create your own!</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="user-champions-modal-footer uk-text-right">
                                        <button className="uk-button outline-btn uk-modal-close uk-margin-small-right" type="button" onClick={() => handleModal()}>Cancel</button>
                                        <Link to={`/battle/${selectedId || info.champions[0]._id}/vs/${champId}`} >
                                            <button
                                                className="uk-button secondary-btn"
                                                type="button"
                                                onClick={() => {
                                                    handleModal();
                                                    handleBattleMode();
                                                }}
                                            >
                                                Battle
                                                </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    )
                }
            }
        </UserConsumer>
    )
}

export default ChampSelectModal;