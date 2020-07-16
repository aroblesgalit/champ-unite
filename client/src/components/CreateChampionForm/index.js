import React, { useRef, useState, useContext } from "react";
import "./style.css";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";

function CreateChampionForm() {

    // Get authenticated user's info from UserContext
    const { info } = useContext(UserContext);

    const [maxReached, setMaxReached] = useState(false);
    const [championAdded, setChampionAdded] = useState(false);
    const [createFailed, setCreateFailed] = useState(false);

    // Create references for the input fields
    const nameRef = useRef();
    const imageRef = useRef();
    const raceRef = useRef();

    // Function to generate a random value from 1 - 100
    function generateStat() {
        return Math.floor((Math.random() * 100) + 1);
    }

    // Function to calculate attack and defense
    function calcBattleStat(a, b, c) {
        return ((a + b + c) / 30).toFixed();
    }

    // Generate values for strength, power, combat, intelligence, speed, and durability
    const strength = generateStat();
    const power = generateStat();
    const combat = generateStat();
    const intelligence = generateStat();
    const speed = generateStat();
    const durability = generateStat();
    // Calculate the attack and defense based on the above stats
    const attack = calcBattleStat(strength, power, combat);
    const defense = calcBattleStat(intelligence, speed, durability);

    // Add the new champion to the datbase
    // and update the authenticated user's champions by adding this new one
    async function handleAdd(e) {
        e.preventDefault();
        try {
            if (info.champions.length < 3) {
                if (nameRef.current.value && imageRef.current.value) {
                    const newUserChampion = await API.addChampion({
                        user: info._id,
                        name: nameRef.current.value,
                        image: imageRef.current.value,
                        race: raceRef.current.value,
                        strength: strength,
                        power: power,
                        combat: combat,
                        intelligence: intelligence,
                        speed: speed,
                        durability: durability,
                        attack: attack,
                        defense: defense
                    });
                    console.log("handleAdd worked...printing newUserChampion...", newUserChampion);
                    const updatedList = await API.updateUserChampions(info._id, newUserChampion.data._id);
                    console.log("handleAdd worked...printing updatedList...", updatedList);
                    setChampionAdded(true);
                    window.location.replace("/profile");
                } else {
                    setCreateFailed(true);
                    setTimeout(() => {
                        setCreateFailed(false);
                    }, 4000);
                }
            } else {
                console.log("You've reached the max number of champions on your list! Please make room if you'd like to add another.");
                setMaxReached(true);
                setTimeout(() => {
                    setMaxReached(false);
                }, 4000);
            }
        } catch (err) {
            console.log("Add failed: ", err);
            setCreateFailed(true);
            setTimeout(() => {
                setCreateFailed(false);
            }, 3000);
        }
    }

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
            <div className="uk-margin-small">
                <button className="uk-button primary-btn" type="submit" onClick={handleAdd} >Create</button>
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
        </form>
    );
}

export default CreateChampionForm;