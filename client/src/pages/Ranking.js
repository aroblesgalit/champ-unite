import React, { useState, useEffect } from "react";
import "./pages.css";
import RankingRow from "../components/RankingRow";
import API from "../utils/API";

function Ranking() {

    const [rankedUsers, setRankedUsers] = useState([]);

    useEffect(() => {
        API.getAllUsersForRanking()
            .then(res => {
                console.log("useEffect from Ranking ran...printing res.data", res.data);
                setRankedUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <section className="ranking-container uk-section">
            <h2>Ranking</h2>
            <table className="uk-table uk-table-responsive uk-table-hover uk-table-middle uk-table-divider">
                <thead>
                    <tr>
                        <th className="uk-width-small">Rank</th>
                        <th className="uk-width-large">Username</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th># Battles</th>
                        <th>% Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rankedUsers.length > 0 ? (
                            rankedUsers.map((rankedUser, i) => {
                                return <RankingRow
                                    key={rankedUser._id}
                                    id={rankedUser._id}
                                    rank={i + 1}
                                    username={rankedUser.username}
                                    wins={rankedUser.wins}
                                    losses={rankedUser.losses}
                                    totalBattle={rankedUser.totalBattle}
                                    winsPercent={rankedUser.winsPercent}
                                />
                            })
                        ) : (
                                <tr>
                                    <td className="uk-text-nowrap uk-text-muted">
                                        Battle 20 times to be in the ranking!
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </section>
    );
}

export default Ranking;