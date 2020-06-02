import React, { useState, useEffect } from "react";
import "./style.css";
import Chart from "chart.js";

function ChampionCard(props) {

    const ctx = document.getElementById("stats-chart");

    const statsChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["STR", "PWR", "CBT", "INT", "SPD", "DUR"],
            datasets: [{
                label: "Stats Value",
                data: [
                    props.str, props.pwr, props.cbt, props.int, props.spd, props.dur
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    return (
        <div className="champion-card uk-card">
            <div className="champion-img-container uk-card-media-top uk-cover-container uk-margin-top">
                <img src={props.imgageUrl} alt={props.name} />
            </div>
            <div className="uk-card-body">
                <p className="stats-header">STATS</p>
                <canvas id="stats-chart"></canvas>
                {
                    // <section>
                    //     <div>
                    //         <span className="stats-label">STR</span><span className="stats-val">90</span>
                    //     </div>
                    //     <div>
                    //         <span className="stats-label">PWR</span><span className="stats-val">55</span>
                    //     </div>
                    //     <div>
                    //         <span className="stats-label">CBT</span><span className="stats-val">67</span>
                    //     </div>
                    //     <div>
                    //         <span className="stats-label">INT</span><span className="stats-val">75</span>
                    //     </div>
                    //     <div>
                    //         <span className="stats-label">SPD</span><span className="stats-val">74</span>
                    //     </div>
                    //     <div>
                    //         <span className="stats-label">DUR</span><span className="stats-val">85</span>
                    //     </div>
                    // </section>
                }
            </div>
        </div>
    );
}

export default ChampionCard;