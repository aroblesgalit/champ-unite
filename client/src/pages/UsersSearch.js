import React, { useState, useEffect, useContext, useRef } from "react";
import UserCard from "../components/UserCard";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

function UsersSearch() {

    const [users, setUsers] = useState([]);

    const { id } = useContext(UserContext);

    const usernameRef = useRef();

    const [loggedUser, setLoggedUser] = useState({});
    const [loggedUserChampions, setLoggedUserChampions] = useState([]);

    useEffect(() => {
        if (id) {
            API.getAllUsersButOne(id)
                .then(usersDB => {
                    // console.log("User logged in...from UsersSearch...printing usersDB.data...", usersDB.data);
                    getChampArr(usersDB);
                })
                .catch(err => console.log(err));
            API.getUserData()
                .then(user => {
                    // console.log(user.data);
                    setLoggedUser({
                        isLoggedIn: true,
                        champions: user.data.champions
                    });

                    // Get user's champions
                    if (user.data.champions && user.data.champions.length > 0) {
                        // console.log("getUserChampions() is running...this is in the if statement...printing user.champions: ", user.champions);
                        const newArr = [];
                        for (let i = 0; i < user.data.champions.length; i++) {
                            // console.log("getUserChampions() is running...this is in the for-loop...printing user.champions[i]: ", user.champions[i]);
                            API.getChampionById(user.data.champions[i])
                                .then(res => {
                                    // res.data is the champion object
                                    newArr.push(res.data);
                                    // console.log("getChampionById() running from useEffect...printing newArr...", newArr);
                                })
                                .catch(err => {
                                    console.log("Something went wrong while fetching the user's champions from useEffect...", err);
                                })
                            // console.log("newArr: ", newArr)
                        }
                        setLoggedUserChampions(newArr);
                    }
                })
                .catch(err => {
                    console.log("Something went wrong while trying to getUserData...", err);
                    setLoggedUser({
                        isLoggedIn: false
                    })
                });
        } else {
            API.getAllUsers()
                .then(usersDB => {
                    // console.log("User not logged in...from UsersSearch...printing usersDB.data...", usersDB.data);
                    getChampArr(usersDB);
                })
                .catch(err => console.log(err));
        }

    }, [id]);

    // Get users champions as objects using the id's
    function getChampArr(arr) {
        const usersTemp = [...arr.data];
        usersTemp.forEach(user => {
            if (user.champions && user.champions.length > 0) {
                const champArr = [];
                for (let i = 0; i < user.champions.length; i++) {
                    // console.log("getOtherChampions() is running...this is in the for-loop...printing props.champions[i]: ", props.champions[i]);
                    API.getChampionById(user.champions[i])
                        .then(res => {
                            champArr.push(res.data);
                        })
                        .catch(err => console.log("Something went wrong while getChampionById...", err));
                }
                user.champArr = champArr;
            }
        })
        setUsers(usersTemp);
    }

    function handleSearch(e) {
        e.preventDefault();

        const usernameQuery = usernameRef.current.value;
        if (!usernameQuery) {
            return;
        }
        API.getUsersBySearch(usernameQuery)
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log("Something went wrong during the search...", err);
            })
    }


    return (
        <section className="uk-section users-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Search Users</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true" type="submit" onClick={(e) => handleSearch(e)}></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a user" ref={usernameRef} />
                </form>
            </div>

            <div className="users-search-results uk-flex uk-flex-wrap">
                {
                    users && users.length > 0 ? (
                        users.map(user => {
                            return <UserCard
                                key={user._id}
                                displayName={user.displayName}
                                username={user.username}
                                rank={user.rank}
                                wins={user.wins}
                                losses={user.losses}
                                champions={user.champions}
                                champArr={user.champArr}
                                loggedUser={loggedUser}
                                loggedUserChampions={loggedUserChampions}
                            />
                        })
                    ) : <p className="uk-text-warning">No users found by that query. Please try a different one.</p>
                }
            </div>
        </section>
    );
}

export default UsersSearch;