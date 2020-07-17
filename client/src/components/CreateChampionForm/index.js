import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { UserConsumer } from "../../utils/UserContext";

function CreateChampionForm() {

    // Create references for the input fields
    const nameRef = useRef();
    const imageRef = useRef();
    const raceRef = useRef();

    // Declare variable and states for the fields
    const [champion, setChampion] = useState({
        name: "",
        image: "",
        race: ""
    });

    // Clear the fields after clicking create
    function clearInput() {
        setTimeout(() => {
            setChampion({
                name: "",
                image: "",
                race: ""
            })
        }, 1500);
    };

    return (
        <form className="create-champion-form uk-child-width-1-2@m uk-height-1-1 uk-grid">
            <div>
                <div className="uk-margin-small uk-width-expand">
                    <div className="uk-inline uk-width-expand">
                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                        <input
                            className="uk-input"
                            type="text"
                            placeholder="champion_name"
                            ref={nameRef}
                            value={champion.name}
                            onChange={() => setChampion({
                                ...champion,
                                name: nameRef.current.value
                            })}
                        />
                    </div>
                </div>
                <div className="uk-margin-small uk-width-expand">
                    <div className="uk-inline uk-width-expand">
                        <span className="uk-form-icon" uk-icon="icon: reddit"></span>
                        <input
                            className="uk-input"
                            type="text"
                            placeholder="race"
                            ref={raceRef}
                            value={champion.race}
                            onChange={() => setChampion({
                                ...champion,
                                race: raceRef.current.value
                            })}
                        />
                    </div>
                </div>
                <div className="uk-margin-small uk-width-expand">
                    <div className="uk-inline uk-width-expand">
                        <span className="uk-form-icon" uk-icon="icon: image"></span>
                        <input
                            className="uk-input"
                            type="text"
                            placeholder="image_url"
                            ref={imageRef}
                            value={champion.image}
                            onChange={() => setChampion({
                                ...champion,
                                image: imageRef.current.value
                            })}
                        />
                    </div>
                </div>
                <div className="image-prev uk-margin-top">
                    {
                        champion.image ? <img src={champion.image} alt="Preview" /> : <p className="uk-text-small uk-text-mute">image preview</p>
                    }

                </div>
            </div>
            <UserConsumer>
                {
                    value => {
                        const { handleCreate } = value;
                        return (
                            <React.Fragment>
                                <div className="uk-margin-small">
                                    <Link to="/profile"><button className="uk-button outline-btn uk-modal-close uk-margin-small-right" type="button">Cancel</button></Link>
                                    <button
                                        className="uk-button primary-btn"
                                        type="submit"
                                        onClick={e => {
                                            handleCreate(e, champion.name, champion.image, champion.race);
                                            clearInput();
                                        }}
                                    >
                                        Create
                                    </button>
                                </div>
                            </React.Fragment>
                        )
                    }
                }
            </UserConsumer>
        </form>
    );
}

export default CreateChampionForm;