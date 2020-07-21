import React from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../../utils/UserContext";

function PublicRoute(props) {

    const Component = props.component;

    return (
        <UserConsumer>
            {
                value => {
                    return value.loggedIn ? (
                        <Redirect to="/profile" />
                    ) : (
                            <Component />
                        )
                }
            }
        </UserConsumer>
    );
}

export default PublicRoute;