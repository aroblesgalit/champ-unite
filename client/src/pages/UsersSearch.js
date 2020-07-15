import React, { useState, useContext, useRef } from "react";
import UserCard from "../components/UserCard";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import { UsersConsumer } from "../utils/UsersContext";

function UsersSearch() {

    const [users, setUsers] = useState([]);

    const { info } = useContext(UserContext);

    const usernameRef = useRef();

    // useEffect(() => {
    //     if (info.id) {
    //         API.getAllUsersButOne(info.id)
    //             .then(usersDB => {
    //                 console.log("User logged in...from UsersSearch...printing usersDB.data...", usersDB.data);
    //                 setUsers(usersDB.data);
    //             })
    //             .catch(err => console.log(err));
    //     } else {
    //         API.getAllUsers()
    //             .then(usersDB => {
    //                 // console.log("User not logged in...from UsersSearch...printing usersDB.data...", usersDB.data);
    //                 setUsers(usersDB.data);
    //             })
    //             .catch(err => console.log(err));
    //     }

    // }, [info.id]);

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
                <UsersConsumer>
                    {
                        value => {
                            return ( 
                                value.list && value.list.length > 0 ? (
                                    value.list.map(user => {
                                        return <UserCard
                                            key={user._id}
                                            displayName={user.displayName}
                                            username={user.username}
                                            rank={user.rank}
                                            wins={user.wins}
                                            losses={user.losses}
                                            champions={user.champions}
                                            championsArr={user.championsArr}
                                        />
                                    })
                                ) : <p className="uk-text-warning">No users found by that query. Please try a different one.</p>
                            )
                        }
                    }
                </UsersConsumer>
            </div>
        </section>
    );
}

export default UsersSearch;