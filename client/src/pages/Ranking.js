import React from "react";
import "./pages.css";
import RankingTable from "../components/RankingTable";

function Ranking() {
    return (
        <section className="ranking-container uk-section uk-flex uk-flex-column uk-flex-middle">
            <h2 className="uk-margin-bottom">Ranking</h2>
            <RankingTable />
        </section>
    );
}

export default Ranking;