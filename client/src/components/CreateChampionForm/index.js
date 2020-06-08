import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";

function CreateChampionForm() {

    const [user, setUser] = useState({});

    const [maxReached, setMaxReached] = useState(false);
    const [championAdded, setChampionAdded] = useState(false);
    const [createFailed, setCreateFailed] = useState(false);

    useEffect(() => {
        API.getUserData()
            .then(user => {
                setUser({
                    isLoggedIn: true,
                    id: user.data.id,
                    champions: user.data.champions
                })
            })
            .catch(err => {
                console.log("Something went wrong when trying to get the user's data...", err);
                setUser({
                    isLoggedIn: false
                })
            })
    }, []);

    const nameRef = useRef();
    const imageRef = useRef();
    const raceRef = useRef();

    // Function to generate a random value from 1 - 100
    function generateStat() {
        return Math.floor((Math.random() * 100) + 1);
    }

    function calcBattleStat(a, b, c) {
        return ((a + b + c) / 30).toFixed();
    }

    const strength = generateStat();
    const power = generateStat();
    const combat = generateStat();
    const intelligence = generateStat();
    const speed = generateStat();
    const durability = generateStat();
    const attack = calcBattleStat(strength, power, combat);
    const defense = calcBattleStat(intelligence, speed, durability);

    async function handleAdd(e) {
        e.preventDefault();
        try {
            if (user.champions.length < 3) {
                const newUserChampion = await API.addChampion({
                    user: user.id,
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
                const updatedList = await API.updateUserChampions(user.id, newUserChampion.data._id);
                console.log("handleAdd worked...printing updatedList...", updatedList);
                setChampionAdded(true);
                window.location.replace("/profile");
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