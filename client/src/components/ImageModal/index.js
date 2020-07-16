import React from "react";
import { UserConsumer } from "../../utils/UserContext";
import "./imageModal.css";

function ImageModal() {

    return (
        <UserConsumer>
            {
                value => {
                    return (
                        value.imageModalOpen ? (
                            <div className="user-champions-modal uk-flex uk-flex-middle uk-flex-center">
                                <div className="user-champions-modal-wrapper">
                                    <div className="uk-modal-header">
                                        <h2>Update Avatar</h2>
                                        <p>Insert a url for your image.</p>
                                    </div>
                                    <div className="uk-modal-body uk-flex uk-width-1-1">
                                        <h2>input goes here</h2>
                                    </div>
                                    <div className="uk-modal-footer uk-text-right">
                                        <button className="uk-button outline-btn uk-modal-close uk-margin-small-right" type="button" onClick={() => value.handleImageModal()}>Cancel</button>
                                        <button
                                            className="uk-button secondary-btn"
                                            type="button"
                                            onClick={() => value.handleImageModal()}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    )
                }
            }
        </UserConsumer>
    )
}

export default ImageModal;