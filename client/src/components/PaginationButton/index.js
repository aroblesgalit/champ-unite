import React from "react";
import "./paginationButton.css";
import { ChampionsConsumer } from "../../utils/ChampionsContext";

function PaginationButton() {
    return (
        <ChampionsConsumer>
            {
                value => {
                    const { nums, currentViews, currentPage } = value;
                    return (
                        <div className="page-num-wrapper uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-flex uk-flex-center uk-flex-middle">
                                <span uk-icon="chevron-left" />
                                <input type="number" value={currentPage} defaultValue="1" />
                                <span uk-icon="chevron-right" />
                            </div>
                            <p>of {nums.length}</p>
                        </div>
                    )
                }
            }
        </ChampionsConsumer>
    )
}

export default PaginationButton;