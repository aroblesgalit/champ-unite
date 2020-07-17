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

    const [createChamp, setCreateChamp] = useState({
        maxReached: false,
        championAdded: false,
        createFailed: false
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


    // ------------ Champion Create Begins ------------ //

    // Declare variabe for a timeout for resetting states
    let resetCreateTimeout;

    // Function to generate a random value from 1 - 100
    function generateVal() {
        return Math.floor((Math.random() * 100) + 1);
    };

    // Function to calculate attack and defense
    function calcBattleStat(a, b, c) {
        return ((a + b + c) / 30).toFixed();
    };

    // Declare variables for stats
    let strength, power, combat, intelligence, speed, durability;
    let attack, defense;

    // Function to generate all the stats at once
    function generateStats() {
        // Generate values for strength, power, combat, intelligence, speed, and durability
        strength = generateVal();
        power = generateVal();
        combat = generateVal();
        intelligence = generateVal();
        speed = generateVal();
        durability = generateVal();
        // Calculate the attack and defense based on the above stats
        attack = calcBattleStat(strength, power, combat);
        defense = calcBattleStat(intelligence, speed, durability);
    };

    // Add the new champion to the datbase
    // and update the authenticated user's champions by adding this new one
    async function handleCreate(e, name, image, race) {
        e.preventDefault();
        clearTimeout(resetCreateTimeout);
        generateStats();
        try {
            if (user.info.champions.length < 3) {
                if (name && image) {
                    const newUserChampion = await API.addChampion({
                        user: user.info._id,
                        name: name,
                        image: image,
                        race: race,
                        strength: strength,
                        power: power,
                        combat: combat,
                        intelligence: intelligence,
                        speed: speed,
                        durability: durability,
                        attack: attack,
                        defense: defense
                    });
                    const updatedList = await API.updateUserChampions(user.info._id, newUserChampion.data._id);
                    setCreateChamp({
                        ...createChamp,
                        championAdded: true
                    });
                    resetCreateStates();
                    // window.location.replace("/profile");
                    fetchUserData();
                } else {
                    setCreateChamp({
                        ...createChamp,
                        createFailed: true
                    });
                    resetCreateStates();
                }
            } else {
                console.log("You've reached the max number of champions on your list! Please make room if you'd like to add another.");
                setCreateChamp({
                    ...createChamp,
                    maxReached: true
                });
                resetCreateStates();
            }
        } catch (err) {
            setCreateChamp({
                ...createChamp,
                createFailed: true
            });
            resetCreateStates();
        }
    };

    // Reset for statess
    function resetCreateStates() {
        resetCreateTimeout = setTimeout(() => {
            setCreateChamp({
                maxReached: false,
                championAdded: false,
                createFailed: false
            });
        }, 3000);
    };

    // ------------ Champion Create Ends ------------ //


    // ------------ Champion Card Begins ------------ //

    // Function to delete champion from the champion model
    function handleDelete(id) {
        API.removeChampion(id)
            .then(() => {
                fetchUserData();
            })
            .catch(err => console.log("Something went wrong while trying to delete the champion from the database...", err));
    };

    // Add the new champion to the datbase using the existing stats
    // If stats are null, then generate values
    // and update the authenticated user's champions by adding this new one
    async function handleAdd(champion) {
        clearTimeout(resetCreateTimeout);
        try {
            if (user.info.champions.length < 3) {
                setCreateChamp({
                    ...createChamp,
                    championAdded: true
                });
                resetCreateStates();

                if (champion.nullStats) {
                    generateStats();

                    const newUserChampion = await API.addChampion({
                        user: user.info._id,
                        name: champion.name,
                        image: champion.image,
                        strength: strength,
                        power: power,
                        combat: combat,
                        intelligence: intelligence,
                        speed: speed,
                        durability: durability,
                        attack: attack,
                        defense: defense,
                        nullStats: champion.nullStats
                    })
                    // Update user's champions array
                    await API.updateUserChampions(user.info._id, newUserChampion.data._id);
                    fetchUserData();
                } else {
                    const newUserChampion = await API.addChampion({
                        user: user.info.id,
                        name: champion.name,
                        image: champion.image,
                        strength: champion.strength,
                        power: champion.power,
                        combat: champion.combat,
                        intelligence: champion.intelligence,
                        speed: champion.speed,
                        durability: champion.durability,
                        attack: champion.attack,
                        defense: champion.defense,
                        nullStats: champion.nullStats
                    })
                    // Update user's champions array
                    await API.updateUserChampions(user.info._id, newUserChampion.data._id);
                    fetchUserData();
                }
            } else {
                setCreateChamp({
                    ...createChamp,
                    maxReached: true
                });
                resetCreateStates();
            }
        } catch (err) {
            console.log("Add failed: ", err);
            setCreateChamp({
                ...createChamp,
                createFailed: true
            });
            resetCreateStates();
        }
    }

    // ------------ Champion Card Ends ------------ //

    return (
        <UserContext.Provider
            value={{
                ...user,
                ...battle,
                ...createChamp,
                handleSelect,
                handleLogin,
                handleLogout,
                handleModal,
                fetchUserData,
                updateUserImage,
                handleImageModal,
                handleBattleMode,
                handleCreate,
                handleDelete,
                handleAdd
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