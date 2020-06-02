import React, { useRef } from "react";
import ChampionCard from "../components/ChampionCard";
// import API from "../utils/API";
import axios from "axios";

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
            imageUrl: "https://i.pinimg.com/originals/a8/45/8a/a8458a20f9de50dfa48ffd12fd9c7e55.jpg",
            int: 90,
            str: 80,
            spd: 87,
            dur: 60,
            pwr: 90,
            cbt: 85
        }
    ]

    const searchRef = useRef();

    function handleSearch(e) {
        e.preventDefault();

        // API.searchHeroes(searchRef.current.value)
        //     .then(res => {
        //         console.log("Search successful!");
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log("Search failed");
        //         console.log(err);
        //     })
        const query = searchRef.current.value;
        const accessToken = "2839209799538545";
        axios.get("https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/" + accessToken + "/search/" + query)
            .then(res => {
                console.log("Search successful!");
                console.log(res.data.results);
            })
            .catch(err => {
                console.log("Search failed");
                console.log(err);
            })
    }

    return (
        <section className="uk-section champions-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Search Champions</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true" onClick={handleSearch}></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a champion" ref={searchRef} />
                </form>
            </div>

            <div className="champions-search-results uk-flex">
                {
                    champions.map(champion => {
                        return <ChampionCard
                            key={champion.imageUrl}
                            name={champion.name}
                            imageUrl={champion.imageUrl}
                            int={champion.int}
                            str={champion.str}
                            spd={champion.spd}
                            dur={champion.dur}
                            pwr={champion.pwr}
                            cbt={champion.cbt}
                            atk={((champion.str + champion.pwr + champion.cbt) / 30).toFixed()}
                            def={((champion.int + champion.spd + champion.dur) / 30).toFixed()}
                            type="search"
                        />
                    })
                }
            </div>
        </section>
    );
}

export default ChampionsSearch;