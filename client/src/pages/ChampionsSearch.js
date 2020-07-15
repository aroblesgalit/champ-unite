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

        // Search querydb for query
        const queryRes = await API.findAQuery(query);
        console.log("Printing result from findAQuery (queryRes.data)...", queryRes.data)
        if (queryRes.data && queryRes.data.results) {
            const champRes = await API.findChampionsByQuery(query);
            console.log("Pringting results from findChampionsByQuery (champRes.data)...", champRes.data);
            setSearchResults(champRes.data);
        } else {
            // Otherwise, run the third party api
            console.log("No results form database. Running api call now...");
            const heroesResults = await API.searchHeroes(query);
            console.log("Printing results from api call...", heroesResults.data.results);


            if (!heroesResults.data.results) {
                console.log("No results for this search.")
                setNoResults(true);
                // Add query to database
                await API.addAQuery({
                    query: query,
                    results: false
                });
            } else {
                // Add query to database
                await API.addAQuery({
                    query: query,
                    results: true
                });
                // Declare a new array for api search results
                const newResults = [];
                // Declare a function to calculate attack and defense
                function calcBattleStat(a, b, c) {
                    return ((a + b + c) / 30).toFixed();
                }
                // Go through the results
                for (let i = 0; i < heroesResults.data.results.length; i++) {
                    // Store each result
                    const champion = heroesResults.data.results[i];
                    // console.log("Adding champions...", champion);

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
                    let nullStats;
                    champion.powerstats.strength === "null" ? strength = generateStat() : strength = champion.powerstats.strength;
                    champion.powerstats.power === "null" ? power = generateStat() : power = champion.powerstats.power;
                    champion.powerstats.combat === "null" ? combat = generateStat() : combat = champion.powerstats.combat;
                    champion.powerstats.intelligence === "null" ? intelligence = generateStat() : intelligence = champion.powerstats.intelligence;
                    champion.powerstats.speed === "null" ? speed = generateStat() : speed = champion.powerstats.speed;
                    champion.powerstats.durability === "null" ? durability = generateStat() : durability = champion.powerstats.durability;
                    // Calculate attack and defense
                    const attack = calcBattleStat(parseInt(strength), parseInt(power), parseInt(combat));
                    const defense = calcBattleStat(parseInt(intelligence), parseInt(speed), parseInt(durability));
                    // If any of the powerstats is "null"
                    if (champion.powerstats.strength === "null" || champion.powerstats.power === "null" || champion.powerstats.combat === "null" || champion.powerstats.intelligence === "null" || champion.powerstats.speed === "null" || champion.powerstats.durability === "null") {
                        nullStats = true;
                    } else {
                        nullStats = false;
                    }
                    // Push each result into the new result array
                    newResults.push({
                        superHeroId: champion.id,
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
                        nullStats: nullStats
                    })

                    const superheroIdRes = await API.findAChampionBySuperHeroId(champion.id);
                    console.log("Find champion in db by superheroid. Printing result from findAChampionBySuperHeroId...", superheroIdRes);
                    if (superheroIdRes.data) {
                        console.log("Champion found in database. Not adding...");
                    } else {
                        console.log("Champion NOT in database. Adding now...")
                        // Add each result to the database
                        API.addChampion({
                            superHeroId: champion.id,
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
                            nullStats: nullStats
                        })
                            .then(dbModel => console.log("Champion added to db...", dbModel))
                            .catch(err => console.log("Something went wrong while trying to add champion to db...", err));
                    }
                }
                // Set search results to the new results array
                setSearchResults(newResults);
                console.log("New Results: ", newResults);
            }
        }
    }

    return (
        <section className="uk-section champions-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Champions</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true" onClick={handleSearch}></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a champion" ref={searchRef} />
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
                        championsDB.map(champion => {
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
    );
}


export default ChampionsSearch;