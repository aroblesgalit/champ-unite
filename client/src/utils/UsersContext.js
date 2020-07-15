import React, { useState, useContext } from "react";
import API from "./API";
import UserContext from "./UserContext";

const UsersContext = React.createContext();

// Provider
function UsersProvider(props) {

    const { info, loggedIn } = useContext(UserContext);

    const [users, setUsers] = useState({
        list: []
    });

    useEffect(() => {
        getUsers();
    }, [])

    function getUsers() {
        API.getAllUsers()
            .then(res => {
                let tempUsers = [...res.data];
                for (let i = 0; i < tempUsers.length; i++) {
                    let championIds = tempUsers[i].champions;
                    tempUsers[i].championsArr = getChampions(championIds);
                }
                if (loggedIn) {
                    let newTempUsers = tempUsers.filter(users => users._id !== info.id);
                    setUsers({
                        ...users,
                        list: newTempUsers
                    })
                } else {
                    setUsers({
                        ...users,
                        list: tempUsers
                    });
                }
            })
            .catch(err => {
                console.log("Something went wrong while fetching users...", err);
            })
    };

    function getChampions(champions) {
        const newArr = [];
        for (let j = 0; j < champions.length; j++) {
            API.getChampionById(champions[j])
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
        <UsersContext.Provider

        >
            {props.children}
        </UsersContext.Provider>
    );
};

// Consumer
const UsersConsumer = UsersContext.Consumer;

export default UsersContext;
export { UsersProvider, UsersConsumer };