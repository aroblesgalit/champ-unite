import React from "react";
import "./paginationButton.css";
import { ChampionsConsumer } from "../../utils/ChampionsContext";

function PaginationButton() {
    return (
        <ChampionsConsumer>
            {
                value => {
                    const { nums, currentPage, prevPage, nextPage } = value;
                    return nums.length > 1 ? (
                        <div className="page-num-wrapper uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-flex uk-flex-center uk-flex-middle">
                                <span uk-icon="chevron-left" className={`${currentPage === 1 ? "disabled" : ""}`} onClick={() => prevPage()} />
                                <input type="number" value={currentPage} defaultValue="1" />
                                <span uk-icon="chevron-right" className={`${currentPage === nums.length ? "disabled" : ""}`} onClick={() => nextPage()} />
                            </div>
                            <p>of {nums.length}</p>
                        </div>
                    ) : ""
                }
            }
        </ChampionsConsumer>
    )
}

export default PaginationButton;