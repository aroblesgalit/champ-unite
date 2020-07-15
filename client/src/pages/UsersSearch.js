import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import UserCard from "../components/UserCard";
import ChampionCard from "../components/ChampionCard";
import API from "../utils/API";
import UserContext, { UserConsumer } from "../utils/UserContext";
import UsersContext, { UsersConsumer } from "../utils/UsersContext";

function UsersSearch() {

    const [users, setUsers] = useState([]);

    const { info } = useContext(UserContext);
    const { selectedChampId } = useContext(UsersContext);

    const usernameRef = useRef();

    function handleSearch(e) {
        e.preventDefault();

        const usernameQuery = usernameRef.current.value;
        if (!usernameQuery) {
            return;
        }
        API.getUsersBySearch(usernameQuery)
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log("Something went wrong during the search...", err);
            })
    }


    return (
        <section className="uk-section users-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Search Users</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true" type="submit" onClick={handleSearch}></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a user" ref={usernameRef} />
                </form>
            </div>

            <div className="users-search-results uk-flex uk-flex-wrap">
                <UsersConsumer>
                    {
                        value => {
                            return (
                                value.list && value.list.length > 0 ? (
                                    value.list.map(user => {
                                        return <UserCard
                                            key={user._id}
                                            displayName={user.displayName}
                                            username={user.username}
                                            rank={user.rank}
                                            wins={user.wins}
                                            losses={user.losses}
                                            champions={user.champions}
                                            championsArr={user.championsArr}
                                        />
                                    })
                                ) : <p className="uk-text-warning">Loading users...</p>
                            )
                        }
                    }
                </UsersConsumer>
            </div>

            <UserConsumer>
                {
                    value => {
                        return (
                            value.champModalOpen ? (
                                <div className="user-champions-modal uk-flex uk-flex-middle uk-flex-center">
                                    <div className="user-champions-modal-wrapper">
                                        <button type="button" onClick={() => value.handleModal()}></button>
                                        <div className="uk-modal-header">
                                            <h2 className="uk-modal-title">My Champions</h2>
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
                                            <button className="uk-button secondary-btn uk-modal-close uk-margin-small-right" type="button" onClick={() => value.handleModal()}>Cancel</button>
                                            <Link to={`/battle/${value.selectedId}/vs/${selectedChampId}`} >
                                                <button
                                                    className="uk-button secondary-btn"
                                                    type="button"
                                                    onClick={() => value.handleModal()}
                                                // onClick={() => handleBattle(value.selectedId, selectedChampId)}
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
        </section>
    );
}

export default UsersSearch;