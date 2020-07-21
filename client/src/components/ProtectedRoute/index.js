import React from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../../utils/UserContext";

function ProtectedRoute(props) {

    const Component = props.component;

    return (
        <UserConsumer>
            {
                value => {
                    return value.loggedIn ? (
                        <Component />
                    ) : (
                            <Redirect to="/login" />
                        )
                }
            }
        </UserConsumer>
    );
}

export default ProtectedRoute;