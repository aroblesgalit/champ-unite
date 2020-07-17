import React, { useRef, useContext } from "react";
import "./pages.css";
import UserCard from "../components/UserCard";
import UsersContext, { UsersConsumer } from "../utils/UsersContext";

function UsersSearch() {

    // Get the event handler for searching users from UsersContext
    // When used, pass in the username reference's (below) value
    const { handleUserSearch } = useContext(UsersContext);

    // Declare username reference for the search field
    const usernameRef = useRef();

    return (
        <section className="uk-section users-search-container">
            <div className="uk-flex uk-flex-middle">
                <h2>Users</h2>
                <form className="uk-search uk-search-default uk-width-1-4@l uk-width-1-3@m uk-width-1-2@s uk-width-1-1">
                    <input
                        className="user-search-input uk-search-input"
                        type="search"
                        placeholder="Search for a user"
                        ref={usernameRef}
                        onChange={(e) => handleUserSearch(e, usernameRef.current.value)}
                    />
                    <span
                        className="uk-search-icon"
                        uk-search-icon="true"
                        // type="submit"
                    // onClick={(e) => handleUserSearch(e, usernameRef.current.value)}
                    />
                </form>
            </div>

            <div className="users-search-results uk-flex uk-flex-wrap uk-flex-center uk-flex-left@m">
                <UsersConsumer>
                    {
                        value => {
                            return (
                                value.list && value.list.length > 0 ? (
                                    value.list.map(user => {
                                        return <UserCard
                                            key={user._id}
                                            id={user._id}
                                            displayName={user.displayName}
                                            username={user.username}
                                            image={user.image}
                                            rank={user.rank}
                                            wins={user.wins}
                                            losses={user.losses}
                                            champions={user.champions}
                                        />
                                    })
                                ) : <p className="uk-text-warning">Loading users...</p>
                            )
                        }
                    }
                </UsersConsumer>
            </div>
        </section>
    );
}

export default UsersSearch;