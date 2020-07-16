import React, { useState, useEffect } from "react";
import API from "./API";

const UserContext = React.createContext();

// Provider
function UserProvider(props) {

    const [battle, setBattle] = useState({
        battleMode: false,
        championSelected: false,
        selectedId: ""
    });

    const [user, setUser] = useState({
        loggedIn: false,
        loginFailed: false,
        info: {},
        champModalOpen: false,
        imageModalOpen: false
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    function fetchUserData() {
        API.getUserData()
            .then(res => {
                setUser({
                    ...user,
                    loggedIn: true,
                    info: res.data,
                    battleMode: false,
                    imageModalOpen: false
                });
            })
            .catch(() => {
                console.log("User is NOT logged in.");
                setUser({
                    ...user,
                    loggedIn: false,
                    info: {},
                    battleMode: false,
                    imageModalOpen: false
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
                window.location.replace("/profile");
                console.log("You are now logged in.");
            })
            .catch(err => {
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
        setBattle({
            ...battle,
            championSelected: true,
            selectedId: id
        })
    };

    function handleModal() {
        setUser({
            ...user,
            champModalOpen: !user.champModalOpen
        })
    };

    function handleBattleMode() {
        setBattle({
            ...battle,
            battleMode: true
        })
    };

    async function updateUserImage(e, id, data) {
        e.preventDefault();

        const res = await API.updateWinsPercent(id, data);
        console.log("Logging result from updating user's image...", res);
        fetchUserData();
    };

    function handleImageModal(e) {
        e.preventDefault();

        setUser({
            ...user,
            imageModalOpen: !user.imageModalOpen
        })
        console.log("image modal is open...", !user.imageModalOpen)
    };

    return (
        <UserContext.Provider
            value={{
                ...user,
                ...battle,
                handleSelect,
                handleLogin,
                handleLogout,
                handleModal,
                fetchUserData,
                updateUserImage,
                handleImageModal,
                handleBattleMode
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