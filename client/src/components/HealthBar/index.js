import React from "react";
import "./style.css";

function HealthBar(props) {
    return (
        <div className={ props.type === "user" ? "uk-flex uk-flex-middle" : "uk-flex uk-flex-row-reverse uk-flex-middle" }>
            <div className={ props.type === "user" ? "battle-user-avatar uk-flex uk-flex-center uk-flex-middle" : "battle-other-user-avatar uk-flex uk-flex-center uk-flex-middle" }>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Avatar" />
            </div>
            <div className={ props.type === "user" ? "uk-flex uk-flex-column" : "uk-flex uk-flex-column uk-flex-bottom" }>
                <p className="battle-user-name">Spider-man</p>
                <div className={ props.type === "user" ? "healthbar-container uk-flex uk-flex-middle" : "healthbar-container uk-flex uk-flex-row-reverse uk-flex-middle" }>
                    <div className={ props.type === "user" ? "healthbar-bar-border uk-flex uk-flex-left" : "healthbar-bar-border-reverse uk-flex uk-flex-right" }>
                        <div className="healthbar-bar" style={{width:"20%"}}></div>
                    </div>
                    <div className="healthbar-val"><p>20</p></div>
                </div>
            </div>
        </div>
    );
}

export default HealthBar;