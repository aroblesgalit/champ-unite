import React from "react";
import "./style.css";

function RankingRow({ rank, username, wins, losses, totalBattle, winsPercent }) {
    return (
        <tr>
            <td>{rank}</td>
            <td>{username}</td>
            <td>{wins}</td>
            <td>{losses}</td>
            <td>{totalBattle}</td>
            <td>{winsPercent}%</td>
        </tr>
    );
}

export default RankingRow;