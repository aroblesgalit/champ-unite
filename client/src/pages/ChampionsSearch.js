import React, { useRef } from "react";
import ChampionCard from "../components/ChampionCard";
import { ChampionsConsumer } from "../utils/ChampionsContext";

function ChampionsSearch() {

    const searchRef = useRef();

    return (
        <ChampionsConsumer>
            {
                value => {
                    const { db, searchResults, noResults, handleSearch } = value;
                    return (
                        <section className="uk-section champions-search-container">
                            <div className="uk-flex uk-flex-middle">
                                <h2>Champions</h2>
                                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                                    <button className="uk-search-icon-flip" uk-search-icon="true" onClick={(e) => handleSearch(e, searchRef.current.value.toLowerCase())}></button>
                                    <input className="uk-search-input" type="search" placeholder="Type a name then click -->" ref={searchRef} />
                                </form>
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