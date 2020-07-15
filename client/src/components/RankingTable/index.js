import React from "react";
import "./rankingTable.css";
import RankingTableRow from "../RankingTableRow";
import UsersConsumer from "../../utils/UsersContext";

function RankingTable() {
    return (
        <div className="ranking-table-container uk-width-2-3@m">
            <div className="ranking-table-header uk-flex">
                <div className="uk-width-1-5@s">POS</div>
                <div className="uk-width-3-5@s">USER</div>
                <div className="uk-width-1-5@s"><span>WINS</span>/<span>LOSSES</span></div>
            </div>
            <div className="ranking-table-body">
                <UsersConsumer>
                    {
                        value => {
                            const { rankings } = value;
                            console.log(rankings)
                            return rankings.length > 0 ? (
                                rankings.map(user => {
                                    return <RankingTableRow
                                        key={user._id}
                                        id={user._id}
                                        username={user.username}
                                        rank={user.rank}
                                        displayName={user.displayName}
                                        username={user.username}
                                        wins={user.wins}
                                        losses={user.losses}
                                        totalBattle={user.totalBattle}
                                        winsPercent={user.winsPercent}
                                    />
                                })
                            ) : (
                                    <div className="uk-text-nowrap uk-text-muted">
                                        Battle 20 times to be in the ranking!
                                    </div>
                                )
                        }
                    }
                </UsersConsumer>
            </div>
        </div>
    )
}

export default RankingTable;