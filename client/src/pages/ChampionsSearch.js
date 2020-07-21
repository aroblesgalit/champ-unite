import React, { useRef, useContext } from "react";
import "./pages.css";
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
                    const { handleSearch, list, searchResults } = value;
                    const totalChamps = searchResults.length;
                    const rangeMin = searchResults.indexOf(list[0]) + 1;
                    const rangeMax = searchResults.indexOf(list[list.length - 1]) + 1;
                    return (
                        <section className="uk-section champions-search-container">
                            <div className="champions-search-header uk-flex uk-flex-between uk-width-expand">
                                <div className="title-and-form uk-flex">
                                    <div className="uk-flex">
                                        <h2>Champions</h2>
                                        {
                                            loggedIn ? <Link to="/create_champion" className="create-link uk-button secondary-btn">Create</Link> : ""
                                        }
                                    </div>
                                    <form className="uk-search uk-search-default uk-width-1-1">
                                        <button className="uk-search-icon-flip" uk-search-icon="true" onClick={(e) => handleSearch(e, searchRef.current.value.toLowerCase())}></button>
                                        <input className="uk-search-input" type="search" placeholder="Type a name then click -->" ref={searchRef} />
                                    </form>
                                </div>
                                {
                                    loggedIn ? <Link to="/create_champion" className="create-link uk-button secondary-btn">Create</Link> : ""
                                }
                            </div>
                            {
                                list.length > 0 ? (
                                    <React.Fragment>
                                        <div className="champions-search-results uk-position-relative uk-visible-toggle" tabIndex="-1" uk-slider="sets: true">
                                            <div className="uk-flex uk-flex-nowrap uk-slider-items">
                                                {
                                                    list.map((champion, index) => {
                                                        return <ChampionCard
                                                            key={champion._id || champion.image}
                                                            index={index}
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
                                        </div>
                                        <p className="results-info uk-text-small uk-text-mute uk-margin-remove uk-text-right">Showing {rangeMin}-{rangeMax} of {totalChamps}</p>
                                        <PaginationButton />
                                    </React.Fragment>
                                ) : <p className="no-results-text uk-text-small uk-text-warning">No results found for <strong>{searchRef.current ? searchRef.current.value : "this query"}</strong>.</p>
                            }
                        </section>
                    )
                }
            }
        </ChampionsConsumer>
    );
}


export default ChampionsSearch;