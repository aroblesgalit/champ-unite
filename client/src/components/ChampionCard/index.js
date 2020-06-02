import React from "react";
import "./style.css";
import Chart from "chart.js";

function ChampionCard(props) {

    function calcBarWidth(a) {
        return a * 1.8;
    }

    // const ctx = document.getElementById("stats-chart");

    // const statsChart = new Chart(ctx, {
    //     type: "bar",
    //     data: {
    //         labels: ["STR", "PWR", "CBT", "INT", "SPD", "DUR"],
    //         datasets: [{
    //             label: "Stats Value",
    //             data: [
    //                 props.str, props.pwr, props.cbt, props.int, props.spd, props.dur
    //             ],
    //             backgroundColor: [
    //                 "rgba(255, 99, 132, 0.2)",
    //                 "rgba(54, 162, 235, 0.2)",
    //                 "rgba(255, 206, 86, 0.2)",
    //                 "rgba(75, 192, 192, 0.2)",
    //                 "rgba(153, 102, 255, 0.2)",
    //                 "rgba(255, 159, 64, 0.2)"
    //             ]
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });

    return (
        <div className="champion-card uk-card">
            <div className="champion-img-container uk-card-media-top uk-margin-top">
                <img src={props.imageUrl} alt={props.name} />
            </div>
            <div className="uk-card-body">
                <p className="stats-header">STATS</p>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">STR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.str) + "px"}}></div><span className="stats-val">{props.str}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">PWR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.pwr) + "px"}}></div><span className="stats-val">{props.pwr}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">CBT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.cbt) + "px"}}></div><span className="stats-val">{props.cbt}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">INT</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.int) + "px"}}></div><span className="stats-val">{props.int}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">SPD</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.spd) + "px"}}></div><span className="stats-val">{props.spd}</span></div>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">DUR</span><div className="stats-bar-container uk-flex uk-flex-middle uk-width-expand"><div className="stats-bar" style={{width:calcBarWidth(props.dur) + "px"}}></div><span className="stats-val">{props.dur}</span></div>
                </div>
            </div>
        </div>
    );
}

export default ChampionCard;