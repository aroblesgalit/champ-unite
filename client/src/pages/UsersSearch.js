import React, { useState, useEffect, useContext, useRef } from "react";
import UserCard from "../components/UserCard";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

function UsersSearch() {

    const [users, setUsers] = useState([]);

    const { id } = useContext(UserContext);

    const usernameRef = useRef();

    useEffect(() => {
        if (id) {
            API.getAllUsersButOne(id)
            .then(usersDB => {
                // console.log("User logged in...from UsersSearch...printing usersDB.data...", usersDB.data);
                getChampArr(usersDB);
            })
            .catch(err => console.log(err));
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
                    <button className="uk-search-icon-flip" uk-search-icon="true" type="submit" onClick={handleSearch}></button>
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
                            />
                        })
                    ) : <p className="uk-text-warning">No users found by that query. Please try a different one.</p>
                }
            </div>
        </section>
    );
}

export default UsersSearch;