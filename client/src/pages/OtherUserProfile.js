import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { useParams } from "react-router-dom";

function OtherUserProfile() {

    const { username } = useParams();
    // Get user's data based on username from the html route

    return (
        <div className="user-profile-container">
            <ProfileHeader
                username="username"
                rank="0"
                wins="0"
                losses="0"
            />

            <div className="user-champions-container">
                <div className="uk-flex uk-flex-middle uk-flex-between">
                    <h3>Champions</h3>
                </div>
                <div className="champions-list-container uk-flex uk-flex-wrap">
                    {
                        // Champions go here
                    }
                </div>
            </div>
        </div>
    );
}

export default OtherUserProfile;