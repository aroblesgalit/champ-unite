import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import ChampionCard from "../components/ChampionCard";
import PaginationButton from "../components/PaginationButton";
import { ChampionsConsumer } from "../utils/ChampionsContext";
import UserContext from "../utils/UserContext";

function ChampionsSearch() {

    const { loggedIn } = useContext(UserContext);

    const searchRef = useRef();

    return (
        <ChampionsConsumer>
            {
                value => {
                    const { db, searchResults, noResults, handleSearch } = value;
                    return (
                        <section className="uk-section champions-search-container">
                            <PaginationButton />

                            <div className="uk-flex uk-flex-between uk-width-expand">
                                <div className="title-and-form uk-flex uk-flex-middle">
                                    <h2>Champions</h2>
                                    <form className="uk-search uk-search-default uk-width-1-1">
                                        <button className="uk-search-icon-flip" uk-search-icon="true" onClick={(e) => handleSearch(e, searchRef.current.value.toLowerCase())}></button>
                                        <input className="uk-search-input" type="search" placeholder="Type a name then click -->" ref={searchRef} />
                                    </form>
                                </div>
                                {
                                    loggedIn ? <Link to="/create_champion" className="create-link uk-button secondary-btn">Create</Link> : ""
                                }
                            </div>
                            <div className="champions-search-results uk-flex uk-flex-wrap">
                                {searchResults.length > 0 ?
                                    searchResults.map(champion => {
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
                                            nullStats={champion.nullStats}
                                            type="search"
                                        />
                                    }) : noResults ? <p className="uk-text-warning">No results found. Please try a different search!</p> :
                                        db.map(champion => {
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
                                                nullStats={champion.nullStats}
                                                type="search"
                                            />
                                        })
                                }
                            </div>
                        </section>
                    )
                }
            }
        </ChampionsConsumer>
    );
}


export default ChampionsSearch;