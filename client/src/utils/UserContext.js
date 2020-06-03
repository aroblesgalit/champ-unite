import React from "react";

const UserContext = React.createContext({
    loggedIn: false,
    username: "",
    rank: 0,
    wins: 0,
    losses: 0,
    champions: []
});

export default UserContext;