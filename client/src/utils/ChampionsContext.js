import React, { useState, useEffect } from "react";
import API from "./API";

const ChampionsContext = React.createContext();

// Provider
function ChampionsProvider(props) {

    const [champions, setChampions] = useState({
        db: []
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

    return (
        <ChampionsContext.Provider
            value={{
                ...champions
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