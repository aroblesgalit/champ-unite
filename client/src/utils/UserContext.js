import React, { useState, useEffect } from "react";
import API from "./API";

const UserContext = React.createContext();

// Provider
function UserProvider(props) {

    const [user, setUser] = useState({
        loggedIn: false,
        info: {},
        champions: []
    });

    useEffect(() => {
        getUserData();
    }, [])

    async function getUserData() {
        const { data } = await API.getUserData();
        if (data) {
            const championsArr = getChampions(data.champions);
            setUser({
                ...user,
                loggedIn: true,
                info: data,
                champions: championsArr
            });
        } else {
            setUser({
                ...user,
                loggedIn: false,
                info: {},
                champions: []
            });
        }
    };

    function getChampions(champions) {
        const newArr = [];
        for (let i = 0; i < champions.length; i++) {
            API.getChampionById(champions[i])
                .then(res => {
                    newArr.push(res.data);
                    return newArr;
                })
                .catch(err => {
                    console.log("Something went wrong while fetching the user's champions from useEffect...", err);
                    return newArr;
                })
        }
    };

    return (
        <UserContext.Provider
            value={{
                ...user
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

// Consumer
const UserConsumer = UserContext.Consumer;

export default UserContext;
export { UserProvider, UserConsumer };