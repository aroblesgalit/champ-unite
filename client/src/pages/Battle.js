import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import HealthBar from "../components/HealthBar";
import ChampionCard from "../components/ChampionCard";
import Sound from "react-sound";
import slash from "../sounds/442903__qubodup__slash.wav";
import battleSound from "../sounds/510953__theojt__cinematic-battle-song.mp3";
import UserContext from "../utils/UserContext";
import UsersContext from "../utils/UsersContext";

function Battle() {

    const { fetchUserData } = useContext(UserContext);
    const { getUsers } = useContext(UsersContext);

    const [battleStats, setBattleStats] = useState({
        started: false,
        timerDone: false,
        textDisplay: "",
        gameEnded: false,
    });

    // Play background music
    const [playMusic, setPlayMusic] = useState(false);

    // const [playerTurn, setPlayerTurn] = useState();

    // Get Champion IDs from the url to render their cards and health bar
    const { userid, otheruserid } = useParams();

    // Get user's and other user's data
    const [userData, setUserData] = useState({});
    const [otherData, setOtherData] = useState({});

    // console.log(userid, otheruserid);
    const [userAtkTurn, setUserAtkTurn] = useState();
    // User's champion's stats
    const [userChampion, setUserChampion] = useState({});
    const [userHealth, setUserHealth] = useState();
    const [userAttack, setUserAttack] = useState();
    const [userDamage, setUserDamage] = useState();
    // Other's champion's stats
    const [otherChampion, setOtherChampion] = useState({});
    const [otherHealth, setOtherHealth] = useState();
    const [otherAttack, setOtherAttack] = useState();
    const [otherDamage, setOtherDamage] = useState();
    // Battle speed
    // const [battleSpeed, setBattleSpeed] = useState();
    // const [speedToggleClicked, setSpeedToggleClicked] = useState(true);

    // let speedValue = 1000;

    useEffect(() => {
        loadChampionsAndUsers();
    }, []);

    // Toggle speed of battle
    // function toggleSpeed() {
    //     setSpeedToggleClicked(!speedToggleClicked);

    //     if (!speedToggleClicked) {
    //         speedValue = 500;
    //         setBattleSpeed(speedValue);
    //         console.log("Running toggleSpeed...this is the IF statement ------------------");
    //         console.log("speedToggleClicked value...", speedToggleClicked);
    //         console.log("battleSpeed value...", battleSpeed);
    //     } else {
    //         speedValue = 1000;
    //         setBattleSpeed(speedValue);
    //         console.log("Running toggleSpeed...this is the ELSE statement ------------------");
    //         console.log("speedToggleClicked value...", speedToggleClicked);
    //         console.log("battleSpeed value...", battleSpeed);
    //     }
    // }

    async function loadChampionsAndUsers() {
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
            const userDataRes = await API.getUserById(userChamp.data.user);
            const otherDataRes = await API.getUserById(otherChamp.data.user);
            setUserData(userDataRes.data);
            setOtherData(otherDataRes.data);
            // console.log("useEffect running...from battle...userDataRes.data...", userDataRes.data);
            // console.log("useEffect running...from battle...otherDataRes.data...", otherDataRes.data);
        } catch (err) {
            console.log("Something went wrong...could not loadChampionsAndUsers...", err);
        }
    }

    function hideStartBtn() {
        setTimeout(function () {
            setBattleStats({
                ...battleStats,
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
                    textDisplay: "FIGHT!"
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
        setPlayMusic(true);
        setBattleStats({
            ...battleStats,
            started: true
        });
        countDown();
        hideStartBtn();
    }

    let playerTurn = 0;
    let userHealthInit = 100;
    let otherHealthInit = 100;

    function userTurn() {
        // console.log("------------------------------------------");
        // console.log("Player 1 attacks");
        // get user's attack value
        // console.log("userAtk: ", userAttack);
        // randomize a number ranging between 1 and other defense
        const otherDef = Math.floor((Math.random() * otherChampion.defense) + 1);
        // console.log("otherDef: ", otherDef);
        // get the difference
        const damage = userAttack - otherDef;
        // console.log("damage: ", damage);
        // if difference is positive, subtract from other healthbar
        if (damage >= 0) {
            setOtherDamage(damage);
            setUserAtkTurn(true);
            // setOtherHealth(otherHealth - damage);
            otherHealthInit = otherHealthInit - damage;
            if (otherHealthInit <= 0) {
                setOtherHealth(0);
                // console.log("otherHealth: ", otherHealthInit);
            } else {
                setOtherHealth(otherHealthInit);
                // console.log("otherHealth: ", otherHealthInit);
            }
        } else {
            setOtherDamage(0);
            setUserAtkTurn(true);
        }
        // change playerturn
        // setPlayerTurn(1);
    }

    function otherTurn() {
        // console.log("------------------------------------------");
        // console.log("Player 2 attacks");
        // get user's attack value
        // console.log("otherAtk: ", otherAttack);
        // randomize a number ranging between 1 and other defense
        const userDef = Math.floor((Math.random() * userChampion.defense) + 1);
        // console.log("userDef: ", userDef);
        // get the difference
        const damage = otherAttack - userDef;
        // console.log("damage: ", damage);
        // if difference is positive, subtract from other healthbar
        if (damage >= 0) {
            setUserDamage(damage);
            setUserAtkTurn(false);
            // setUserHealth(userHealth - damage);
            userHealthInit = userHealthInit - damage;
            if (userHealthInit <= 0) {
                setUserHealth(0);
                // console.log("userHealth: ", userHealthInit);
            } else {
                setUserHealth(userHealthInit);
                // console.log("userHealth: ", userHealthInit);
            }

        } else {
            setUserDamage(0);
            setUserAtkTurn(false);
        }
        // change playerturn
        // setPlayerTurn(0);
    }

    async function updateOnUserWin() {
        // Increase User's wins and increase Other User's losses
        const newWinsUser = await API.increaseUserWins(userData._id);
        const newWinsOther = await API.increaseUserLosses(otherData._id);
        // Increase both user's totalBattle count
        const newTotalBattleUser = await API.increaseTotalBattle(userData._id);
        const newTotalBattleOther = await API.increaseTotalBattle(otherData._id);
        // console.log("updateOnUserWin...newWinsUser: ", newWinsUser, " - newWinsOther: ", newWinsOther, " - newTotalBattleUser: ", newTotalBattleUser, " - newTotalBattleOther: ", newTotalBattleOther);
        // Update states
        setUserData(newTotalBattleUser.data);
        setOtherData(newTotalBattleOther.data);
        // Update both user's winsPercent
        await API.updateWinsPercent(userData._id, {
            winsPercent: ((newTotalBattleUser.data.wins / newTotalBattleUser.data.totalBattle) * 100).toFixed()
        });
        await API.updateWinsPercent(otherData._id, {
            winsPercent: ((newTotalBattleOther.data.wins / newTotalBattleOther.data.totalBattle) * 100).toFixed()
        });
    }

    async function updateOnOtherWin() {
        // Increase User's losses and increase Other User's wins
        const newWinsUser = await API.increaseUserLosses(userData._id);
        const newWinsOther = await API.increaseUserWins(otherData._id);
        // Increase both user's totalBattle count
        const newTotalBattleUser = await API.increaseTotalBattle(userData._id);
        const newTotalBattleOther = await API.increaseTotalBattle(otherData._id);
        // console.log("updateOnOtherWin...newWinsUser: ", newWinsUser, " - newWinsOther: ", newWinsOther, " - newTotalBattleUser: ", newTotalBattleUser, " - newTotalBattleOther: ", newTotalBattleOther);
        // Update states
        setUserData(newTotalBattleUser.data);
        setOtherData(newTotalBattleOther.data);
        // Update both user's winsPercent
        await API.updateWinsPercent(userData._id, {
            winsPercent: ((newTotalBattleUser.data.wins / newTotalBattleUser.data.totalBattle) * 100).toFixed()
        });
        await API.updateWinsPercent(otherData._id, {
            winsPercent: ((newTotalBattleOther.data.wins / newTotalBattleOther.data.totalBattle) * 100).toFixed()
        });
    }

    function endGame() {
        if (userHealthInit <= 0) {
            setBattleStats({
                started: true,
                timerDone: true,
                textDisplay: "You lose.",
                gameEnded: true
            });
            updateOnOtherWin();
        } else if (otherHealthInit <= 0) {
            setBattleStats({
                started: true,
                timerDone: true,
                textDisplay: "You win!",
                gameEnded: true
            })
            updateOnUserWin();
        }
    }

    function startBattleAgain() {
        setTimeout(() => {
            startBattle();
        }, 500); // Set this value to a state for users to manipulate
    }

    function startBattle() {
        // if playerTurn is 0, user goes
        if (playerTurn === 0) {
            userTurn();
            playerTurn = 1;
            // Set a timeout to begin startBattle again
            if (otherHealthInit <= 0 || userHealthInit <= 0) {
                endGame();
                // console.log("You win!")
            } else {
                startBattleAgain();
            }
            // else playerTurn is 1, other goes
        } else if (playerTurn === 1) {
            otherTurn();
            playerTurn = 0;
            // Set a timeout to begin startBattle again
            if (userHealthInit <= 0 || otherHealthInit <= 0) {
                endGame();
                // console.log("You lose.")
            } else {
                startBattleAgain();
            }
        }
    }

    return (
        <section className="battle-container uk-flex uk-flex-column uk-flex-middle uk-position-relative">
            <div className="battle-top uk-flex uk-flex-top uk-width-expand uk-flex-between">
                <div className="uk-flex uk-flex-column uk-flex-middle uk-position-relative">
                    {
                        userAtkTurn ?
                            "" :
                            (
                                <span
                                    className="health-damage uk-position-absolute"
                                    style={{ display: battleStats.gameEnded ? "none" : "block" }}
                                >
                                    {userDamage}
                                    {
                                        userDamage ?
                                            <Sound
                                                url={slash}
                                                playStatus={Sound.status.PLAYING}
                                                playFromPosition={0 /* in milliseconds */}
                                            /> :
                                            ""
                                    }
                                </span>
                            )
                    }
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
                    <span className="battle-user-name"><span uk-icon="icon: user; ratio: .8"></span> {userData.username}</span>
                </div>
                {
                    <div className="battle-vs uk-flex uk-flex-column uk-flex-middle uk-margin-large-top">
                        {
                            !battleStats.started ?
                                <button className="uk-button primary-btn" style={{ display: battleStats.started ? "none" : "block" }} onClick={handleStart}>Start</button>
                                : (
                                    battleStats.timerDone ? (
                                        <React.Fragment>
                                            <div className="battle-text">{battleStats.textDisplay}</div>
                                            <Link to="/users" className="uk-link-reset">
                                                <button
                                                    className="uk-button secondary-btn"
                                                    style={{ display: battleStats.gameEnded ? "block" : "none" }}
                                                    onClick={() => {
                                                        fetchUserData();
                                                        getUsers();
                                                    }}
                                                >
                                                    Leave
                                            </button>
                                            </Link>
                                        </React.Fragment>
                                    ) : `${timeLeft}`
                                )

                        }

                    </div>
                }
                <div className="uk-flex uk-flex-column uk-flex-middle uk-position-relative">
                    {
                        userAtkTurn ?
                            (
                                <span
                                    className="health-damage uk-position-absolute"
                                    style={{ display: battleStats.gameEnded ? "none" : "block" }}
                                >
                                    {otherDamage}
                                    {
                                        otherDamage ?
                                            <Sound
                                                url={slash}
                                                playStatus={Sound.status.PLAYING}
                                                playFromPosition={0 /* in milliseconds */}
                                            /> :
                                            ""
                                    }</span>
                            )
                            :
                            ""
                    }
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
                    <span className="battle-user-name"><span uk-icon="icon: user; ratio: .8"></span> {otherData.username}</span>
                </div>
            </div>
            {
                // <div className="battle-speed-toggle-container uk-position-absolute">
                //     <div className={speedToggleClicked ? "battle-speed-toggle uk-flex uk-flex-left uk-flex-middle" : "battle-speed-toggle uk-flex uk-flex-right uk-flex-middle"} onClick={toggleSpeed}><div className="toggle-ball"></div></div>
                // </div>
            }
            {
                playMusic ?
                    <Sound
                        url={battleSound}
                        playStatus={Sound.status.PLAYING}
                        // playFromPosition={0 /* in milliseconds */}
                        loop={true}
                    /> :
                    ""
            }
        </section>
    );
}

export default Battle;