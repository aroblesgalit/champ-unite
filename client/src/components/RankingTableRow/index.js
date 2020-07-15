import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./rankingTableRow.css";
import UsersContext from "../../utils/UsersContext";

function RankingTableRow(props) {

    const { handleDetailUser } = useContext(UsersContext);

    const { id, rank, username, displayName, wins, losses } = props;

    return (
        <div
            className={
                `ranking-table-row ${rank === 1 ?
                    "first" : (rank === 2 ?
                        "second" : (rank === 3 ?
                            "third" : ""
                        )
                    )
                } uk-flex uk-flex-middle`
            }>
            <div className="uk-width-small">{rank}</div>
            <div className="uk-width-5-10">
                <Link
                    to={`/profile/${username}`}
                    onClick={() => handleDetailUser(id)}
                    className="uk-link-reset"
                >
                    {displayName}
                </Link>
            </div>
            <div className="uk-width-3-10"><span>{wins}</span>/<span>{losses}</span></div>
        </div>
    )
}

export default RankingTableRow;