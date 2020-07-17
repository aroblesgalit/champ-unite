import React, { useState, useEffect } from "react";
import API from "./API";

const ChampionsContext = React.createContext();

// Provider
function ChampionsProvider(props) {

    const [champions, setChampions] = useState({
        db: [],
        searchResults: [],
        noResults: false
    });

    useEffect(() => {
        loadChampionsDB();
    }, []);

    function loadChampionsDB() {
        API.getAllChampions()
            .then(res => {
                setChampions({
                    ...champions,
                    db: res.data
                });
            })
            .catch(err => {
                console.log("Something went wrong while fetching champions from db...", err);
            })
    };


    // ------------- Champion Search Begins -------------  //

    // Function to generate a random value from 1 - 100
    function generateStat() {
        return Math.floor((Math.random() * 100) + 1);
    };

    // Handle search event
    async function handleSearch(e, query) {
        e.preventDefault();

        // If no query, then set the results to the db
        if (!query) {
            setChampions({
                ...champions,
                searchResults: champions.db
            })
            return;
        }

        // Search querydb for query
        const queryRes = await API.findAQuery(query);
        console.log("Printing result from findAQuery (queryRes.data)...", queryRes.data)
        if (queryRes.data && queryRes.data.results) {
            // const champRes = await API.findChampionsByQuery(query);
            const queryFilter = champions.db.filter(champion => champion.name.toLowerCase().includes(query));
            // console.log("Printing results from findChampionsByQuery (champRes.data)...", champRes.data);
            console.log("Printing results from filtering the db array (queryFilter)...", queryFilter);
            setChampions({
                ...champions,
                searchResults: queryFilter
            });
        } else {
            // Otherwise, run the third party api
            console.log("No results form database. Running api call now...");
            const heroesResults = await API.searchHeroes(query);
            console.log("Printing results from api call...", heroesResults.data.results);

            if (!heroesResults.data.results) {
                console.log("No results for this search.")
                setChampions({
                    ...champions,
                    noResults: true
                });
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
                    console.log("Adding champions...", champion);

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
                setChampions({
                    ...champions,
                    searchResults: newResults
                })
                console.log("New Results: ", newResults);
            }
        }
    };

    // ------------- Champion Search Ends -------------  //

    return (
        <ChampionsContext.Provider
            value={{
                ...champions,
                handleSearch
            }}
        >
            {props.children}
        </ChampionsContext.Provider>
    );
};

// Consumer
const ChampionsConsumer = ChampionsContext.Consumer;

export default ChampionsContext;
export { ChampionsProvider, ChampionsConsumer };