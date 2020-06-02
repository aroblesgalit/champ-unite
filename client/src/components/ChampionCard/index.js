import React from "react";
import "./style.css";

function ChampionCard() {
    return (
        <div className="champion-card uk-card">
            <div className="champion-img-container uk-card-media-top uk-cover-container uk-margin-top">
                <img src="https://vignette.wikia.nocookie.net/marvel_dc/images/a/a5/Superman_Vol_5_1_Textless.jpg" alt="Champion" />
            </div>
            <div className="uk-card-body">
                <p className="stats-header">STATS</p>
                <div>
                    <span className="stats-label">STR</span><span className="stats-val">90</span>
                </div>
                <div>
                    <span className="stats-label">PWR</span><span className="stats-val">55</span>
                </div>
                <div>
                    <span className="stats-label">CBT</span><span className="stats-val">67</span>
                </div>
                <div>
                    <span className="stats-label">INT</span><span className="stats-val">75</span>
                </div>
                <div>
                    <span className="stats-label">SPD</span><span className="stats-val">74</span>
                </div>
                <div>
                    <span className="stats-label">DUR</span><span className="stats-val">85</span>
                </div>
            </div>
        </div>
    );
}

export default ChampionCard;