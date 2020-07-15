import React from "react";
import "./pages.css";
import RankingTable from "../components/RankingTable";
import RankingTitle, { ReactComponent as Trophy } from "../images/ranking-title.svg";

function Ranking() {
    return (
        <section className="ranking-container uk-section uk-flex uk-flex-column uk-flex-middle">
            <div><img src={RankingTitle} alt="Trophy with title." /></div>
            <Trophy />
            <RankingTable />
        </section>
    );
}

export default Ranking;