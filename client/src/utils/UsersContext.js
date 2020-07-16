import React, { useState, useEffect } from "react";
import API from "./API";

const UsersContext = React.createContext();

// Provider
function UsersProvider(props) {

    const [rankings, setRankings] = useState([]);

    const [users, setUsers] = useState({
        list: [],
        permList: [],
        selectedUser: {},
        selectedChampId: "",
        selectedChampion: {}
    });

    useEffect(() => {
        getUsers();
    }, []);

    function updateRankings(data) {
        // Filter data into array of users with rank value and sort it based on winsPercent
        // Then set each of their rank value to their new index based on the sort
        // Finally, update these users in the database
        const tempRankings = data.filter(user => user.totalBattle >= 20).sort((a, b) => b.winsPercent - a.winsPercent);
        tempRankings.forEach((user, index) => {
            user.rank = index + 1;
            API.updateWinsPercent(user._id, { rank: user.rank });
        });
        setRankings(tempRankings);
    };

    async function getUsers() {
        const { data } = await API.getAllUsers();
        updateRankings(data);
        // Check if a user is logged in
        // If so, filter the list of users so it doesn't include the authenticated user
        API.getUserData()
            .then(res => {
                let newTempUsers = data.filter(user => user._id !== res.data.id);
                setUsers({
                    ...users,
                    list: newTempUsers,
                    permList: newTempUsers
                })
            })
            .catch(() => {
                console.log("User is NOT logged in.");
                setUsers({
                    ...users,
                    list: data,
                    permList: data
                });
            })
    };

    function handleChampionSelect(champions) {
        const champIndex = Math.floor(Math.random() * champions.length);

        setUsers({
            ...users,
            selectedChampId: champions[champIndex]._id
        });
    };

    function handleUserSearch(e, query) {
        e.preventDefault();

        if (!query) {
            setUsers({
                users,
                list: users.permList
            })
        }

        let lowercaseQuery = query.toLowerCase();
        let tempList = [...users.permList];
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
                rankings,
                handleChampionSelect,
                handleUserSearch,
                getUsers
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