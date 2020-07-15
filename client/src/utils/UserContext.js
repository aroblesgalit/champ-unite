import React, { useState, useEffect } from "react";
import API from "./API";

const UserContext = React.createContext();

// Provider
function UserProvider(props) {

    const [user, setUser] = useState({
        loggedIn: false,
        info: {},
        champions: [],
        championSelected: false,
        selectedId: "",
        selectedChampion: {}
    });

    useEffect(() => {
        getUserData();
    }, [])

    async function getUserData() {
        const { data } = await API.getUserData();
        if (data) {
            getChampions(data.champions);
            setUser({
                ...user,
                loggedIn: true,
                info: data
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
        if (!champions) {
            return;
        }
        for (let i = 0; i < champions.length; i++) {
            API.getChampionById(champions[i])
                .then(res => {
                    newArr.push(res.data);
                    setUser({
                        ...user,
                        champions: newArr
                    });
                })
                .catch(err => {
                    console.log("Something went wrong while fetching the user's champions from useEffect...", err);
                })
        }
    };

    function handleSelect(id) {
        setUser({
            ...user,
            championSelected: true,
            selectedId: id,
        })
    }

    return (
        <UserContext.Provider
            value={{
                ...user,
                handleSelect
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