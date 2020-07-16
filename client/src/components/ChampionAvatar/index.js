import React from "react";
import "./championAvatar.css";

function ChampionAvatar(props) {

    const { name, image } = props;

    return (
        <div className="champion-avatar uk-flex uk-flex-center uk-flex-middle" uk-tooltip={name}>
            <img src={image} alt={name} />
        </div>
    )
}

export default ChampionAvatar;