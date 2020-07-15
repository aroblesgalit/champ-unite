import React, { useState, useEffect } from "react";
import API from "./API";
import { set } from "mongoose";

const UsersContext = React.createContext();

// Provider
function UsersProvider(props) {

    const [users, setUsers] = useState({
        list: [],
        selectedUser: {},
        selectedChampId: "",
        selectedChampion: {},
        detailUser: {},
        rankings: []
    });

    useEffect(() => {
        getUsers();
    }, []);

    function fetchRankings(data) {
        const tempRankings = data.filter(user => user.rank).sort((a, b) => a.rank - b.rank);
        setUsers({
            ...users,
            rankings: tempRankings
        });
    };

    async function getUsers() {
        const { data } = await API.getAllUsers();
        fetchRankings(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].champions && data[i].champions.length > 0) {
                data[i].championsArr = [];
                const championsRes = await API.getChampionsByUserId(data[i]._id);
                data[i].championsArr = championsRes.data;
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

    async function handleDetailUser(id) {
        const userRes = users.list.find(user => user._id === id);
        console.log("Logging userRes...", userRes);
        setUsers({
            ...users,
            detailUser: userRes
        })
    };

    function handleUserSearch(e, query) {
        e.preventDefault();

        if (!query) {
            getUsers();
        }

        let lowercaseQuery = query.toLowerCase();
        let tempList = [...users.list];
        let filteredList = tempList.filter(user => user.username.includes(lowercaseQuery));
        setUsers({
            ...users,
            list: filteredList
        })
    };

    return (
        <UsersContext.Provider
            value={{
                ...users,
                handleChampionSelect,
                handleDetailUser,
                handleUserSearch
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