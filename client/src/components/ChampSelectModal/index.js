import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ChampionCard from "../ChampionCard";
import { UserConsumer } from "../../utils/UserContext"
import UsersContext from "../../utils/UsersContext";

function ChampSelectModal() {

    const { champId } = useContext(UsersContext);

    return (
        <UserConsumer>
            {
                value => {
                    return (
                        value.champModalOpen ? (
                            <div className="user-champions-modal uk-flex uk-flex-middle uk-flex-center">
                                <div className="user-champions-modal-wrapper">
                                    <div className="uk-modal-header">
                                        <p>Select one of your champions to go into battle.</p>
                                    </div>
                                    <div className="uk-modal-body uk-flex uk-width-1-1">
                                        {
                                            value.champions && value.champions.length > 0 ? (
                                                value.champions.map(champion => {
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
                                                        handleSelect={() => value.handleSelect(champion._id)}
                                                        selected={value.championSelected}
                                                        selectedId={value.selectedId}
                                                    />
                                                })
                                            ) : <p>Search for Champions to add or create your own!</p>
                                        }
                                    </div>
                                    <div className="uk-modal-footer uk-text-right">
                                        <button className="uk-button outline-btn uk-modal-close uk-margin-small-right" type="button" onClick={() => value.handleModal()}>Cancel</button>
                                        <Link to={`/battle/${value.selectedId || value.info.champions[0]}/vs/${champId}`} >
                                            <button
                                                className="uk-button secondary-btn"
                                                type="button"
                                                onClick={() => value.handleModal()}
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