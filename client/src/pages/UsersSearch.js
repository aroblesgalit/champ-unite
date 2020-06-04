import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import API from "../utils/API";

function UsersSearch() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.getAllUsers()
            .then(usersDB => {
                // console.log(usersDB.data);
                setUsers(usersDB.data);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <section className="uk-section users-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Search Users</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <button className="uk-search-icon-flip" uk-search-icon="true"></button>
                    <input className="uk-search-input" type="search" placeholder="Search for a user" />
                </form>
            </div>

            <div className="users-search-results uk-flex uk-flex-wrap">
                { 
                    users.map(user => {
                        return <UserCard 
                            key={user._id}
                            username={user.username}
                            rank={user.rank}
                            wins={user.wins}
                            losses={user.losses}
                        />
                    })
                }
            </div>
        </section>
    );
}

export default UsersSearch;