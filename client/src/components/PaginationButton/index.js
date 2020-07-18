import React from "react";
import "./paginationButton.css";

function PaginationButton() {
    return (
        <div className="page-num-wrapper uk-flex uk-flex-column uk-flex-middle">
            <div className="uk-flex uk-flex-center uk-flex-middle">
                <span uk-icon="chevron-left" />
                <input type="number" defaultValue="1" />
                <span uk-icon="chevron-right" />
            </div>
            <p>of 10</p>
        </div>
    )
}

export default PaginationButton;