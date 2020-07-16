import React, { useRef } from "react";
import "./style.css";
import { UserConsumer } from "../../utils/UserContext";

function CreateChampionForm() {

    // Create references for the input fields
    const nameRef = useRef();
    const imageRef = useRef();
    const raceRef = useRef();

    return (
        <form className="create-champion-form uk-flex uk-flex-column uk-flex-middle uk-height-1-1">
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" placeholder="champion_name" ref={nameRef} />
                </div>
            </div>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: image"></span>
                    <input className="uk-input" type="text" placeholder="image_url" ref={imageRef} />
                </div>
            </div>
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: reddit"></span>
                    <input className="uk-input" type="text" placeholder="race" ref={raceRef} />
                </div>
            </div>
            <UserConsumer>
                {
                    value => {
                        const { handleCreate, maxReached, championAdded, createFailed } = value;
                        return (
                            <React.Fragment>
                                <div className="uk-margin-small">
                                    <button className="uk-button primary-btn" type="submit" onClick={e => handleCreate(e, nameRef.current.value, imageRef.current.value, raceRef.current.value)} >Create</button>
                                </div>
                                {
                                    maxReached ? (
                                        <div className="max-reached-alert uk-alert-danger uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                                            <p>You've reached the max of 3 champions! Please make room if you'd like to add another.</p>
                                        </div>
                                    ) : ""
                                }
                                {
                                    championAdded ? (
                                        <div className="champion-added-alert uk-alert-success uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                                            <p>Champion successfuly added to your list!</p>
                                        </div>
                                    ) : ""
                                }
                                {
                                    createFailed ? (
                                        <div className="max-reached-alert uk-alert-danger uk-position-fixed uk-animation-fade uk-animation-slide-bottom uk-animation-fast" uk-alert="true">
                                            <p>Please fill in all the fields.</p>
                                        </div>
                                    ) : ""
                                }
                            </React.Fragment>
                        )
                    }
                }
            </UserConsumer>
        </form>
    );
}

export default CreateChampionForm;