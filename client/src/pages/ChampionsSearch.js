import React from "react";
import ChampionCard from "../components/ChampionCard";

function ChampionsSearch() {
    return (
        <section className="uk-section champions-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Search Champions</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true"></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a champion" />
                </form>
            </div>

            <div className="champions-search-results">
                <ChampionCard />
            </div>
        </section>
    );
}

export default ChampionsSearch;