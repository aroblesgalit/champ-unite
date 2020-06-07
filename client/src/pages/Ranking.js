import React from "react";

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
                    <tr>
                        <td>1</td>
                        <td>superman</td>
                        <td>10</td>
                        <td>0</td>
                        <td>10</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>superman</td>
                        <td>10</td>
                        <td>0</td>
                        <td>10</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>superman</td>
                        <td>10</td>
                        <td>0</td>
                        <td>10</td>
                        <td>100%</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default Ranking;