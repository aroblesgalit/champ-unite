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
                console.log("From UsersSearch...printing usersDB.data...", usersDB.data);
                setUsers(usersDB.data);
            })
            .catch(err => console.log(err));
        } else {
            API.getAllUsers()
            .then(usersDB => {
                console.log("From UsersSearch...printing usersDB.data...", usersDB.data);
                setUsers(usersDB.data);
            })
            .catch(err => console.log(err));
        }
        
    }, []);

    function handleSearch(e) {
        e.preventDefault();

        const usernameQuery = usernameRef.current.value;
        API.getUserByUsername(usernameQuery)
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
                                username={user.username}
                                rank={user.rank}
                                wins={user.wins}
                                losses={user.losses}
                                champions={user.champions}
                            />
                        })
                    ) : <p className="uk-text-nowrap uk-text-muted">No users found by that query. Please try a different one.</p>
                }
            </div>
        </section>
    );
}

export default UsersSearch;