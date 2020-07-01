import React, { useEffect } from "react";
import "./style.css";
import API from "../../utils/API";

function RankingRow({ id, rank, displayName, wins, losses, totalBattle, winsPercent }) {

    useEffect(() => {
        API.updateWinsPercent(id, {
            rank: rank
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log("Something went wrong inside the RankingRow component...", err);
            })
    }, []);

    return (
        <tr>
            <td>{rank}</td>
            <td>{displayName}</td>
            <td>{wins}</td>
            <td>{losses}</td>
            <td>{totalBattle}</td>
            <td>{winsPercent}%</td>
        </tr>
    );
}

export default RankingRow;