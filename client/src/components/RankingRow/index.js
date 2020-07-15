import React from "react";
import "./style.css";

function RankingRow(props) {

    const { rank, displayName, wins, losses, totalBattle, winsPercent } = props;

    return (
        <tr className="ranking-row">
            <td><strong>#{rank}</strong></td>
            <td>{displayName}</td>
            <td>{wins}</td>
            <td>{losses}</td>
            <td>{totalBattle}</td>
            <td>{winsPercent}%</td>
        </tr>
    );
}

export default RankingRow;