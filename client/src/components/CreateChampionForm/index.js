import React from "react";

function CreateChampionForm() {
    return (
        <form className="uk-flex uk-flex-column uk-flex-middle uk-height-1-1">
            <div className="uk-margin-small uk-width-expand">
                <div className="uk-inline uk-width-expand">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" placeholder="champion201" />
                </div>
            </div>
            <div className="uk-margin-small">
                <button className="uk-button primary-btn" type="submit" >Create</button>
            </div>
        </form>
    );
}

export default CreateChampionForm;