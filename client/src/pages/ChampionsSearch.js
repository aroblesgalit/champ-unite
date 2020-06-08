import React, { useRef, useState, useEffect } from "react";
import ChampionCard from "../components/ChampionCard";
import API from "../utils/API";

function ChampionsSearch() {

    // Champions DB
    const [championsDB, setChampionsDB] = useState([]);
    // Champions search results
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    
    useEffect(() => {
        loadChampionsDB();
    }, []);

    function loadChampionsDB() {
        API.getAllChampions()
            .then(res => {
                setChampionsDB(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const searchRef = useRef();

    // Function to generate a random value from 1 - 100
    function generateStat() {
        return Math.floor((Math.random() * 100) + 1);
    }

    // Handle search event
    async function handleSearch(e) {
        e.preventDefault();
        // Store value of search query - lowercased
        const query = searchRef.current.value.toLowerCase();
        // Get champions from db by search query
        const dbChampions = await API.getChampionsByQuery(query)
        // If there is results
        if (dbChampions.data.length) {
            // Set search results to the db results
            setSearchResults(dbChampions.data);
            console.log("Grabbing from database...", dbChampions.data);
        } else {
            console.log("No results form database. Running api call now...")
            // Otherwise, run the third party api
            const heroesResults = await API.searchHeroes(query);
            console.log("Printing results...", heroesResults.data.results);

            if (!heroesResults.data.results) {
                setNoResults(true);
            }
            // Declare a new array for results
            const newResults = [];
            // Declare a function to calculate attack and defense
            function calcBattleStat(a, b, c) {
                return ((a + b + c) / 30).toFixed();
            }
            // Go through the results
            for (let i = 0; i < heroesResults.data.results.length; i++) {
                // Store each result
                const champion = heroesResults.data.results[i];
                console.log("Adding champions...");
                console.log(champion);

                // Store relevant data
                const name = champion.name;
                const race = champion.appearance.race;
                const image = champion.image.url;
                let strength;
                let power;
                let combat;
                let intelligence;
                let speed;
                let durability;
                champion.powerstats.strength === "null" ? strength = generateStat() : strength = champion.powerstats.strength;
                champion.powerstats.power === "null" ? power = generateStat() : power = champion.powerstats.power;
                champion.powerstats.combat === "null" ? combat = generateStat() : combat = champion.powerstats.combat;
                champion.powerstats.intelligence === "null" ? intelligence = generateStat() : intelligence = champion.powerstats.intelligence;
                champion.powerstats.speed === "null" ? speed = generateStat() : speed = champion.powerstats.speed;
                champion.powerstats.durability === "null" ? durability = generateStat() : durability = champion.powerstats.durability;
                // Calculate attack and defense
                const attack = calcBattleStat(parseInt(strength), parseInt(power), parseInt(combat));
                const defense = calcBattleStat(parseInt(intelligence), parseInt(speed), parseInt(durability));
                // Push each result into the new result array
                newResults.push({
                    name: name,
                    race: race,
                    image: image,
                    strength: strength,
                    power: power,
                    combat: combat,
                    intelligence: intelligence,
                    speed: speed,
                    durability: durability,
                    attack: attack,
                    defense: defense,
                    query: query
                })
                // Add each result to the database
                API.addChampion({
                    name: name,
                    race: race,
                    image: image,
                    strength: strength,
                    power: power,
                    combat: combat,
                    intelligence: intelligence,
                    speed: speed,
                    durability: durability,
                    attack: attack,
                    defense: defense,
                    query: query
                })
                    .then(dbModel => console.log(dbModel))
                    .catch(err => console.log(err));
            }
            // Set search results to the new results array
            setSearchResults(newResults);
            console.log("New Results: ", newResults);
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

            <div className="champions-search-results uk-flex uk-flex-wrap">
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
                    }) : championsDB.map(champion => {
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
                    })
                }
            </div>
        </section>
    );
}

export default ChampionsSearch;