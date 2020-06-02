import React, { useRef, useState, useEffect } from "react";
import ChampionCard from "../components/ChampionCard";
import API from "../utils/API";

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

    // const [championsDB, setChampionsDB] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    // useEffect(() => {
    //     loadChampionsDB();
    // }, []);

    // function loadChampionsDB() {
    //     API.getAllChampions()
    //         .then(res => {
    //             setChampionsDB(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    const searchRef = useRef();

    async function handleSearch(e) {
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

        const query = searchRef.current.value.toLowerCase();

        const dbChampions = await API.getChampionsByQuery(query)
        if (dbChampions.data.length) {
            setSearchResults(dbChampions.data);
            console.log("Grabbing from database...", dbChampions.data);
        } else {
            console.log("No results form database. Running api call now...")
            // Run third party api
            const searchResults = await API.searchHeroes(query);
            console.log(searchResults.data.results);
            
            // await searchResults.data.results.map(champion => {
            //     API.addChampion({
            //         name: champion.name,
            //         race: champion.appearance.race,
            //         image: champion.image.url,
            //         strength: champion.powerstats.strength,
            //         power: champion.powerstats.power,
            //         combat: champion.powerstats.combat,
            //         intelligence: champion.powerstats.intelligence,
            //         speed: champion.powerstats.speed,
            //         durability: champion.powerstats.durability,
            //         attack: ((champion.powerstats.strength + champion.powerstats.power + champion.powerstats.combat) / 30).toFixed(),
            //         defense: ((champion.powerstats.intelligence + champion.powerstats.speed + champion.powerstats.durability) / 30).toFixed(),
            //         query: query
            //     })
            // })
            const newResults = [...searchResults];

            for (let i = 0; i < searchResults.data.results; i++) {
                const champion = searchResults.data.results[i];
                console.log("Adding champions...");
                newResults.push({
                    name: champion.name,
                    race: champion.appearance.race,
                    image: champion.image.url,
                    strength: champion.powerstats.strength,
                    power: champion.powerstats.power,
                    combat: champion.powerstats.combat,
                    intelligence: champion.powerstats.intelligence,
                    speed: champion.powerstats.speed,
                    durability: champion.powerstats.durability,
                    attack: ((champion.powerstats.strength + champion.powerstats.power + champion.powerstats.combat) / 30).toFixed(),
                    defense: ((champion.powerstats.intelligence + champion.powerstats.speed + champion.powerstats.durability) / 30).toFixed(),
                    query: query
                })
                await API.addChampion({
                    name: champion.name,
                    race: champion.appearance.race,
                    image: champion.image.url,
                    strength: champion.powerstats.strength,
                    power: champion.powerstats.power,
                    combat: champion.powerstats.combat,
                    intelligence: champion.powerstats.intelligence,
                    speed: champion.powerstats.speed,
                    durability: champion.powerstats.durability,
                    attack: ((champion.powerstats.strength + champion.powerstats.power + champion.powerstats.combat) / 30).toFixed(),
                    defense: ((champion.powerstats.intelligence + champion.powerstats.speed + champion.powerstats.durability) / 30).toFixed(),
                    query: query
                })
            }
            // Set search results to results
            setSearchResults(newResults);
        }
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
                { searchResults.length > 0 ?
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
                            type="search"
                        />
                    }) : ""
                }
            </div>
        </section>
    );
}

export default ChampionsSearch;