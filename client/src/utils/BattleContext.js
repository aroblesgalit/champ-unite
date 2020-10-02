import React, { useState } from "react";

const BattleContext = React.createContext();

// Provider
function BattleProvider(props) {

    const [battleStats, setBattleStats] = useState({
        started: false,
        timerDone: false,
        textDisplay: "",
        gameEnded: false
    })

    return (
        <BattleContext.Provider
            value={{
                ...battleStats
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