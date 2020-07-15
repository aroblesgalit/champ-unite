import React from "react";
import "./pages.css";
import RankingRow from "../components/RankingRow";
import { UsersConsumer } from "../utils/UsersContext";

function Ranking() {
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
                    <UsersConsumer>
                        {
                            value => {
                                const { rankings } = value;
                                console.log(rankings);
                                return rankings.length > 0 ? (
                                    rankings.map((user, i) => {
                                        return <RankingRow
                                            key={user._id}
                                            id={user._id}
                                            rank={i + 1}
                                            displayName={user.displayName}
                                            username={user.username}
                                            wins={user.wins}
                                            losses={user.losses}
                                            totalBattle={user.totalBattle}
                                            winsPercent={user.winsPercent}
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
                        }
                    </UsersConsumer>
                </tbody>
            </table>
        </section>
    );
}

export default Ranking;