import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import HealthBar from "../components/HealthBar";
import ChampionCard from "../components/ChampionCard";

function Battle() {

    const [battleStats, setBattleStats] = useState({
        started: false,
        timerDone: false
    });

    // const [playerTurn, setPlayerTurn] = useState();

    // Get Champion IDs from the url to render their cards and health bar
    const { userid, otheruserid } = useParams();

    // console.log(userid, otheruserid);

    // User's champion's stats
    const [userChampion, setUserChampion] = useState({});
    const [userHealth, setUserHealth] = useState();
    const [userAttack, setUserAttack] = useState();
    // Other's champion's stats
    const [otherChampion, setOtherChampion] = useState({});
    const [otherHealth, setOtherHealth] = useState();
    const [otherAttack, setOtherAttack] = useState();

    // attack, combat, defense, durability, image, intelligence, name, power, speed, strength, user, _id

    useEffect(() => {
        loadChampions();
    }, []);

    async function loadChampions() {
        try {
            const userChamp = await API.getChampionById(userid);
            const otherChamp = await API.getChampionById(otheruserid);
            setUserChampion(userChamp.data);
            setOtherChampion(otherChamp.data);
            setUserAttack(userChamp.data.attack);
            setUserHealth(100);
            setOtherAttack(otherChamp.data.attack);
            setOtherHealth(100);
            // setPlayerTurn(0);
            // console.log("useEffect running...from battle...userChamp.data...", userChamp.data);
            // console.log("useEffect running...from battle...otherChamp.data...", otherChamp.data);
        } catch (err) {
            console.log(err);
        }
    }

    function hideStartBtn() {
        setTimeout(function () {
            setBattleStats({
                started: true
            })
        }, 1000)
    }

    const [timeLeft, setTimeLeft] = useState(3);

    function countDown() {
        let currentTime = 3;
        const countDown = setInterval(function () {
            if (currentTime <= 0) {
                clearInterval(countDown);
                setBattleStats({
                    started: true,
                    timerDone: true,
                });
            } else {
                currentTime--;
            }
            setTimeLeft(currentTime);
        }, 1000)
        setTimeout(() => {
            startBattle();
        }, 5000)
    }

    function handleStart() {
        setBattleStats({
            started: true
        });
        countDown();
        hideStartBtn();
    }

    let playerTurn = 0;
    let userHealthInit = 100;
    let otherHealthInit = 100;

    function userTurn() {
        console.log("------------------------------------------");
        console.log("Player 1 attacks");
        // get user's attack value
        console.log("userAtk: ", userAttack);
        // randomize a number ranging between 1 and other defense
        const otherDef = Math.floor((Math.random() * otherChampion.defense) + 1);
        console.log("otherDef: ", otherDef);
        // get the difference
        const damage = userAttack - otherDef;
        console.log("damage: ", damage);
        // if difference is positive, subtract from other healthbar
        if (damage >= 0) {
            // setOtherHealth(otherHealth - damage);
            otherHealthInit = otherHealthInit - damage;
            setOtherHealth(otherHealthInit);
            console.log("otherHealth: ", otherHealth);
            return otherHealth;
        }
        // change playerturn
        // setPlayerTurn(1);
    }

    function otherTurn() {
        console.log("------------------------------------------");
        console.log("Player 2 attacks");
        // get user's attack value
        console.log("otherAtk: ", otherAttack);
        // randomize a number ranging between 1 and other defense
        const userDef = Math.floor((Math.random() * userChampion.defense) + 1);
        console.log("userDef: ", userDef);
        // get the difference
        const damage = otherAttack - userDef;
        console.log("damage: ", damage);
        // if difference is positive, subtract from other healthbar
        if (damage >= 0) {
            // setUserHealth(userHealth - damage);
            userHealthInit = userHealthInit - damage;
            setUserHealth(userHealthInit);
            console.log("userHealth: ", userHealth);
            return userHealth;
        }
        // change playerturn
        // setPlayerTurn(0);
    }

    function startBattleAgain() {
        setTimeout(() => {
            startBattle();
        }, 3000);
    }

    function startBattle() {
        // if playerTurn is 0, user goes
        if (playerTurn === 0) {
            userTurn();
            playerTurn = 1;
            // Set a timeout to begin startBattle again
            startBattleAgain();
        // else playerTurn is 1, other goes
        } else if (playerTurn === 1) {
            otherTurn();
            playerTurn = 0;
            // Set a timeout to begin startBattle again
            startBattleAgain();
        }
    }

    return (
        <section className="battle-container uk-flex uk-flex-column uk-flex-middle">
            <div className="uk-flex uk-flex-top uk-flex-between uk-width-expand">
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <HealthBar
                        type="user"
                        image={userChampion.image}
                        name={userChampion.name}
                        health={userHealth}
                    />
                    <ChampionCard
                        type="none"
                        name={userChampion.name}
                        image={userChampion.image}
                        attack={userChampion.attack}
                        defense={userChampion.defense}
                        strength={userChampion.strength}
                        combat={userChampion.combat}
                        power={userChampion.power}
                        intelligence={userChampion.intelligence}
                        durability={userChampion.durability}
                        speed={userChampion.speed}
                    />
                    <span className="battle-user-name">Username</span>
                </div>
                <div className="battle-vs uk-flex uk-flex-column uk-flex-middle">
                    <h2>BATTLE</h2>
                    {
                        battleStats.timerDone ? (
                            <span>VS</span>
                        ) : `${timeLeft}`
                    }
                    {
                        battleStats.timerDone ? (
                            <div className="battle-text">FIGHT!</div>
                        ) : ""
                    }
                </div>
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <HealthBar
                        type="otherUser"
                        image={otherChampion.image}
                        name={otherChampion.name}
                        health={otherHealth}
                    />
                    <ChampionCard
                        type="none"
                        name={otherChampion.name}
                        image={otherChampion.image}
                        attack={otherChampion.attack}
                        defense={otherChampion.defense}
                        strength={otherChampion.strength}
                        combat={otherChampion.combat}
                        power={otherChampion.power}
                        intelligence={otherChampion.intelligence}
                        durability={otherChampion.durability}
                        speed={otherChampion.speed}
                    />
                    <span className="battle-user-name">Username</span>
                </div>
            </div>
            <button className="uk-button primary-btn" style={{ display: battleStats.started ? "none" : "block" }} onClick={handleStart}>Start</button>

        </section>
    );
}

export default Battle;