import React from "react";
import ChampionCard from "../components/ChampionCard";

function ChampionsSearch() {

    const champions = [
        {
            name: "Superman".toUpperCase(),
            imageUrl: "https://vignette.wikia.nocookie.net/marvel_dc/images/a/a5/Superman_Vol_5_1_Textless.jpg",
            int: 90,
            str: 100,
            spd: 100,
            dur: 90,
            pwr: 100,
            cbt: 90
        },
        {
            name: "Batman".toUpperCase(),
            imageUrl: "https://www.toynews-online.biz/wp-content/uploads/Batman.jpg",
            int: 90,
            str: 80,
            spd: 87,
            dur: 60,
            pwr: 90,
            cbt: 85
        }
    ]

    return (
        <section className="uk-section champions-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Search Champions</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true"></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a champion" />
                </form>
            </div>

            <div className="champions-search-results uk-flex">
                {
                    champions.map(champion => {
                        return <ChampionCard
                            name={champion.name}
                            imageUrl={champion.imageUrl}
                            int={champion.int}
                            str={champion.str}
                            spd={champion.spd}
                            dur={champion.dur}
                            pwr={champion.pwr}
                            cbt={champion.cbt}
                        />
                    })
                }
            </div>
        </section>
    );
}

export default ChampionsSearch;