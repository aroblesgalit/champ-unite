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
        selectedChampion: {},
        champModalOpen: false,
        battleMode: false
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    function fetchUserData() {
        API.getUserData()
            .then(async function(res) {
                const championsRes = await API.getChampionsByUserId(res.data.id);
                setUser({
                    ...user,
                    loggedIn: true,
                    info: res.data,
                    champions: championsRes.data,
                    battleMode: false
                });
            })
            .catch(() => {
                console.log("User is NOT logged in.");
                setUser({
                    ...user,
                    loggedIn: false,
                    info: {},
                    champions: [],
                    battleMode: false
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
                // fetchUserData();
                // setUser({
                //     ...user,
                //     loggedIn: true
                // })
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

    function handleLogout() {
        API.logoutUser()
            .then(() => {
                console.log("User logged out.");
                setUser({
                    ...user,
                    loggedIn: false
                });
                fetchUserData();
            })
            .catch(err => {
                console.log("Something went wrong while trying to log out...", err);
            })
    };

    function handleAlertClose() {
        setTimeout(() => {
            setUser({
                ...user,
                loginFailed: false
            })
        }, 3000);
    };

    function handleSelect(id) {
        setUser({
            ...user,
            championSelected: true,
            selectedId: id
        })
    };

    function handleModal() {
        setUser({
            ...user,
            champModalOpen: !user.champModalOpen,
            battleMode: true
        })
        console.log("handleModal ran...", user.champModalOpen);
    };

    async function updateUserImage(id, data) {
        const res = API.updateWinsPercent(id, data);
        console.log(res);
        fetchUserData();
    };

    return (
        <UserContext.Provider
            value={{
                ...user,
                handleSelect,
                handleLogin,
                handleLogout,
                handleModal,
                fetchUserData,
                updateUserImage
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