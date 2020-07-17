import React from "react";
import { UserConsumer } from "../../utils/UserContext";

function ChampionCardAlerts() {
    return (
        <UserConsumer>
            {
                value => {
                    const { maxReached, championAdded, createFailed, statGenOut } = value;
                    return (
                        <React.Fragment>
                            {
                                maxReached ? (
                                    <div className="max-reached-alert uk-alert-danger uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                                        <p>You've reached the max of 3 champions! Please make room if you'd like to add another.</p>
                                    </div>
                                ) : (
                                        championAdded ? (
                                            <div className="champion-added-alert uk-alert-success uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                                                <p>Champion successfuly added to your list!</p>
                                            </div>
                                        ) : (
                                                createFailed ? (
                                                    <div className="max-reached-alert uk-alert-danger uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                                                        <p>Please fill in all the fields.</p>
                                                    </div>
                                                ) : statGenOut ? (
                                                    <div className="max-reached-alert uk-alert-danger uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" animation="true" duration={200} uk-alert="true">
                                                        <p>You're out of chances.</p>
                                                    </div>
                                                ) : ""
                                            )
                                    )
                            }
                        </React.Fragment>
                    )
                }
            }
        </UserConsumer>
    );
}

export default ChampionCardAlerts;