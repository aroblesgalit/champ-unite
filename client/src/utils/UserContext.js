import React, { useState, useEffect } from "react";
import API from "./API";

const UserContext = React.createContext();

// Provider
function UserProvider(props) {

    const [user, setUser] = useState({
        loggedIn: false,
        loginFailed: false,
        info: {},
        champions: [],
        championSelected: false,
        selectedId: "",
        selectedChampion: {}
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    function fetchUserData() {
        API.getUserData()
            .then(res => {
                console.log("Console logging res.data.champions from fetchUserData...", res.data.champions);
                setUser({
                    ...user,
                    loggedIn: true,
                    info: res.data,
                    champions: getChampions(res.data.champions)
                });
            })
            .catch(err => {
                console.log("Something went wrong while fetching user_data. User may not be logged in...", err);
                setUser({
                    ...user,
                    loggedIn: false,
                    info: {},
                    champions: []
                });
            })
    };

    function handleLogin(e, username, password) {
        e.preventDefault();

        API.loginUser({
            username: username,
            password: password
        })
            .then(() => {
                setUser({
                    ...user,
                    loggedIn: true
                })
                window.location.replace("/profile");
                console.log("You are now logged in.");
            })
            .catch(function (err) {
                console.log("Something went wrong during login...", err);
                setUser({
                    ...user,
                    loginFailed: true
                })
            });

        handleAlertClose();
    };

    function handleAlertClose() {
        setTimeout(() => {
            setUser({
                ...user,
                loginFailed: false
            })
        }, 3000);
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
                })
                .catch(err => {
                    console.log("Something went wrong while fetching the user's champions from useEffect...", err);
                })
        }
        console.log("Console logging newArr...", newArr);
        return newArr;
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
                handleSelect,
                handleLogin
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