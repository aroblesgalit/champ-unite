import React from "react";

const BattleContext = React.createContext();

// Provider
function BattleProvider(props) {
    return (
        <BattleContext.Provider>
            {props.children}
        </BattleContext.Provider>
    );
};

// Consumer
const BattleConsumer = BattleContext.Consumer;

export default BattleContext;
export { BattleProvider, BattleConsumer };