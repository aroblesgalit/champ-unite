import React, { useState } from "react";

const BattleContext = React.createContext();

// Provider
function BattleProvider(props) {

    const [battleStats, setBattleStats] = useState({
        started: false,
        timerDone: false,
        textDisplay: "",
        gameEnded: false
    });

    const [userChampion, setUserChampion] = useState({
        champion: {},
        health: 0,
        attack: 0,
        damage: 0
    });

    const [otherChampion, setOtherChampion] = useState({
        champion: {},
        health: 0,
        attack: 0,
        damage: 0
    });

    return (
        <BattleContext.Provider
            value={{
                ...battleStats,
                userChampion,
                otherChampion
            }}
        >
            {props.children}
        </BattleContext.Provider>
    );
};

// Consumer
const BattleConsumer = BattleContext.Consumer;

export default BattleContext;
export { BattleProvider, BattleConsumer };