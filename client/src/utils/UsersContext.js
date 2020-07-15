import React, { useState, useEffect } from "react";
import API from "./API";

const UsersContext = React.createContext();

// Provider
function UsersProvider(props) {

    const [users, setUsers] = useState({
        list: [],
        selectedUser: {},
        selectedChampId: "",
        selectedChampion: {}
    });

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        const { data } = await API.getAllUsers();
        for (let i = 0; i < data.length; i++) {
            if (data[i].champions && data[i].champions.length > 0) {
                data[i].championsArr = [];
                for (let j = 0; j < data[i].champions.length; j++) {
                    const res = await API.getChampionById(data[i].champions[j])
                    data[i].championsArr[j] = res.data;
                }
            } else {
                data[i].championsArr = [];
            }
        }
        API.getUserData()
            .then(res => {
                let newTempUsers = data.filter(user => user._id !== res.data.id);
                setUsers({
                    ...users,
                    list: newTempUsers
                })
            })
            .catch(err => {
                console.log("User is NOT logged in.");
                setUsers({
                    ...users,
                    list: data
                });
            })

    };

    function handleChampionSelect(champions) {
        const champIndex = Math.floor(Math.random() * champions.length);

        setUsers({
            ...users,
            selectedChampId: champions[champIndex]
        });
    };

    return (
        <UsersContext.Provider
            value={{
                ...users,
                handleChampionSelect
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};

// Consumer
const UsersConsumer = UsersContext.Consumer;

export default UsersContext;
export { UsersProvider, UsersConsumer };