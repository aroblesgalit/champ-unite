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

    const { userid, otheruserid } = useParams();

    console.log(userid, otheruserid);

    const [userChampion, setUserChampion] = useState({});
    const [otherChampion, setOtherChampion] = useState({});
    const [userStats, setUserStats] = useState({
        health: 100
    });
    const [otherStats, setOtherStats] = useState({
        health: 100
    });

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
            // console.log("useEffect running...from battle...userChamp.data...", userChamp);
            // console.log("useEffect running...from battle...otherChamp.data...", otherChamp);
        } catch (err) {
            console.log(err);
        }
    }

    function hideStartBtn() {
        setTimeout(function() {
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
    }

    function handleStart() {
        setBattleStats({
            started: true
        });
        countDown();
        hideStartBtn();
    }

    return (
        <section className="battle-container uk-flex uk-flex-column uk-flex-middle">
            <div className="uk-flex uk-flex-top uk-flex-between uk-width-expand">
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <HealthBar
                        type="user"
                        image={userChampion.image}
                        name={userChampion.name}
                        health={userStats.health}
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
                        health={otherStats.health}
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