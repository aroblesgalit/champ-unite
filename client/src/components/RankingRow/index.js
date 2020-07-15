import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import UsersContext from "../../utils/UsersContext";

function RankingRow(props) {

    const { handleDetailUser } = useContext(UsersContext);

    const { id, rank, username, displayName, wins, losses, totalBattle, winsPercent } = props;

    return (
        <tr className="ranking-row">
            <td><strong>#{rank}</strong></td>
            <td>
                <Link
                    to={`/profile/${username}`}
                    onClick={() => handleDetailUser(id)}
                    className="uk-link-reset"
                >
                    {displayName}
                </Link>
            </td>
            <td>{wins}</td>
            <td>{losses}</td>
            <td>{totalBattle}</td>
            <td>{winsPercent}%</td>
        </tr>
    );
}

export default RankingRow;