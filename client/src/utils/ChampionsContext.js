import React, { useState, useEffect } from "react";
import API from "./API";

const ChampionsContext = React.createContext();

// Provider
function ChampionsProvider(props) {

    const [pagination, setPagination] = useState({
        nums: [],
        currentPage: 1
    });

    const [currentViews, setCurrentViews] = useState({
        list: []
    });

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
                    db: res.data,
                    searchResults: res.data
                });
                setNums(res.data);
                updateCurrentViews(1, res.data);
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
            setNums(champions.db);
            updateCurrentViews(1, champions.data);
            return;
        }

        // First, search querydb for query
        const queryRes = await API.findAQuery(query);
        // console.log("Printing result from findAQuery (queryRes.data)...", queryRes.data)
        // If it exists, then filter the loaded db array by the query and set searchResults to this
        if (queryRes.data && queryRes.data.results) {
            const queryFilter = champions.db.filter(champion => champion.name.toLowerCase().includes(query));
            // console.log("Printing results from filtering the db array (queryFilter)...", queryFilter);
            setChampions({
                ...champions,
                searchResults: queryFilter
            });
            setNums(queryFilter);
            updateCurrentViews(1, queryFilter);
            // If query doesn't exist in the db, run the third party (superhero) api
        } else {
            // console.log("No results form database. Running api call now...");
            const heroesResults = await API.searchHeroes(query);
            // console.log("Printing results from api call...", heroesResults.data.results);
            // If there's no results from the third party api call
            // Set noResults to true and add the query to the db with the results field set to false
            if (!heroesResults.data.results) {
                // console.log("No results for this search.")
                setChampions({
                    ...champions,
                    noResults: true,
                    searchResults: []
                });
                setNums([]);
                updateCurrentViews(0, []);
                // Add query to database
                await API.addAQuery({
                    query: query,
                    results: false
                });
                // If there is results from the third party api call
                // Add the query to the db and set the results field to true
            } else {
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
                    // Check the db if these superheroes are already added
                    // If they are already added, then don't add them to the db
                    // Othewise, add them to the db
                    const superheroIdRes = await API.findAChampionBySuperHeroId(champion.id);
                    // console.log("Find champion in db by superheroid. Printing result from findAChampionBySuperHeroId...", superheroIdRes);
                    if (superheroIdRes.data) {
                        console.log("Champion found in database. Not adding...");
                    } else {
                        // console.log("Champion NOT in database. Adding now...")
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
                });
                setNums(newResults);
                updateCurrentViews(1, newResults);
                // console.log("New Results: ", newResults);
            }
        }
    };


    // For pagination
    // 1. Create states for pagination with fields for nums, currentViews, currentPage
    // 2. Get the search results array
    // 3. Calculate the amount of pages by taking the length of the array 
    //    and dividing it by 20 (num of cards for show at a time) 
    //    then round up to get the number of pages -- use Math.ceil() to round up
    // 4. Use number of pages to map each number into the nums field
    // 5. Set currentViews to the first 20 champs from the results array
    // 6. Create a method for updating the currentViews based on the page num
    //    if page num === 1, then view indexes (page num - 1) * 20 up to ((page num - 1) * 20)) + (20 - 1)
    //    so if page num === 1, then view (1 - 1) * 20 up to ((1 - 1) * 20) + (20 - 1) ==> indexes 0 - 19
    //    if page num === 2, then view indexes 20 to 39
    // 7. Map out the currentViews in the ChampionSearch page  

    // Method for updating the currentViews of 20 champions
    function updateCurrentViews(page, array) {
        let min = (page - 1) * 20;
        let max = ((page - 1) * 20) + 19;
        // Check if the page will be the last
        // Figure out the max since it wont be + 19 ==> should be the length of the array
        let tempChamps = [];
        for (let i = min; i <= max; i++) {
            if (!array[i]) {
                return;
            }
            tempChamps.push(array[i]);
            setCurrentViews({
                list: tempChamps
            });
            // console.log(tempChamps);
        }
    };

    // Method for calculating amount of pages and setting nums
    function setNums(champs) {
        const tempPages = Math.ceil(champs.length / 20);
        const tempNums = [];
        for (let i = 1; i < tempPages + 1; i++) {
            tempNums.push(i);
        }
        setPagination({
            ...pagination,
            currentPage: 1,
            nums: tempNums
        })
    };

    // Methods for updating currentPage
    function nextPage() {
        if (pagination.currentPage < pagination.nums.length) {
            setPagination({
                ...pagination,
                currentPage: pagination.currentPage + 1
            });
            updateCurrentViews(pagination.currentPage + 1, champions.searchResults);
        }
    };
    function prevPage() {
        if (pagination.currentPage > 1) {
            setPagination({
                ...pagination,
                currentPage: pagination.currentPage - 1
            });
            updateCurrentViews(pagination.currentPage - 1, champions.searchResults);
        }
    };
    function setCurrentPage(num) {
        if (num) {
            setPagination({
                ...pagination,
                currentPage: num
            });
            updateCurrentViews(num, champions.searchResults);
        }
    };

    // ------------- Champion Search Ends -------------  //

    return (
        <ChampionsContext.Provider
            value={{
                ...champions,
                ...pagination,
                ...currentViews,
                handleSearch,
                prevPage,
                nextPage,
                setCurrentPage
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