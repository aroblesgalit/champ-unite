import React from "react";
import "./style.css";
import Chart from "chart.js";

function ChampionCard(props) {

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
                    <span className="stats-label">STR</span><div className="stats-bar" style={{width:props.str + "%"}}></div><span className="stats-val">{props.str}</span>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">PWR</span><div className="stats-bar" style={{width:props.pwr + "%"}}></div><span className="stats-val">{props.pwr}</span>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">CBT</span><div className="stats-bar" style={{width:props.cbt + "%"}}></div><span className="stats-val">{props.cbt}</span>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">INT</span><div className="stats-bar" style={{width:props.int + "%"}}></div><span className="stats-val">{props.int}</span>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">SPD</span><div className="stats-bar" style={{width:props.spd + "%"}}></div><span className="stats-val">{props.spd}</span>
                </div>
                <div className="uk-flex uk-flex-middle">
                    <span className="stats-label">DUR</span><div className="stats-bar" style={{width:props.dur + "%"}}></div><span className="stats-val">{props.dur}</span>
                </div>
            </div>
        </div>
    );
}

export default ChampionCard;