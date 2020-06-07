import React from "react";
import "./pages.css";
import RankingRow from "../components/RankingRow";

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
                    <RankingRow />
                </tbody>
            </table>
        </section>
    );
}

export default Ranking;